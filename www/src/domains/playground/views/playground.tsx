import type { RegisteredDocs } from "@/domains/catalog/definitions"
import { useNavigate } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import { getChangedProps, resolveProps } from "@/domains/catalog"
import { cn } from "@passui/react/cn"
import { Button } from "@passui/react/button"
import { CopyIcon, UndoIcon } from "@passui/react/icons"
import {
    type DocsSettings,
    type PreviewViewport,
    SettingsBar,
    docsSettingsDefaults,
} from "@/domains/settings"
import { useCopyText } from "@/domains/clipboard/use-copy-text"
import { getSnippet } from "../get-snippet"
import { useFormattedCode } from "../use-formatted-code"
import { CodeView } from "./code-view"
import { ControlsPanel } from "./controls-panel"
import { PreviewFrame } from "./preview-frame"

// the frame's width for each viewport preset (AC-4)
const frameWidths: Record<PreviewViewport, string> = {
    phone: "w-[390px]",
    tablet: "w-[820px]",
    fill: "w-full",
}

type PlaygroundProps = {
    docs: RegisteredDocs
    settings: DocsSettings
    rawProps: Record<string, unknown>
}

/**
 * The live preview and its controls. The page URL is the only state:
 * a control writes to it, and the preview follows (contract item 9).
 */
export function Playground({ docs, settings, rawProps }: PlaygroundProps) {
    const navigate = useNavigate({
        from: "/components/react/$slug",
    })
    const clipboard = useCopyText()
    const [resetVersion, setResetVersion] = useState(0)
    const values = useMemo(() => resolveProps(docs, rawProps), [docs, rawProps])
    const snippet = useFormattedCode(useMemo(() => getSnippet(docs, values), [docs, values]))
    const previewSettings = useMemo(
        () => ({
            theme: settings.theme,
            accent: settings.accent,
            os: settings.os,
        }),
        [settings.theme, settings.accent, settings.os]
    )

    return (
        <div className="overflow-hidden rounded-5xl ring-1 ring-separator/60">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-separator/60 border-b bg-elevated px-4 py-2">
                <p className="text-footnote text-label-secondary">
                    Preview settings and component props are saved in the URL.
                </p>
                <div className="flex flex-wrap gap-2">
                    <Button
                        type="button"
                        size="xs"
                        variant="ghost"
                        onClick={() => {
                            void navigate({
                                search: (previous) => ({
                                    ...previous,
                                    ...docsSettingsDefaults,
                                    props: {},
                                }),
                                replace: true,
                                resetScroll: false,
                            }).then(() => setResetVersion((version) => version + 1))
                        }}
                    >
                        <UndoIcon size={14} />
                        Reset
                    </Button>
                    <Button
                        type="button"
                        size="xs"
                        variant="secondary"
                        onClick={() => {
                            void clipboard.copy(window.location.href, "Playground link copied")
                        }}
                    >
                        <CopyIcon size={14} />
                        Share
                    </Button>
                </div>
            </div>
            <div className="border-separator/60 border-b bg-elevated">
                <SettingsBar
                    settings={settings}
                    onChange={(next) =>
                        navigate({
                            search: (previous) => ({
                                ...previous,
                                ...next,
                            }),
                            replace: true,
                            resetScroll: false,
                        })
                    }
                />
            </div>
            {/* phone and tablet keep their true width and scroll inside here */}
            <div className="overflow-x-auto bg-fill/40">
                <div
                    className={cn(
                        "mx-auto shrink-0 transition-[width] duration-300 motion-reduce:transition-none",
                        frameWidths[settings.viewport],
                        settings.viewport !== "fill" && "border-separator/60 border-x"
                    )}
                >
                    <PreviewFrame
                        key={`${docs.slug}-${resetVersion}`}
                        docs={docs}
                        settings={previewSettings}
                        props={values}
                    />
                </div>
            </div>
            <div className="border-separator/60 border-t">
                <CodeView code={snippet} />
            </div>
            <div className="border-separator/60 border-t bg-elevated">
                <ControlsPanel
                    docs={docs}
                    values={values}
                    onChange={(key, value) =>
                        navigate({
                            search: (previous) => ({
                                ...previous,
                                props: getChangedProps(docs, {
                                    ...values,
                                    [key]: value,
                                }),
                            }),
                            replace: true,
                            resetScroll: false,
                        })
                    }
                />
            </div>
            {clipboard.fallback}
        </div>
    )
}
