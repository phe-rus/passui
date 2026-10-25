import { buttonStyle } from "@passui/react/button"
import type { RegisteredDocs } from "@passui/react/docs"
import { useNavigate } from "@tanstack/react-router"
import { CodeView } from "@/domains/playground"
import { getExampleSource } from "../get-example-source"
import {
    getChangedProps,
    resolveProps,
} from "../resolve-props"
import type { ExampleContent } from "../types"
import { DocSection } from "./doc-section"

type Example = RegisteredDocs["examples"][number]

type ExampleCardProps = {
    docs: RegisteredDocs
    example: Example
    content: ExampleContent
}

/**
 * One example: its words, the live component, and its real source. Those
 * with playground values can also open in the playground above.
 */
export function ExampleCard({
    docs,
    example,
    content,
}: ExampleCardProps) {
    const navigate = useNavigate({
        from: "/components/$slug",
    })
    const Demo = example.component
    const playground = example.playground

    function openInPlayground() {
        if (!playground) return
        navigate({
            search: (previous) => ({
                ...previous,
                props: getChangedProps(
                    docs,
                    resolveProps(docs, playground)
                ),
            }),
            replace: true,
            resetScroll: false,
        })
        // after the update lands, or the re-render cancels the scroll
        requestAnimationFrame(() =>
            document
                .getElementById("playground")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                })
        )
    }

    return (
        <DocSection
            id={`example-${example.id}`}
            title={content.title}
            description={content.description}
            level={3}
        >
            <div className="overflow-hidden rounded-4xl ring-1 ring-separator/60">
                <div className="flex min-h-48 items-center justify-center bg-background p-8">
                    <Demo />
                </div>
                <div className="border-separator/60 border-t">
                    <CodeView
                        code={getExampleSource(
                            docs.slug,
                            example.id
                        )}
                        label={`${docs.slug}-${example.id}.tsx`}
                        collapsible
                    />
                </div>
            </div>
            {playground && (
                <button
                    type="button"
                    onClick={openInPlayground}
                    className={buttonStyle({
                        variant: "link",
                        size: "sm",
                        className: "self-start px-0",
                    })}
                >
                    Open in playground
                </button>
            )}
        </DocSection>
    )
}
