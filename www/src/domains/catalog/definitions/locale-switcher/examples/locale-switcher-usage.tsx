import { LocaleSwitcher } from "@passui/react/locale-switcher"
import { useState } from "react"

export function LocaleSwitcherUsage() {
    const [locale, setLocale] = useState("en")

    // In an app it floats over the whole screen; here a transformed
    // frame holds it, since a fixed element sits inside such a frame.
    return (
        <div className="relative h-48 w-full max-w-sm transform-gpu overflow-hidden rounded-4xl bg-fill/40">
            <LocaleSwitcher
                label="Change language"
                locales={["en", "fr", "zh"]}
                locale={locale}
                onSelect={setLocale}
                storageKey="docs-locale-switcher-usage"
            />
        </div>
    )
}
