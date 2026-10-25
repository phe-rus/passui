import {
    Button,
    LabeledContent,
    SegmentedControl,
    Toggle,
} from "@passui/react"
import type { ButtonVariant } from "@passui/react/button"
import { useState } from "react"

type TeaserVariant = Extract<
    ButtonVariant,
    "default" | "secondary" | "outline" | "accent"
>

export function PlaygroundTeaser() {
    const [variant, setVariant] =
        useState<TeaserVariant>("accent")
    const [pending, setPending] = useState(false)
    const props = [
        variant !== "default" && `variant="${variant}"`,
        pending && "isPending",
    ]
        .filter(Boolean)
        .join(" ")
    const code = `<Button${props ? ` ${props}` : ""}>Continue</Button>`

    return (
        <section
            id="playground"
            aria-labelledby="playground-title"
            className="mx-auto grid w-full max-w-6xl scroll-mt-24 items-center gap-8 px-4 md:grid-cols-2 md:px-6"
        >
            <div className="flex flex-col gap-5">
                <h2
                    id="playground-title"
                    className="text-[clamp(2rem,4vw,2.6rem)] leading-[1.08] font-bold tracking-tight text-label"
                >
                    Try it right here
                </h2>
                <p className="max-w-md text-body text-label-secondary">
                    Every component has a playground: flip its
                    options, switch theme, accent and
                    platform, and copy code that matches what
                    you see.
                </p>
                <div className="flex max-w-md flex-col gap-4">
                    <SegmentedControl
                        value={variant}
                        onChange={setVariant}
                        label="Variant"
                        options={[
                            {
                                value: "default",
                                label: "Default",
                            },
                            {
                                value: "secondary",
                                label: "Secondary",
                            },
                            {
                                value: "outline",
                                label: "Outline",
                            },
                            {
                                value: "accent",
                                label: "Accent",
                            },
                        ]}
                    />
                    <LabeledContent label="Pending">
                        <Toggle
                            checked={pending}
                            onChange={setPending}
                            label="Pending"
                            labelHidden
                        />
                    </LabeledContent>
                </div>
                <p className="text-footnote text-label-tertiary">
                    Explore every option on the Button page.
                </p>
            </div>
            <div className="overflow-hidden rounded-5xl bg-elevated ring-1 ring-separator/60">
                <div className="flex min-h-56 items-center justify-center bg-accent-soft/50 p-10 transition-colors duration-700">
                    <Button
                        variant={variant}
                        isPending={pending}
                    >
                        Continue
                    </Button>
                </div>
                <pre className="overflow-x-auto border-separator/60 border-t px-5 py-4 font-mono text-footnote text-label">
                    <code>{code}</code>
                </pre>
            </div>
        </section>
    )
}
