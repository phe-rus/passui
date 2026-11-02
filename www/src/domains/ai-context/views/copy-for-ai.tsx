import { SparkleIcon } from "@passui/react/icons"
import { Button } from "@passui/react/button"
import { haptic } from "@passui/react"
import { useCopyText } from "@/domains/clipboard/use-copy-text"
import { getEntry } from "@/domains/catalog/get-catalog"
import { getComponentMarkdown } from "../get-ai-context"

/** Copies one component's docs as Markdown, for pasting into an AI chat. */
export function CopyForAi({ slug }: { slug: string }) {
    const clipboard = useCopyText()
    async function copy() {
        const entry = getEntry(slug)
        if (!entry) return
        const copied = await clipboard.copy(
            getComponentMarkdown(entry, window.location.origin),
            "Copied as Markdown"
        )
        if (copied) haptic("success")
    }

    return (
        <>
            <Button type="button" size="sm" variant="secondary" onClick={copy}>
                <SparkleIcon size={14} />
                Copy for AI
            </Button>
            {clipboard.fallback}
        </>
    )
}
