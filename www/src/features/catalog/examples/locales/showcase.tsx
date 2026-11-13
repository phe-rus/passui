import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@passui/react/card";
import { Locales } from "@passui/react/locales";
import { useState } from "react";

const greetings: Record<string, { title: string; body: string }> = {
	en: { title: "Welcome back", body: "Pick up where you left off." },
	fr: { title: "Bon retour", body: "Reprenez là où vous vous êtes arrêté." },
	ja: { title: "おかえりなさい", body: "前回の続きから始めましょう。" },
};

export function LocalesShowcase() {
	const [locale, setLocale] = useState("en");
	const text = greetings[locale];

	return (
		<Card lang={locale} className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>{text?.title}</CardTitle>
				<CardDescription>{text?.body}</CardDescription>
			</CardHeader>
			<CardContent>
				<Locales
					label="Change language"
					locales={["en", "fr", "ja"]}
					locale={locale}
					onSelect={setLocale}
					className="w-full"
				/>
			</CardContent>
		</Card>
	);
}
