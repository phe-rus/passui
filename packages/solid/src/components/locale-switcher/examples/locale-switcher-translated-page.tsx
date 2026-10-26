import { createSignal } from "solid-js"
import { LocaleSwitcher } from "@passui/solid/locale-switcher"

export function LocaleSwitcherTranslatedPage() {
    const [locale, setLocale] = createSignal("en")
    const greeting = () =>
        ({
            en: "Welcome back",
            sw: "Karibu tena",
            fr: "Bon retour",
        })[locale() as "en" | "sw" | "fr"]
    return (
        <div class="relative grid h-36 w-full gap-3">
            <LocaleSwitcher
                locale={locale()}
                locales={["en", "sw", "fr"]}
                onSelect={setLocale}
                storageKey="passui-solid-translated-page"
                label="Language"
            />
            <p class="text-title3 font-semibold">
                {greeting()}
            </p>
        </div>
    )
}
