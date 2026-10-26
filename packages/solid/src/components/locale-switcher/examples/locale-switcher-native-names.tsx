import { createSignal } from "solid-js"
import { LocaleSwitcher } from "@passui/solid/locale-switcher"

export function LocaleSwitcherNativeNames() {
    const [locale, setLocale] = createSignal("en")
    return (
        <div class="relative h-32 w-full">
            <LocaleSwitcher
                locale={locale()}
                locales={["en", "sw", "fr", "de", "es"]}
                onSelect={setLocale}
                storageKey="passui-solid-locales-native"
                label="Choose language"
            />
            <output class="text-footnote text-label-secondary">
                Current: {locale()}
            </output>
        </div>
    )
}
