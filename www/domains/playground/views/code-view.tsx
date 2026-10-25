import {
    Copy01Icon,
    Tick02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { toast } from "@passui/react"
import { cn } from "@passui/react/cn"
import { IconButton } from "@passui/react/icon-button"
import { useState } from "react"
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

/**
 * Code with a copy button. Plain text shows at the same size until the
 * highlighter loads, so nothing shifts when the colours arrive.
 */
export function CodeView({
    code,
    label,
    collapsible = true,
    lang = "tsx",
}: CodeViewProps) {
    const html = useHighlight(code, lang)
    const [copied, setCopied] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const foldable =
        collapsible &&
        code.split("\n").length > foldAfterLines
    const folded = foldable && !expanded

    async function copy() {
        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            toast.success("Copied to the clipboard")
            window.setTimeout(() => setCopied(false), 1600)
        } catch {
            toast.error(
                "Could not copy. Select the code instead."
            )
        }
    }

    return (
        <div className="code-view relative bg-elevated">
            {label && (
                <div className="border-separator/60 border-b px-5 py-2.5 font-mono text-caption text-label-tertiary">
                    {label}
                </div>
            )}
            <div
                className={cn(
                    "relative",
                    folded && "max-h-36 overflow-hidden"
                )}
            >
                {html ? (
                    <div
                        className="[&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:p-5 [&_pre]:pe-16 [&_pre]:font-mono [&_pre]:text-footnote [&_pre]:leading-relaxed"
                        // Shiki escapes the displayed example source
                        dangerouslySetInnerHTML={{
                            __html: html,
                        }}
                    />
                ) : (
                    <pre className="m-0 overflow-x-auto p-5 pe-16 font-mono text-footnote leading-relaxed text-label">
                        <code>{code}</code>
                    </pre>
                )}
                {folded && (
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-elevated to-transparent" />
                )}
            </div>
            {foldable && (
                <div
                    className={cn(
                        "flex justify-center",
                        folded
                            ? "absolute inset-x-0 bottom-3"
                            : "pb-4"
                    )}
                >
                    <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() =>
                            setExpanded((value) => !value)
                        }
                        className="cursor-pointer rounded-full bg-background px-3.5 py-1.5 text-footnote font-semibold text-label shadow-sm ring-1 ring-separator/70 transition-colors hover:bg-fill"
                    >
                        {expanded
                            ? "Collapse code"
                            : "Expand code"}
                    </button>
                </div>
            )}
            <IconButton
                label={copied ? "Copied" : "Copy code"}
                variant="ghost"
                size="icon-sm"
                onClick={copy}
                className={cn(
                    "absolute right-3",
                    label ? "top-1" : "top-3"
                )}
            >
                <HugeiconsIcon
                    icon={copied ? Tick02Icon : Copy01Icon}
                    size={18}
                />
            </IconButton>
        </div>
    )
}
