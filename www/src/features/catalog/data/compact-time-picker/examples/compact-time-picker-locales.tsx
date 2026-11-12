import { CompactTimePicker } from "@passui/react/compact-time-picker";
import { LabeledContent } from "@passui/react";
import { useState } from "react";

export function CompactTimePickerLocales() {
	const [time, setTime] = useState("18:30");
	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			{(["en-US", "en-GB", "ar-EG"] as const).map((locale) => (
				<LabeledContent key={locale} label={locale}>
					<div dir={locale === "ar-EG" ? "rtl" : undefined}>
						<CompactTimePicker
							label={`Time (${locale})`}
							locale={locale}
							value={time}
							onChange={setTime}
							labels={{ hour: "Hour", minute: "Minute", period: "AM or PM" }}
						/>
					</div>
				</LabeledContent>
			))}
		</div>
	);
}
