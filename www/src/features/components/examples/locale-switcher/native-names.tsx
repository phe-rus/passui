import { LocaleSwitcher } from "@passui/react/locale-switcher";
import { useState } from "react";

export function LocaleSwitcherNativeNames() {
	const [locale, setLocale] = useState("en");

	// a transformed frame holds the fixed switcher on this page
	return (
		<div className="bg-fill/40 relative h-80 w-full max-w-sm transform-gpu overflow-hidden rounded-4xl">
			<p className="text-footnote text-label-secondary p-6">
				Current: {locale}
			</p>
			<LocaleSwitcher
				label="Change language"
				locales={["en", "fr", "de", "es", "pt", "ja", "zh"]}
				locale={locale}
				onSelect={setLocale}
				storageKey="docs-locale-switcher-native-names"
			/>
		</div>
	);
}
