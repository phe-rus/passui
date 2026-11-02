import { ContextMenuHost, DialogHost, TooltipHost } from "@passui/react"
import { PlatformProvider } from "@passui/react/appearance"
import { Toaster } from "@passui/react/toaster"
import { useRef } from "react"
import { getEntry, resolveProps } from "@/domains/catalog"
import type { z } from "zod"
import type { previewSearchSchema } from "@/domains/settings"
import type { PreviewSettings } from "@/domains/settings"
import { usePreviewChannel } from "../use-preview-channel"
import { useSizeReporter } from "../use-size-reporter"

type PreviewPageProps = {
    slug: string
    settings: PreviewSettings
    props: Record<string, unknown>
    scene: z.output<typeof previewSearchSchema>["scene"]
    example?: string
}

/** The demo alone, as an app would show it; lives inside an iframe. */
export function PreviewPage({ slug, settings, props, scene, example }: PreviewPageProps) {
    const content = useRef<HTMLDivElement>(null)
    const resendSize = useSizeReporter(content)
    const state = usePreviewChannel({ settings, props }, resendSize)
    const entry = getEntry(slug)
    if (!entry) return null
    const Example =
        scene === "showcase"
            ? entry.docs.showcase
            : scene === "usage"
              ? entry.docs.usage
              : scene === "example"
                ? entry.docs.examples.find((item) => item.id === example)?.component
                : undefined

    return (
        <div ref={content}>
            {/* Keep the measured wrapper stable when changing platform remounts the provider. */}
            <PlatformProvider key={state.settings.os}>
                {Example ? (
                    <div className="flex min-h-svh items-center justify-center bg-background p-6">
                        <Example />
                    </div>
                ) : (
                    <div
                        // overlay components get room to open into
                        style={{
                            minHeight: entry.docs.previewHeight,
                        }}
                        className="flex items-center justify-center px-6 py-16"
                    >
                        {entry.docs.render(resolveProps(entry.docs, state.props))}
                    </div>
                )}
                {/* what an app mounts once, so toasts, menus, confirmations and tooltips show here too */}
                <Toaster />
                <ContextMenuHost />
                <DialogHost />
                <TooltipHost />
            </PlatformProvider>
        </div>
    )
}
