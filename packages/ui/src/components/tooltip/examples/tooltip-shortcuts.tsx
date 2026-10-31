import {
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
} from "@passui/react/icons"
import { Button } from "@passui/react/button"

const tools = [
    { label: "Bold", keys: "⌘B", icon: BoldIcon },
    { label: "Italic", keys: "⌘I", icon: ItalicIcon },
    {
        label: "Underline",
        keys: "⌘U",
        icon: UnderlineIcon,
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
                    <tool.icon size={18} />
                </Button>
            ))}
        </div>
    )
}
