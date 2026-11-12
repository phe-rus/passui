import {
	LabeledContent,
	Slider,
	Picker,
	SegmentedControl,
	TextField,
	Toggle,
} from "@passui/react";
import type { AnyControl, RegisteredDocs } from "@/features/catalog/data";
import type { ControlValue, PropValues } from "@/features/catalog";

type ControlsPanelProps = {
	docs: RegisteredDocs;
	values: PropValues;
	onChange: (key: string, value: ControlValue) => void;
};

type ControlRowProps = {
	name: string;
	control: AnyControl;
	value: ControlValue;
	onChange: (value: ControlValue) => void;
};

// short lists read best as segments; long ones as a pop-up menu
const segmentLimit = 4;

function ControlRow({ name, control, value, onChange }: ControlRowProps) {
	switch (control.kind) {
		case "boolean":
			return (
				<LabeledContent label={name}>
					<Toggle
						label={name}
						labelHidden
						checked={value === true}
						onChange={onChange}
					/>
				</LabeledContent>
			);
		case "number":
			return (
				<Slider
					label={name}
					value={Number(value)}
					onChange={onChange}
					min={control.min ?? 0}
					max={control.max ?? 100}
					step={control.step ?? 1}
					formatValue={(current) => String(current)}
				/>
			);
		case "text":
			return (
				<TextField
					label={name}
					value={String(value)}
					onChange={(event) => onChange(event.target.value)}
				/>
			);
		case "select": {
			const options = Object.keys(control.options).map((option) => ({
				value: option,
				label: option,
			}));
			return options.length <= segmentLimit ? (
				<SegmentedControl
					label={name}
					value={String(value)}
					options={options}
					onChange={onChange}
				/>
			) : (
				<div className="flex flex-col gap-1.5">
					<span className="text-footnote text-label-secondary font-semibold">
						{name}
					</span>
					<Picker
						label={name}
						value={String(value)}
						options={options}
						onChange={onChange}
					/>
				</div>
			);
		}
	}
}

/** One control per documented prop, in the order the docs list them. */
export function ControlsPanel({ docs, values, onChange }: ControlsPanelProps) {
	return (
		<div className="grid gap-x-4 gap-y-3 p-4 sm:grid-cols-2">
			{Object.entries(docs.controls).map(([name, control]) =>
				control ? (
					<div
						key={name}
						className={control.kind === "text" ? "sm:col-span-2" : undefined}
					>
						<ControlRow
							name={name}
							control={control}
							value={values[name]}
							onChange={(value) => onChange(name, value)}
						/>
					</div>
				) : null,
			)}
		</div>
	);
}
