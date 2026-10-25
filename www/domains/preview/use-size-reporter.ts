import {
    type RefObject,
    useCallback,
    useEffect,
    useRef,
} from "react"
import { postToParent } from "./use-preview-channel"

/**
 * Reports the content's height so the parent can size the frame. It
 * watches an inner wrapper, never `<body>`, which would only report the
 * frame's own height back (contract item 10). Returns `resend`, for when
 * the parent starts listening after the last report: a preview whose
 * height never changes again would otherwise leave the frame too short.
 */
export function useSizeReporter(
    target: RefObject<HTMLElement | null>
) {
    const last = useRef<number | null>(null)
    useEffect(() => {
        const element = target.current
        if (!element) return
        const observer = new ResizeObserver(([entry]) => {
            last.current = Math.ceil(
                entry.borderBoxSize[0].blockSize
            )
            postToParent({
                type: "passui:size",
                height: last.current,
            })
        })
        observer.observe(element)
        return () => observer.disconnect()
    }, [target])

    return useCallback(() => {
        if (last.current === null) return
        postToParent({
            type: "passui:size",
            height: last.current,
        })
    }, [])
}
