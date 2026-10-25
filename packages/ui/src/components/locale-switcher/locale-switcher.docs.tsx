import { LocaleSwitcherTranslatedPage } from "./examples/locale-switcher-translated-page"
import { LocaleSwitcherNativeNames } from "./examples/locale-switcher-native-names"
import { useState } from "react"
import { defineDocs } from "../../docs/types"
import { LocaleSwitcherShowcase } from "./examples/locale-switcher-showcase"
import { LocaleSwitcherUsage } from "./examples/locale-switcher-usage"
import { LocaleSwitcher } from "./locale-switcher"

// The locales list is an array, so the playground offers a few sets.
type DemoProps = {
    label: string
    locales: "en-fr-zh" | "en-ja" | "en-de-es-pt"
}

const sets = {
    "en-fr-zh": ["en", "fr", "zh"],
    "en-ja": ["en", "ja"],
    "en-de-es-pt": ["en", "de", "es", "pt"],
} as const

function LocaleSwitcherDemo({ label, locales }: DemoProps) {
    const [locale, setLocale] = useState<string>("en")
    return (
        <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-headline font-semibold text-label">
                Current language: {locale}
            </p>
            <p className="text-footnote text-label-secondary">
                The switcher floats in the bottom corner. Drag
                it to another corner.
            </p>
            <LocaleSwitcher
                key={locales}
                label={label}
                locales={sets[locales]}
                locale={locale}
                onSelect={setLocale}
                storageKey="passui-docs-locale-switcher"
            />
        </div>
    )
}

export const localeSwitcherDocs = defineDocs<DemoProps>()({
    slug: "locale-switcher",
    name: "LocaleSwitcher",
    importPath: "@passui/react/locale-switcher",
    controls: {
        label: {
            kind: "text",
            default: "Change language",
            required: true,
        },
        locales: {
            kind: "select",
            options: {
                "en-fr-zh": true,
                "en-ja": true,
                "en-de-es-pt": true,
            },
            default: "en-fr-zh",
        },
    },
    render: (values) => <LocaleSwitcherDemo {...values} />,
    childrenSnippet: ({ locales }) => ({
        imports: ['import { useState } from "react"'],
        setup: ['const [locale, setLocale] = useState("en")'],
        omit: ["locales"],
        extraProps: { storageKey: "locale-switcher" },
        expressionProps: {
            locales: JSON.stringify(sets[locales]),
            locale: "locale",
            onSelect: "setLocale",
        },
        children: "",
    }),
    usage: LocaleSwitcherUsage,
    showcase: LocaleSwitcherShowcase,
    examples: [
        {
            id: "native-names",
            component: LocaleSwitcherNativeNames,
            playground: { locales: "en-de-es-pt" },
        },
        {
            id: "translated-page",
            component: LocaleSwitcherTranslatedPage,
        },
    ],
    previewHeight: 320,
})
