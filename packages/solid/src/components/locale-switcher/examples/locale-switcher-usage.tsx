import { createSignal } from "solid-js"
import { LocaleSwitcher } from "@passui/solid/locale-switcher"
export function LocaleSwitcherUsage() {
    const [locale, setLocale] = createSignal("en")
    return (
        <div class="relative h-48 w-full max-w-sm transform-gpu overflow-hidden rounded-4xl bg-fill/40">
            <LocaleSwitcher
                locale={locale()}
                locales={["en", "fr", "zh"]}
                onSelect={setLocale}
                storageKey="docs-locale-switcher-usage"
                label="Change language"
            />
        </div>
    )
}
