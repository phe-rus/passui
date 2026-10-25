import { useEffect, useRef, useState } from "react"
import type { PreviewSettings } from "@/domains/settings"
import { applyDocumentAttributes } from "./get-document-attributes"
import {
    type FrameMessage,
    parentMessageSchema,
} from "./types"

type PreviewState = {
    settings: PreviewSettings
    props: Record<string, unknown>
}

function insideParent() {
    return window.parent !== window
}

/** Sends a message to the page that holds this preview, if any. */
export function postToParent(message: FrameMessage) {
    if (!insideParent()) return
    window.parent.postMessage(message, window.location.origin)
}

/**
 * The preview's live state: starts from its URL, then follows the parent's
 * messages. Only the same origin and the parent window are heard (AC-8).
 */
export function usePreviewChannel(
    initial: PreviewState,
    /** Called when the parent asks again, after it starts listening. */
    onPing?: () => void
): PreviewState {
    const [state, setState] = useState(initial)
    const applied = useRef(initial.settings)

    useEffect(() => {
        function onMessage(event: MessageEvent) {
            if (event.origin !== window.location.origin)
                return
            if (
                !insideParent() ||
                event.source !== window.parent
            )
                return
            const parsed = parentMessageSchema.safeParse(
                event.data
            )
            if (!parsed.success) return
            // the parent may start listening after our first hello
            if (parsed.data.type === "passui:ping") {
                postToParent({ type: "passui:ready" })
                onPing?.()
                return
            }
            applyDocumentAttributes(
                document.documentElement,
                parsed.data.settings,
                applied.current
            )
            applied.current = parsed.data.settings
            setState({
                settings: parsed.data.settings,
                props: parsed.data.props,
            })
        }
        window.addEventListener("message", onMessage)
        postToParent({ type: "passui:ready" })
        return () =>
            window.removeEventListener("message", onMessage)
    }, [onPing])

    return state
}
