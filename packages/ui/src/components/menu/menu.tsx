import { forwardRef, type ReactNode, useRef, useSyncExternalStore } from "react"
import { Button, type ButtonProps } from "../button/button"
import {
    closeContextMenu,
    getContextMenu,
    openMenu,
    subscribeContextMenu,
    type ContextMenuEdge,
    type ContextMenuItem,
} from "../context-menu/context-menu-store"

export interface MenuProps extends Omit<ButtonProps, "onClick" | "children"> {
    /** Accessible name for the menu trigger. */
    label: string
    /** Items are rendered by the app's existing ContextMenuHost. */
    items: readonly ContextMenuItem[]
    children: ReactNode
    /** Logical edge used to align the menu, including RTL. @default "leading" */
    edge?: ContextMenuEdge
    /** Expand upward from the trigger instead of downward. @default false */
    above?: boolean
}

/** A declarative menu button using the same native host as context menus. */
export const Menu = forwardRef<HTMLButtonElement, MenuProps>(function Menu(
    { label, items, children, edge = "leading", above = false, disabled, ...props },
    forwardedRef
) {
    const trigger = useRef<HTMLButtonElement>(null)
    const current = useSyncExternalStore(subscribeContextMenu, getContextMenu, () => null)
    const expanded = Boolean(current && current.anchor === trigger.current)

    const toggle = () => {
        if (!trigger.current || disabled) return
        if (expanded) closeContextMenu(false)
        else openMenu(trigger.current, [...items], { edge, above })
    }

    return (
        <Button
            {...props}
            ref={(node) => {
                trigger.current = node
                if (typeof forwardedRef === "function") forwardedRef(node)
                else if (forwardedRef) forwardedRef.current = node
            }}
            type="button"
            aria-label={label}
            aria-haspopup="menu"
            aria-expanded={expanded}
            disabled={disabled}
            onClick={toggle}
            onKeyDown={(event) => {
                props.onKeyDown?.(event)
                if (event.defaultPrevented) return
                if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                    event.preventDefault()
                    if (!expanded) toggle()
                } else if (event.key === "Escape" && expanded) {
                    event.preventDefault()
                    closeContextMenu()
                }
            }}
        >
            {children}
        </Button>
    )
})
