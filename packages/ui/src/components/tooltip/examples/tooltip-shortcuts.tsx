import {
    TextBoldIcon,
    TextItalicIcon,
    TextUnderlineIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@passui/react/button"

const tools = [
    { label: "Bold", keys: "⌘B", icon: TextBoldIcon },
    { label: "Italic", keys: "⌘I", icon: TextItalicIcon },
    {
        label: "Underline",
        keys: "⌘U",
        icon: TextUnderlineIcon,
    },
]

export function TooltipShortcuts() {
    return (
        <div className="flex gap-1 rounded-full bg-elevated p-1 shadow-sm ring-1 ring-separator/60">
            {tools.map((tool) => (
                <Button
                    key={tool.label}
                    variant="ghost"
                    size="icon-sm"
                    aria-label={tool.label}
                    data-tooltip={`${tool.label}  ${tool.keys}`}
                >
                    <HugeiconsIcon
                        icon={tool.icon}
                        size={18}
                    />
                </Button>
            ))}
        </div>
    )
}
