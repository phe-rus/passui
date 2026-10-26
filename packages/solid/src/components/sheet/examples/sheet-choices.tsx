import { createSignal, For, Show } from "solid-js"
import { Sheet } from "@passui/solid/sheet"
import { Button } from "@passui/solid/button"
import { LabeledContent } from "@passui/solid/labeled-content"
import { Section } from "@passui/solid/section"

const languages = [
    "English",
    "Français",
    "Deutsch",
    "日本語",
    "中文",
]

export function SheetChoices() {
    const [open, setOpen] = createSignal(false)
    const [language, setLanguage] = createSignal("English")
    return (
        <div class="w-full max-w-sm">
            <Section>
                <LabeledContent label="Language">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        {language()}
                    </Button>
                </LabeledContent>
            </Section>
            <Sheet
                open={open()}
                onClose={() => setOpen(false)}
                label="Language"
            >
                <div class="flex flex-col gap-1 p-4">
                    <For each={languages}>
                        {(item) => (
                            <button
                                type="button"
                                aria-pressed={
                                    item === language()
                                }
                                class="flex items-center justify-between rounded-3xl px-4 py-3 text-start text-body text-label hover:bg-fill aria-pressed:text-accent-text"
                                onClick={() => {
                                    setLanguage(item)
                                    setOpen(false)
                                }}
                            >
                                {item}
                                <Show
                                    when={item === language()}
                                >
                                    <span aria-hidden="true">
                                        ✓
                                    </span>
                                </Show>
                            </button>
                        )}
                    </For>
                </div>
            </Sheet>
        </div>
    )
}
