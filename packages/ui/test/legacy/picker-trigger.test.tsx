import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { CompactDatePicker } from "../../src/legacy/compact-date-picker/compact-date-picker";
import { CompactTimePicker } from "../../src/legacy/compact-time-picker/compact-time-picker";
import { Picker } from "../../src/legacy/picker/picker";
import { pickerTriggerStyle } from "../../src/legacy/picker/picker-trigger";

test("picker-family triggers use one field treatment", () => {
	expect(pickerTriggerStyle()).toContain("control-field");
	expect(pickerTriggerStyle("custom-field")).toContain("custom-field");
	expect(pickerTriggerStyle()).toContain("disabled:opacity-40");
});

test("disabled picker-family triggers remain accessible and closed", () => {
	const picker = renderToStaticMarkup(
		<Picker
			label="Workspace"
			value="personal"
			onChange={() => {}}
			options={[{ label: "Personal", value: "personal" }]}
			disabled
		/>,
	);
	const date = renderToStaticMarkup(
		<CompactDatePicker
			value=""
			onChange={() => {}}
			label="Date"
			locale="en-US"
			labels={{ previousMonth: "Previous", nextMonth: "Next" }}
			disabled
		/>,
	);
	const time = renderToStaticMarkup(
		<CompactTimePicker
			value=""
			onChange={() => {}}
			label="Time"
			locale="en-US"
			labels={{ hour: "Hour", minute: "Minute", period: "Period" }}
			disabled
		/>,
	);

	for (const markup of [picker, date, time]) {
		expect(markup).toContain("control-field");
		expect(markup).toContain("disabled");
		expect(markup).toContain('aria-expanded="false"');
	}
});
