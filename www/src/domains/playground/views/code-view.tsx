import { CodeBlock } from "@passui/react/code-block"
import { CopyIcon, CheckIcon } from "@passui/react/icons"
import { cn } from "@passui/react/cn"
import { IconButton } from "@passui/react/icon-button"
import { Button } from "@passui/react/button"
import { haptic } from "@passui/react"
import { useState } from "react"
import { useCopyText } from "@/domains/clipboard/use-copy-text"
import { type CodeLang, useHighlight } from "../use-highlight"

type CodeViewProps = {
    code: string
    /** A small caption over the code, like "tsx" or a file name. */
    label?: string
    /** Long code starts folded, with an Expand code pill (the default). */
    collapsible?: boolean
    /** The code's language, for its colors; TSX by default. */
    lang?: CodeLang
}

const foldAfterLines = 6

const languageNames: Record<CodeLang, string> = {
    tsx: "TypeScript JSX",
    css: "CSS",
    json: "JSON",
    shellscript: "Shell",
    markdown: "Markdown",
}

/**
 * Code with a copy button. Plain text shows at the same size until the
 * highlighter loads, so nothing shifts when the colours arrive.
 */
export function CodeView({ code, label, collapsible = true, lang = "tsx" }: CodeViewProps) {
    const html = useHighlight(code, lang)
    const [copied, setCopied] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const clipboard = useCopyText()
    const foldable = collapsible && code.split("\n").length > foldAfterLines
    const folded = foldable && !expanded

    async function copy() {
        if (await clipboard.copy(code, "Copied to the clipboard")) {
            haptic("success")
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1600)
        }
    }

    return (
        <div className="relative bg-elevated">
            {(label || lang) && (
                <div className="flex min-h-9 items-center justify-between gap-3 border-separator/60 border-b px-4 py-2">
                    <span className="min-w-0 truncate font-mono text-caption text-label-tertiary">
                        {label ?? "Example"}
                    </span>
                    <div className="flex shrink-0 items-center gap-1.5">
                        <span className="rounded-full bg-fill/70 px-2 py-1 text-caption2 font-medium text-label-secondary">
                            {languageNames[lang]}
                        </span>
                        <IconButton
                            label={copied ? "Copied" : "Copy code"}
                            variant="ghost"
                            size="icon-xs"
                            onClick={copy}
                        >
                            {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                        </IconButton>
                    </div>
                </div>
            )}
            <div className={cn("relative", folded && "max-h-36 overflow-hidden")}>
                <CodeBlock code={code}>
                    {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : undefined}
                </CodeBlock>
                {folded && (
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-elevated to-transparent" />
                )}
            </div>
            {foldable && (
                <div
                    className={cn(
                        "flex justify-center",
                        folded ? "absolute inset-x-0 bottom-3" : "pb-4"
                    )}
                >
                    <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        aria-expanded={expanded}
                        onClick={() => {
                            haptic("selection")
                            setExpanded((value) => !value)
                        }}
                    >
                        {expanded ? "Collapse code" : "Expand code"}
                    </Button>
                </div>
            )}
            {clipboard.fallback}
        </div>
    )
}
