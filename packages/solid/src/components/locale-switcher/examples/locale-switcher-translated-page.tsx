import { createSignal } from "solid-js"
import { LocaleSwitcher } from "@passui/solid/locale-switcher"

const copy = {
    en: { title: "Sign in", button: "Continue" },
    fr: { title: "Connexion", button: "Continuer" },
    zh: { title: "登录", button: "继续" },
}
type Locale = keyof typeof copy

export function LocaleSwitcherTranslatedPage() {
    const [locale, setLocale] = createSignal<Locale>("fr")
    return (
        <div
            lang={locale()}
            class="relative flex h-64 w-full max-w-sm transform-gpu flex-col items-center justify-center gap-4 overflow-hidden rounded-4xl bg-elevated shadow-sm ring-1 ring-separator/60"
        >
            <h2 class="text-title2 font-bold text-label">
                {copy[locale()].title}
            </h2>
            <span class="rounded-full bg-inverse px-5 py-2 text-subheadline font-semibold text-on-inverse">
                {copy[locale()].button}
            </span>
            <LocaleSwitcher
                locale={locale()}
                locales={["en", "fr", "zh"] as Locale[]}
                onSelect={(value) =>
                    setLocale(value as Locale)
                }
                storageKey="docs-locale-switcher-translated-page"
                label="Change language"
            />
        </div>
    )
}
