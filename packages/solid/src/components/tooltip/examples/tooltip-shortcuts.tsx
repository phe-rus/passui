import { For } from "solid-js"
import { Button } from "@passui/solid/button"
import { TooltipHost } from "@passui/solid/tooltip"

const tools = [
    { label: "Bold", keys: "⌘B", symbol: "B" },
    { label: "Italic", keys: "⌘I", symbol: "I" },
    { label: "Underline", keys: "⌘U", symbol: "U" },
]

export function TooltipShortcuts() {
    return (
        <>
            <div class="flex gap-1 rounded-full bg-elevated p-1 shadow-sm ring-1 ring-separator/60">
                <For each={tools}>
                    {(tool) => (
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={tool.label}
                            data-tooltip={`${tool.label}  ${tool.keys}`}
                        >
                            <span
                                aria-hidden="true"
                                class="font-semibold"
                            >
                                {tool.symbol}
                            </span>
                        </Button>
                    )}
                </For>
            </div>
            <TooltipHost />
        </>
    )
}
