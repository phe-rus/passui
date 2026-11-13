import { Button } from "@passui/react/button";
import { Card, CardContent, CardHeader, CardTitle } from "@passui/react/card";
import { Locales } from "@passui/react/locales";
import { useState } from "react";

const copy = {
	en: { title: "Sign in", button: "Continue" },
	fr: { title: "Connexion", button: "Continuer" },
	zh: { title: "登录", button: "继续" },
};

type Locale = keyof typeof copy;

export function LocalesTranslatedPage() {
	const [locale, setLocale] = useState<Locale>("fr");

	return (
		<Card lang={locale} className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>{copy[locale].title}</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-3">
				<Button>{copy[locale].button}</Button>
				<Locales
					label="Change language"
					locales={["en", "fr", "zh"] as Locale[]}
					locale={locale}
					onSelect={setLocale}
					className="w-full"
				/>
			</CardContent>
		</Card>
	);
}
