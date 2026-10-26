import { createSignal } from "solid-js"
import { LocaleSwitcher } from "@passui/solid/locale-switcher"

export function LocaleSwitcherNativeNames() {
    const [locale, setLocale] = createSignal("en")
    return (
        <div class="relative h-80 w-full max-w-sm transform-gpu overflow-hidden rounded-4xl bg-fill/40">
            <p class="p-6 text-footnote text-label-secondary">
                Current: {locale()}
            </p>
            <LocaleSwitcher
                locale={locale()}
                locales={[
                    "en",
                    "fr",
                    "de",
                    "es",
                    "pt",
                    "ja",
                    "zh",
                ]}
                onSelect={setLocale}
                storageKey="docs-locale-switcher-native-names"
                label="Change language"
            />
        </div>
    )
}
