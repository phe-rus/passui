import { createSignal } from "solid-js"
import { toast } from "@passui/solid/toast"
import { IconButton } from "@passui/solid/icon-button"

export function IconButtonShowcase() {
    const [saved, setSaved] = createSignal(false)
    return (
        <article class="flex w-full max-w-sm flex-col overflow-hidden rounded-4xl bg-elevated shadow-sm ring-1 ring-separator/60">
            <header class="flex items-center justify-between p-3">
                <IconButton
                    label="Back"
                    variant="ghost"
                    size="icon-sm"
                >
                    <span aria-hidden="true">←</span>
                </IconButton>
                <div class="flex gap-1">
                    <IconButton
                        label={
                            saved()
                                ? "Remove bookmark"
                                : "Bookmark"
                        }
                        variant={saved() ? "accent" : "ghost"}
                        size="icon-sm"
                        onClick={() => setSaved(!saved())}
                    >
                        <span aria-hidden="true">♧</span>
                    </IconButton>
                    <IconButton
                        label="Share"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() =>
                            toast.success("Link copied")
                        }
                    >
                        <span aria-hidden="true">↗</span>
                    </IconButton>
                    <IconButton
                        label="More"
                        variant="ghost"
                        size="icon-sm"
                    >
                        <span aria-hidden="true">···</span>
                    </IconButton>
                </div>
            </header>
            <div class="h-36 bg-accent-soft" />
            <div class="flex flex-col gap-1 p-5">
                <h2 class="text-headline font-semibold text-label">
                    Designing for calm
                </h2>
                <p class="text-footnote text-label-secondary">
                    Six minutes · Saved items stay on every
                    device.
                </p>
            </div>
        </article>
    )
}
