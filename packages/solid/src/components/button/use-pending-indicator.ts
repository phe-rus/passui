import {
    createEffect,
    createSignal,
    onCleanup,
    type Accessor,
} from "solid-js"

export function usePendingIndicator(
    pending: Accessor<boolean>
) {
    const [visible, setVisible] = createSignal(false)
    createEffect(() => {
        setVisible(false)
        if (!pending()) return
        const timer = setTimeout(() => setVisible(true), 300)
        onCleanup(() => clearTimeout(timer))
    })
    return () => pending() && visible()
}
