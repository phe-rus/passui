import { For } from "solid-js"
import { IconButton } from "@passui/solid/icon-button"

const actions = [
    { label: "Reply", symbol: "↩" },
    { label: "Star", symbol: "☆" },
    { label: "Archive", symbol: "▥" },
    { label: "Delete", symbol: "♲" },
]

export function TooltipShowcase() {
    return (
        <div class="flex w-full max-w-sm flex-col gap-4 rounded-4xl bg-elevated p-5 shadow-sm ring-1 ring-separator/60">
            <div class="flex items-center justify-between">
                <span class="text-headline font-semibold text-label">
                    Inbox
                </span>
                <div class="flex gap-1">
                    <For each={actions}>
                        {(action) => (
                            <IconButton
                                label={action.label}
                                variant="ghost"
                            >
                                <span aria-hidden="true">
                                    {action.symbol}
                                </span>
                            </IconButton>
                        )}
                    </For>
                </div>
            </div>
            <p class="m-0 text-callout text-label-secondary">
                Hover an icon to see what it does.
            </p>
        </div>
    )
}
