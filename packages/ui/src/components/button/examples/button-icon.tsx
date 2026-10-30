import {
    AlignCenterIcon,
    AlignLeftIcon,
    BoldIcon,
    ItalicIcon,
} from "@passui/react/icons"
import { Button } from "@passui/react/button"

const tools = [
    { label: "Bold", icon: BoldIcon },
    { label: "Italic", icon: ItalicIcon },
    { label: "Align left", icon: AlignLeftIcon },
    { label: "Align centre", icon: AlignCenterIcon },
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
                    <tool.icon size={18} />
                </Button>
            ))}
        </div>
    )
}
