import { useCallback, useEffect, useState } from "react"

/** Keep the panel mounted until its material has returned to the trigger. */
export function useAnchoredDisclosure(disabled = false) {
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
        setOpen((current) => !current)
    }, [])
    const close = useCallback(() => setOpen(false), [])
    const onExited = useCallback(() => {
        if (!open || disabled) setMounted(false)
    }, [open, disabled])
    return { open: open && !disabled, mounted, show, toggle, close, onExited }
}
