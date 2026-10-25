import { useRouter } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"
import type { RegisteredDocs } from "@passui/react/docs"
import {
    getChangedProps,
    type PropValues,
} from "@/domains/catalog"
import {
    type ParentMessage,
    type StateMessage,
    frameMessageSchema,
} from "@/domains/preview"
import type { PreviewSettings } from "@/domains/settings"

type PreviewFrameProps = {
    docs: RegisteredDocs
    settings: PreviewSettings
    props: PropValues
}

const minimumHeight = 160

/** Asks the preview to say it is listening (answered with passui:ready). */
function ping(frame: HTMLIFrameElement | null) {
    const message: ParentMessage = { type: "passui:ping" }
    frame?.contentWindow?.postMessage(
        message,
        window.location.origin
    )
}

/**
 * Hosts the iframe preview. Its address is fixed when it mounts (keyed by
 * slug by the caller), so later changes travel as messages and the frame
 * never reloads (contract item 14).
 */
export function PreviewFrame({
    docs,
    settings,
    props,
}: PreviewFrameProps) {
    const router = useRouter()
    const frame = useRef<HTMLIFrameElement>(null)
    const [ready, setReady] = useState(false)
    // overlay components ask for room to open into
    const leastHeight = docs.previewHeight ?? minimumHeight
    const [height, setHeight] = useState(leastHeight)
    const [src] = useState(
        () =>
            router.buildLocation({
                to: "/preview/$slug",
                params: { slug: docs.slug },
                search: {
                    ...settings,
                    props: getChangedProps(docs, props),
                },
            }).href
    )

    useEffect(() => {
        function onMessage(event: MessageEvent) {
            if (event.origin !== window.location.origin)
                return
            if (event.source !== frame.current?.contentWindow)
                return
            const parsed = frameMessageSchema.safeParse(
                event.data
            )
            if (!parsed.success) return
            if (parsed.data.type === "passui:ready")
                setReady(true)
            else
                setHeight(
                    Math.max(leastHeight, parsed.data.height)
                )
        }
        window.addEventListener("message", onMessage)
        // the preview may have said hello before we listened: ask again
        ping(frame.current)
        return () =>
            window.removeEventListener("message", onMessage)
    }, [leastHeight])

    useEffect(() => {
        if (!ready) return
        const message: StateMessage = {
            type: "passui:state",
            settings,
            props,
        }
        frame.current?.contentWindow?.postMessage(
            message,
            window.location.origin
        )
    }, [ready, settings, props])

    return (
        <iframe
            ref={frame}
            src={src}
            title="Component preview"
            onLoad={() => ping(frame.current)}
            style={{ height }}
            className="block w-full border-0 bg-transparent transition-[height] duration-300"
        />
    )
}
