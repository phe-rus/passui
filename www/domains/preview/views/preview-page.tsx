import {
    ContextMenuHost,
    DialogHost,
    TooltipHost,
} from "@passui/react"
import { PlatformProvider } from "@passui/react/appearance"
import { Toaster } from "@passui/react/toaster"
import { useRef } from "react"
import { getEntry, resolveProps } from "@/domains/catalog"
import type { PreviewSettings } from "@/domains/settings"
import { usePreviewChannel } from "../use-preview-channel"
import { useSizeReporter } from "../use-size-reporter"

type PreviewPageProps = {
    slug: string
    settings: PreviewSettings
    props: Record<string, unknown>
    scene: "component" | "showcase"
}

/** The demo alone, as an app would show it; lives inside an iframe. */
export function PreviewPage({
    slug,
    settings,
    props,
    scene,
}: PreviewPageProps) {
    const content = useRef<HTMLDivElement>(null)
    const resendSize = useSizeReporter(content)
    const state = usePreviewChannel(
        { settings, props },
        resendSize
    )
    const entry = getEntry(slug)
    if (!entry) return null

    return (
        // a new platform remounts the provider, which reads data-os on mount
        <PlatformProvider key={state.settings.os}>
            {scene === "showcase" ? (
                <div className="flex min-h-svh items-center justify-center bg-background p-6">
                    <entry.docs.showcase />
                </div>
            ) : (
                <div
                    ref={content}
                    // overlay components get room to open into
                    style={{
                        minHeight: entry.docs.previewHeight,
                    }}
                    className="flex items-center justify-center px-6 py-16"
                >
                    {entry.docs.render(
                        resolveProps(entry.docs, state.props)
                    )}
                </div>
            )}
            {/* what an app mounts once, so toasts, menus, confirmations and tooltips show here too */}
            <Toaster />
            <ContextMenuHost />
            <DialogHost />
            <TooltipHost />
        </PlatformProvider>
    )
}
