import { LocaleSwitcher } from "@passui/react/locale-switcher"
import { useState } from "react"

export function LocaleSwitcherNativeNames() {
    const [locale, setLocale] = useState("en")

    // a transformed frame holds the fixed switcher on this page
    return (
        <div className="relative h-80 w-full max-w-sm transform-gpu overflow-hidden rounded-4xl bg-fill/40">
            <p className="p-6 text-footnote text-label-secondary">
                Current: {locale}
            </p>
            <LocaleSwitcher
                label="Change language"
                locales={[
                    "en",
                    "fr",
                    "de",
                    "es",
                    "pt",
                    "ja",
                    "zh",
                ]}
                locale={locale}
                onSelect={setLocale}
                storageKey="docs-locale-switcher-native-names"
            />
        </div>
    )
}
