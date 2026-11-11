import { LocaleSwitcher } from "@passui/react/locale-switcher";
import { useState } from "react";

const greetings: Record<string, { title: string; body: string }> = {
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
};

export function LocaleSwitcherShowcase() {
	const [locale, setLocale] = useState("en");
	const text = greetings[locale];

	return (
		<div
			lang={locale}
			className="rounded-sheet bg-background ring-separator/60 relative flex h-72 w-full max-w-sm transform-gpu flex-col items-center justify-center gap-2 overflow-hidden p-8 text-center shadow-sm ring-1"
		>
			<h2 className="text-title2 text-label font-bold">{text.title}</h2>
			<p className="text-callout text-label-secondary">{text.body}</p>
			<LocaleSwitcher
				label="Change language"
				locales={["en", "fr", "ja"]}
				locale={locale}
				onSelect={setLocale}
				storageKey="docs-locale-switcher-showcase"
			/>
		</div>
	);
}
