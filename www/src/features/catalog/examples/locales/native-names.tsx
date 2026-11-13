import { Locales } from "@passui/react/locales";
import { useState } from "react";

export function LocalesNativeNames() {
	const [locale, setLocale] = useState("en");

	return (
		<Locales
			label="Change language"
			locales={["en", "fr", "de", "es", "pt", "ja", "zh"]}
			locale={locale}
			onSelect={setLocale}
			size="lg"
		/>
	);
}
