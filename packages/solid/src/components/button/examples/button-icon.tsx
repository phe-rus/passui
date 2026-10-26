import { Button } from "@passui/solid/button"

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
                <span aria-hidden="true" class="font-bold">
                    B
                </span>
            </Button>
            <Button
                size="icon-sm"
                variant="ghost"
                aria-label="Italic"
            >
                <span aria-hidden="true" class="italic">
                    I
                </span>
            </Button>
            <Button
                size="icon-sm"
                variant="ghost"
                aria-label="Align left"
            >
                <span aria-hidden="true">☷</span>
            </Button>
            <Button
                size="icon-sm"
                variant="ghost"
                aria-label="Align centre"
            >
                <span aria-hidden="true">≡</span>
            </Button>
        </div>
    )
}
