import type { ReactNode } from "react"
import type { MenuRect } from "./menu-reveal"

export type ContextMenuAlignX = "start" | "end"
export type ContextMenuAlignY = "top" | "bottom"
export type ContextMenuEdge = "leading" | "trailing"
export type ContextMenuSize = "sm" | "md" | "lg"

/** One row of a context menu, or a divider between groups of rows. */
export type ContextMenuItem =
    | {
          label: string
          icon?: ReactNode
          onSelect: () => void
          destructive?: boolean
          disabled?: boolean
          /** Marks the current choice, e.g. a note's kind. */
          checked?: boolean
      }
    | { heading: string }
    | "divider"

export interface OpenMenu {
    id: number
    anchor: Element | null
    x: number
    y: number
    items: ContextMenuItem[]
    /** Opened by long-press: bigger rows for fingers. */
    touch: boolean
    /** Surface, item and heading density. @default "md" */
    size: ContextMenuSize
    /** Which edge of the menu sits at `x`: its left (`start`) or its right (`end`). */
    alignX: ContextMenuAlignX
    /** Which edge of the menu sits at `y`: its top (`top`) or its bottom (`bottom`). */
    alignY: ContextMenuAlignY
    source?: MenuRect
    toolbar?: HTMLElement
    toolbarRect?: MenuRect
    restoreFocus?: boolean
}

let menu: OpenMenu | null = null
/** The menu shown most recently, kept after it closes so a follow-up can stand in its place. */
let last: OpenMenu | null = null
let nextId = 1
const listeners = new Set<() => void>()
const emit = () => {
    for (const listener of listeners) listener()
}

/** Opens a menu at a point, such as where a pointer was pressed. */
export function openContextMenu(
    x: number,
    y: number,
    items: ContextMenuItem[],
    touch = false,
    anchor: Element | null = typeof document === "undefined" ? null : document.activeElement,
    size: ContextMenuSize = "md"
) {
    menu = {
        id: nextId++,
        anchor,
        x,
        y,
        items,
        touch,
        size,
        alignX: "start",
        alignY: "top",
    }
    last = menu
    emit()
}

/**
 * Opens a second menu where the last one stood, the way an iOS menu swaps
 * in a submenu: a long list (a note's fonts, its kinds) stays one row in the
 * first menu instead of making it tall.
 */
export function openFollowUpMenu(items: ContextMenuItem[]) {
    if (!last) return
    menu = { ...last, id: nextId++, items, source: undefined }
    last = menu
    emit()
}

/**
 * Expands a control into a menu, lined up with its leading or trailing
 * edge and growing down (or up) from the control's bounds. Leading and
 * trailing follow the text direction, so right-to-left languages mirror.
 * The menu's real size decides where it goes; nothing is guessed.
 */
export function openMenu(
    anchor: Element,
    items: ContextMenuItem[],
    {
        edge = "leading",
        above = false,
        toolbar,
        size = "md",
    }: {
        edge?: ContextMenuEdge
        above?: boolean
        /** Replace this action group with a horizontally expanding menu surface. */
        toolbar?: HTMLElement
        /** Surface, item and heading density. @default "md" */
        size?: ContextMenuSize
    } = {}
) {
    const rect = anchor.getBoundingClientRect()
    const toolbarRect = toolbar?.getBoundingClientRect()
    const rtl = getComputedStyle(anchor).direction === "rtl"
    // Trailing is the right edge in left-to-right text, the left edge in right-to-left.
    const right = (edge === "trailing") !== rtl
    menu = {
        id: nextId++,
        anchor,
        x: right ? (toolbarRect ?? rect).right : (toolbarRect ?? rect).left,
        y: toolbar ? rect.top : above ? rect.bottom : rect.top,
        items,
        touch: false,
        size,
        alignX: right ? "end" : "start",
        alignY: above ? "bottom" : "top",
        toolbar,
        toolbarRect,
        source: {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
        },
    }
    last = menu
    emit()
}

export function closeContextMenu(restoreFocus = true) {
    if (!menu) return
    const anchor = menu.anchor
    const toolbar = menu.toolbar
    menu.restoreFocus = restoreFocus
    menu = null
    if (
        restoreFocus &&
        !toolbar &&
        typeof HTMLElement !== "undefined" &&
        anchor instanceof HTMLElement &&
        anchor.isConnected
    )
        anchor.focus()
    emit()
}

export function subscribeContextMenu(listener: () => void) {
    listeners.add(listener)
    return () => {
        listeners.delete(listener)
    }
}

export function getContextMenu(): OpenMenu | null {
    return menu
}
