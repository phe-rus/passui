import {
    TextAlignCenterIcon,
    TextAlignLeftIcon,
    TextBoldIcon,
    TextItalicIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@passui/react/button"

const tools = [
    { label: "Bold", icon: TextBoldIcon },
    { label: "Italic", icon: TextItalicIcon },
    { label: "Align left", icon: TextAlignLeftIcon },
    { label: "Align centre", icon: TextAlignCenterIcon },
]

export function ButtonIcon() {
    return (
        <div
            role="toolbar"
            aria-label="Formatting"
            className="flex items-center gap-1 rounded-full bg-fill/60 p-1"
        >
            {tools.map((tool) => (
                <Button
                    key={tool.label}
                    size="icon-sm"
                    variant="ghost"
                    aria-label={tool.label}
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
