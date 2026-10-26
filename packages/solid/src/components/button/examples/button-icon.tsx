import { Button } from "@passui/solid/button"
import {
    TextAlignCenterIcon,
    TextAlignLeftIcon,
    TextBoldIcon,
    TextItalicIcon,
} from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"

export function ButtonIcon() {
    return (
        <div
            role="toolbar"
            aria-label="Formatting"
            class="flex items-center gap-1 rounded-full bg-fill/60 p-1"
        >
            <Button
                size="icon-sm"
                variant="ghost"
                aria-label="Bold"
            >
                <Hugeicon icon={TextBoldIcon} size={18} />
            </Button>
            <Button
                size="icon-sm"
                variant="ghost"
                aria-label="Italic"
            >
                <Hugeicon icon={TextItalicIcon} size={18} />
            </Button>
            <Button
                size="icon-sm"
                variant="ghost"
                aria-label="Align left"
            >
                <Hugeicon
                    icon={TextAlignLeftIcon}
                    size={18}
                />
            </Button>
            <Button
                size="icon-sm"
                variant="ghost"
                aria-label="Align centre"
            >
                <Hugeicon
                    icon={TextAlignCenterIcon}
                    size={18}
                />
            </Button>
        </div>
    )
}
