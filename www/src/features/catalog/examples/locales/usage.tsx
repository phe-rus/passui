import { Locales } from "@passui/react/locales";
import { useState } from "react";

export function LocalesUsage() {
	const [locale, setLocale] = useState("en");

	return (
		<Locales
			label="Change language"
			locales={["en", "fr", "zh"]}
			locale={locale}
			onSelect={setLocale}
		/>
	);
}
