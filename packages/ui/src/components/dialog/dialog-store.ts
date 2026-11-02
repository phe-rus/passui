/**
 * App-wide confirmation dialogs, replacing the browser's `confirm`.
 * `await confirmDialog({...})` resolves true when confirmed. Render one
 * `<DialogHost />`.
 */
export interface ConfirmOptions {
    title: string
    message?: string
    confirmLabel?: string
    cancelLabel?: string
    /** Destructive actions are shown in red and are not the default button. */
    destructive?: boolean
}

export interface PendingDialog extends ConfirmOptions {
    id: number
    resolve: (confirmed: boolean) => void
}

let current: PendingDialog | null = null
let nextId = 1
const queue: PendingDialog[] = []
let exitingId: number | null = null
const listeners = new Set<() => void>()

const emit = () => {
    for (const listener of listeners) listener()
}

export function confirmDialog(options: ConfirmOptions): Promise<boolean> {
    return new Promise((resolve) => {
        const dialog = { ...options, id: nextId++, resolve }
        if (current || exitingId !== null) queue.push(dialog)
        else current = dialog
        emit()
    })
}

export function settleDialog(confirmed: boolean, id?: number) {
    if (!current || exitingId !== null || (id !== undefined && current.id !== id)) return
    const settled = current
    exitingId = settled.id
    current = null
    settled.resolve(confirmed)
    emit()
}

/** Advance queued confirmations only after the dismissed card has exited. */
export function advanceDialogQueue() {
    if (exitingId === null) return
    exitingId = null
    current = queue.shift() ?? null
    emit()
}

export function subscribeDialogs(listener: () => void) {
    listeners.add(listener)
    return () => {
        listeners.delete(listener)
    }
}

export function getDialog(): PendingDialog | null {
    return current
}
