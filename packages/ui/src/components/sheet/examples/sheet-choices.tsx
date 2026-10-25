import { LabeledContent, Section } from "@passui/react"
import { Button } from "@passui/react/button"
import { Sheet } from "@passui/react/sheet"
import { useState } from "react"

const languages = [
    "English",
    "Français",
    "Deutsch",
    "日本語",
    "中文",
]

export function SheetChoices() {
    const [open, setOpen] = useState(false)
    const [language, setLanguage] = useState("English")

    return (
        <div className="w-full max-w-sm">
            <Section>
                <LabeledContent label="Language">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        {language}
                    </Button>
                </LabeledContent>
            </Section>
            <Sheet
                open={open}
                onClose={() => setOpen(false)}
                label="Language"
            >
                <div className="flex flex-col gap-1 p-4">
                    {languages.map((item) => (
                        <button
                            key={item}
                            type="button"
                            aria-pressed={item === language}
                            onClick={() => {
                                setLanguage(item)
                                setOpen(false)
                            }}
                            className="flex items-center justify-between rounded-3xl px-4 py-3 text-start text-body text-label hover:bg-fill aria-pressed:text-accent-text"
                        >
                            {item}
                            {item === language && (
                                <span aria-hidden>✓</span>
                            )}
                        </button>
                    ))}
                </div>
            </Sheet>
        </div>
    )
}
