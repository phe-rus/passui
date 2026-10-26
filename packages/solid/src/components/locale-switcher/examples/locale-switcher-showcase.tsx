import { createSignal } from "solid-js"
import { LocaleSwitcher } from "@passui/solid/locale-switcher"

const greetings: Record<
    string,
    { title: string; body: string }
> = {
    en: {
        title: "Welcome back",
        body: "Pick up where you left off.",
    },
    fr: {
        title: "Bon retour",
        body: "Reprenez là où vous vous êtes arrêté.",
    },
    ja: {
        title: "おかえりなさい",
        body: "前回の続きから始めましょう。",
    },
}

export function LocaleSwitcherShowcase() {
    const [locale, setLocale] = createSignal("en")
    const current = () => greetings[locale()] ?? greetings.en
    return (
        <div
            lang={locale()}
            class="relative flex h-72 w-full max-w-sm transform-gpu flex-col items-center justify-center gap-2 overflow-hidden rounded-sheet bg-background p-8 text-center shadow-sm ring-1 ring-separator/60"
        >
            <h2 class="text-title2 font-bold text-label">
                {current().title}
            </h2>
            <p class="text-callout text-label-secondary">
                {current().body}
            </p>
            <LocaleSwitcher
                label="Change language"
                locales={["en", "fr", "ja"]}
                locale={locale()}
                onSelect={setLocale}
                storageKey="docs-locale-switcher-showcase"
            />
        </div>
    )
}
