/** @jsxImportSource solid-js */
import { createSignal } from "solid-js"
import { LocaleSwitcher } from "@passui/solid/locale-switcher"
export function LocaleSwitcherUsage() {
    const [locale, setLocale] = createSignal("en")
    return (
        <div class="relative h-32 w-full">
            <LocaleSwitcher
                locale={locale()}
                locales={["en", "sw", "fr"]}
                onSelect={setLocale}
                storageKey="passui-docs-locale-position"
                label="Change language"
            />
        </div>
    )
}
