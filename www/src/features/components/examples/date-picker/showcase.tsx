import { Button } from "@passui/react/button";
import { DatePicker } from "@passui/react/date-picker";
import { toast } from "@passui/react/toast";
import { useState } from "react";

export function DatePickerShowcase() {
	const [birthday, setBirthday] = useState("");
	const today = new Date().toISOString().slice(0, 10);

	return (
		<form
			className="bg-elevated ring-separator/60 flex w-full max-w-sm flex-col gap-5 rounded-4xl p-6 shadow-sm ring-1"
			onSubmit={(event) => {
				event.preventDefault();
				toast.success({ title: "Birthday saved" });
			}}
		>
			<div className="flex flex-col gap-1">
				<h2 className="text-headline text-label font-semibold">
					When's your birthday?
				</h2>
				<p className="text-footnote text-label-secondary">
					We use it to keep your account suited to your age. It isn't shown to
					anyone.
				</p>
			</div>
			<DatePicker
				label="Birthday"
				labels={{
					day: "Day",
					month: "Month",
					year: "Year",
					invalid: "Enter a real date in the past.",
				}}
				locale="en-US"
				max={today}
				value={birthday}
				onChange={setBirthday}
			/>
			<Button type="submit" disabled={!birthday}>
				Continue
			</Button>
		</form>
	);
}
