import { useRouter } from "@tanstack/react-router"
import { Button } from "@passui/react/button"
import { useEffect, useRef, useState } from "react"
import type { RegisteredDocs } from "@/domains/catalog/definitions"
import { getChangedProps, type PropValues } from "@/domains/catalog"
import { type ParentMessage, type StateMessage, frameMessageSchema } from "@/domains/preview"
import type { z } from "zod"
import type { previewSearchSchema } from "@/domains/settings"
import type { PreviewSettings } from "@/domains/settings"

type PreviewFrameProps = {
    docs: RegisteredDocs
    settings: PreviewSettings
    props: PropValues
    scene?: z.output<typeof previewSearchSchema>["scene"]
    example?: string
}

const minimumHeight = 160
const previewTimeoutMs = 12000

/** Asks the preview to say it is listening (answered with passui:ready). */
function ping(frame: HTMLIFrameElement | null) {
    const message: ParentMessage = { type: "passui:ping" }
    frame?.contentWindow?.postMessage(message, window.location.origin)
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
    scene = "component",
    example = "",
}: PreviewFrameProps) {
    const router = useRouter()
    const frame = useRef<HTMLIFrameElement>(null)
    const [ready, setReady] = useState(false)
    const [failed, setFailed] = useState(false)
    const [attempt, setAttempt] = useState(0)
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
                    scene,
                    example,
                    props: getChangedProps(docs, props),
                },
            }).href
    )

    // biome-ignore lint/correctness/useExhaustiveDependencies: Retrying replaces the iframe and must restart its timeout.
    useEffect(() => {
        if (ready) return
        const timer = window.setTimeout(() => setFailed(true), previewTimeoutMs)
        return () => window.clearTimeout(timer)
    }, [ready, attempt])

    useEffect(() => {
        function onMessage(event: MessageEvent) {
            if (event.origin !== window.location.origin) return
            if (event.source !== frame.current?.contentWindow) return
            const parsed = frameMessageSchema.safeParse(event.data)
            if (!parsed.success) return
            if (parsed.data.type === "passui:ready") {
                setReady(true)
                setFailed(false)
            } else setHeight(Math.max(leastHeight, parsed.data.height))
        }
        window.addEventListener("message", onMessage)
        // the preview may have said hello before we listened: ask again
        ping(frame.current)
        return () => window.removeEventListener("message", onMessage)
    }, [leastHeight])

    useEffect(() => {
        if (!ready) return
        const message: StateMessage = {
            type: "passui:state",
            settings,
            props,
        }
        frame.current?.contentWindow?.postMessage(message, window.location.origin)
    }, [ready, settings, props])

    return (
        <div className="relative">
            <iframe
                key={attempt}
                ref={frame}
                src={src}
                title={`${docs.name} ${scene === "component" ? "interactive" : scene === "example" ? example : scene} preview`}
                onLoad={() => {
                    setReady(false)
                    ping(frame.current)
                }}
                tabIndex={ready ? 0 : -1}
                style={{ height }}
                className="block w-full border-0 bg-transparent transition-[height] duration-300 motion-reduce:transition-none"
            />
            {!ready && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/95 p-5 text-center">
                    {failed ? (
                        <div role="alert" className="flex max-w-sm flex-col items-center gap-3">
                            <p className="text-callout text-label-secondary">
                                The interactive preview did not respond.
                            </p>
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => {
                                    setReady(false)
                                    setFailed(false)
                                    setHeight(leastHeight)
                                    setAttempt((current) => current + 1)
                                }}
                            >
                                Retry preview
                            </Button>
                        </div>
                    ) : (
                        <p role="status" className="text-footnote text-label-secondary">
                            Loading interactive preview…
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
