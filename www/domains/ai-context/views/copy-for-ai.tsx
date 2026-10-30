import { SparkleIcon } from "@passui/react/icons"
import { useCopyText } from "@/domains/clipboard/use-copy-text"
import { getEntry } from "@/domains/catalog/get-catalog"
import {
    getComponentMarkdown,
    getSolidComponentMarkdown,
} from "../get-ai-context"

/** Copies one component's docs as Markdown, for pasting into an AI chat. */
export function CopyForAi({
    slug,
    framework = "react",
}: {
    slug: string
    framework?: "react" | "solid"
}) {
    const clipboard = useCopyText()
    async function copy() {
        const entry = getEntry(slug)
        if (!entry) return
        await clipboard.copy(
            (framework === "solid"
                ? getSolidComponentMarkdown
                : getComponentMarkdown)(
                entry,
                window.location.origin
            ),
            "Copied as Markdown"
        )
    }

    return (
        <>
            <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-full bg-fill/70 px-3 py-1.5 text-footnote font-semibold text-label transition-colors hover:bg-fill"
            >
                <SparkleIcon size={14} />
                Copy for AI
            </button>
            {clipboard.fallback}
        </>
    )
}
