import { AiMagicIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { toast } from "@passui/react"
import { getEntry } from "@/domains/catalog/get-catalog"
import { getComponentMarkdown } from "../get-ai-context"

/** Copies one component's docs as Markdown, for pasting into an AI chat. */
export function CopyForAi({ slug }: { slug: string }) {
    async function copy() {
        const entry = getEntry(slug)
        if (!entry) return
        try {
            await navigator.clipboard.writeText(
                getComponentMarkdown(
                    entry,
                    window.location.origin
                )
            )
            toast.success("Copied as Markdown")
        } catch {
            toast.error("Could not copy. Try again.")
        }
    }

    return (
        <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-full bg-fill/70 px-3 py-1.5 text-footnote font-semibold text-label transition-colors hover:bg-fill"
        >
            <HugeiconsIcon icon={AiMagicIcon} size={14} />
            Copy for AI
        </button>
    )
}
