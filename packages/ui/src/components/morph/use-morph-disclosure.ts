import { useCallback, useEffect, useState } from "react"

/**
 * Disclosure state that keeps the overlay mounted through its exit animation,
 * mirroring `useAnchoredDisclosure`. Pair with a `useRef<HTMLElement>(null)`
 * for the source.
 */
export function useMorphDisclosure(disabled = false) {
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        if (disabled) setOpen(false)
    }, [disabled])
    const show = useCallback(() => {
        setMounted(true)
        setOpen(true)
    }, [])
    const toggle = useCallback(() => {
        setMounted(true)
        setOpen((value) => !value)
    }, [])
    const close = useCallback(() => setOpen(false), [])
    const onExited = useCallback(() => {
        if (!open || disabled) setMounted(false)
    }, [open, disabled])
    return { open: open && !disabled, mounted, show, toggle, close, onExited }
}
