import { Checkbox } from "@passui/react/checkbox";
import { cn } from "@passui/react/cn";
import { RadioGroup, RadioGroupItem } from "@passui/react/radio-group";
import type { ReactNode } from "react";
import { useFieldContext } from "../forms/contexts";

type Option = {
	label: string;
	value: string;
	description?: string;
	icon?: ReactNode;
	disabled?: boolean;
};

export function FieldRadioCard({
	label,
	description,
	options,
	disabled,
	columns = 1,
}: {
	label: string;
	description?: string;
	options: Option[];
	disabled?: boolean;
	columns?: 1 | 2;
}) {
	const field = useFieldContext<string>();
	return (
		<RadioGroup
			name={field.name}
			disabled={disabled}
			value={field.state.value}
			aria-label={label}
			onValueChange={(value) => {
				if (value !== null) field.handleChange(value);
				field.handleBlur();
			}}
		>
			<div className="text-subheadline font-semibold">{label}</div>
			{description && (
				<p className="text-footnote text-label-secondary">{description}</p>
			)}
			<div className={cn("grid gap-2", columns === 2 && "md:grid-cols-2")}>
				{options.map((option) => (
					<RadioGroupItem
						key={option.value}
						value={option.value}
						disabled={option.disabled}
						className={cn(
							"items-start rounded-xl border p-3",
							field.state.value === option.value
								? "border-accent-text bg-accent/10"
								: "border-separator bg-elevated",
						)}
					>
						{option.icon}
						<span className="text-subheadline">
							{option.label}
							{option.description && (
								<span className="text-footnote text-label-secondary block">
									{option.description}
								</span>
							)}
						</span>
					</RadioGroupItem>
				))}
			</div>
		</RadioGroup>
	);
}

export function FieldMultiselect({
	label,
	description,
	options,
}: {
	label: string;
	description?: string;
	options: Option[];
}) {
	const field = useFieldContext<string[]>();
	return (
		<fieldset className="flex flex-col gap-3">
			<legend className="text-subheadline font-semibold">{label}</legend>
			{description && (
				<p className="text-footnote text-label-secondary">{description}</p>
			)}
			{options.map((option) => (
				<div key={option.value}>
					<Checkbox
						disabled={option.disabled}
						checked={field.state.value.includes(option.value)}
						onCheckedChange={(checked) => {
							field.handleChange(
								checked === true
									? Array.from(new Set([...field.state.value, option.value]))
									: field.state.value.filter((value) => value !== option.value),
							);
							field.handleBlur();
						}}
					>
						{option.label}
					</Checkbox>
					{option.description && (
						<p className="text-footnote text-label-secondary pl-8">
							{option.description}
						</p>
					)}
				</div>
			))}
		</fieldset>
	);
}
