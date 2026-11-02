import { Button } from "@passui/react/button"
import type { RegisteredDocs } from "@/domains/catalog/definitions"
import { useNavigate } from "@tanstack/react-router"
import type { PreviewSettings } from "@/domains/settings"
import { PreviewFrame } from "@/domains/playground"
import { ExampleCode } from "./example-code"
import { getChangedProps, resolveProps } from "../resolve-props"
import type { ExampleContent } from "../types"
import { DocSection } from "./doc-section"

type Example = RegisteredDocs["examples"][number]

type ExampleCardProps = {
    docs: RegisteredDocs
    example: Example
    content: ExampleContent
    settings: PreviewSettings
}

/**
 * One example: its words, the live component, and its real source. Those
 * with playground values can also open in the playground above.
 */
export function ExampleCard({ docs, example, content, settings }: ExampleCardProps) {
    const navigate = useNavigate({
        from: "/components/react/$slug",
    })
    const Demo = example.component
    const playground = example.playground

    function openInPlayground() {
        if (!playground) return
        void navigate({
            search: (previous) => ({
                ...previous,
                props: getChangedProps(docs, resolveProps(docs, playground)),
            }),
            replace: true,
            resetScroll: false,
        }).then(() => {
            document.getElementById("playground")?.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "auto"
                    : "smooth",
                block: "start",
            })
        })
    }

    return (
        <DocSection
            id={`example-${example.id}`}
            title={content.title}
            description={content.description}
            level={3}
        >
            <div className="overflow-hidden rounded-4xl ring-1 ring-separator/60">
                <div className="flex min-h-40 items-center justify-center bg-background p-5">
                    {docs.slug === "view-controller" || docs.slug === "locale-switcher" ? (
                        <div className="w-full">
                            <PreviewFrame
                                docs={docs}
                                settings={settings}
                                props={{}}
                                scene="example"
                                example={example.id}
                            />
                        </div>
                    ) : (
                        <Demo />
                    )}
                </div>
                <div className="border-separator/60 border-t">
                    <ExampleCode slug={docs.slug} id={example.id} />
                </div>
            </div>
            {playground && (
                <Button
                    variant="link"
                    size="sm"
                    onClick={openInPlayground}
                    className="self-start px-0"
                >
                    Open in playground
                </Button>
            )}
        </DocSection>
    )
}
