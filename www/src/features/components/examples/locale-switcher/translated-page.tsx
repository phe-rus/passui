import { LocaleSwitcher } from "@passui/react/locale-switcher";
import { useState } from "react";

const copy = {
	en: { title: "Sign in", button: "Continue" },
	fr: { title: "Connexion", button: "Continuer" },
	zh: { title: "登录", button: "继续" },
};

type Locale = keyof typeof copy;

export function LocaleSwitcherTranslatedPage() {
	const [locale, setLocale] = useState<Locale>("fr");

	return (
		<div
			lang={locale}
			className="bg-elevated ring-separator/60 relative flex h-64 w-full max-w-sm transform-gpu flex-col items-center justify-center gap-4 overflow-hidden rounded-4xl shadow-sm ring-1"
		>
			<h2 className="text-title2 text-label font-bold">{copy[locale].title}</h2>
			<span className="bg-inverse text-subheadline text-on-inverse rounded-full px-5 py-2 font-semibold">
				{copy[locale].button}
			</span>
			<LocaleSwitcher
				label="Change language"
				locales={["en", "fr", "zh"] as Locale[]}
				locale={locale}
				onSelect={setLocale}
				storageKey="docs-locale-switcher-translated-page"
			/>
		</div>
	);
}
