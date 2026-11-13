import { HiddenIcon } from "@passui/icons/hidden";
import { VisibleIcon } from "@passui/icons/visible";
import { Checkbox } from "@passui/react/checkbox";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@passui/react/field";
import { Input, type InputSize, type InputVariant } from "@passui/react/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@passui/react/input-group";
import { InputOTP } from "@passui/react/input-otp";
import { Switch } from "@passui/react/switch";
import { Textarea } from "@passui/react/textarea";
import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useId,
	useState,
} from "react";
import { useFieldContext } from "../forms/contexts";

export const PeachFieldLabels = createContext<
	{ show: string; hide: string } | undefined
>(undefined);

function useFieldErrors() {
	const field = useFieldContext<unknown>();
	return field.state.meta.isTouched
		? Array.from(
				new Set(
					field.state.meta.errors.flatMap((error) =>
						error &&
						typeof error === "object" &&
						"message" in error &&
						error.message
							? [String(error.message)]
							: [],
					),
				),
			)
		: [];
}

export type FieldInputProps = Omit<
	ComponentProps<"input">,
	"value" | "onChange" | "onBlur" | "name" | "size"
> & {
	/** Height and text, from Passui's control scale. @default "md" */
	size?: InputSize;
	/** `floating` outlines the field and lifts the label into its top edge. @default "default" */
	variant?: InputVariant;
	label: string;
	description?: string;
	/** Leading icon or text inside the field. */
	icon?: ReactNode;
};

/** A labelled input wired to the TanStack form field. Password fields get a show/hide button. */
export function FieldInput({
	label,
	description,
	icon,
	type,
	id,
	size,
	variant,
	...props
}: FieldInputProps) {
	const field = useFieldContext<string>();
	const reveal = useContext(PeachFieldLabels);
	const [shown, setShown] = useState(false);
	const generated = useId();
	const inputId = id ?? generated;
	const errors = useFieldErrors();
	const invalid = errors.length > 0;
	const describedBy =
		[description && `${inputId}-hint`, invalid && `${inputId}-error`]
			.filter(Boolean)
			.join(" ") || undefined;
	const common = {
		id: inputId,
		name: field.name,
		value: field.state.value,
		onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
			field.handleChange(event.target.value),
		onBlur: field.handleBlur,
		"aria-invalid": invalid || undefined,
		"aria-describedby": describedBy,
		...props,
	};
	const isPassword = type === "password";
	// A floating label lives inside the field, so the plain one steps aside. Grouped fields keep it.
	const floating = variant === "floating" && !icon && !isPassword;
	return (
		<Field invalid={invalid}>
			{floating ? null : <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
			{icon || isPassword ? (
				<InputGroup>
					{icon ? <InputGroupAddon>{icon}</InputGroupAddon> : null}
					<InputGroupInput
						{...common}
						type={isPassword && shown ? "text" : type}
					/>
					{isPassword && reveal ? (
						<InputGroupAddon align="end">
							<button
								type="button"
								aria-pressed={shown}
								aria-label={shown ? reveal.hide : reveal.show}
								onClick={() => setShown(!shown)}
								className="focus-visible:ring-accent/70 rounded-full p-1 outline-none focus-visible:ring-2"
							>
								{shown ? <HiddenIcon size={18} /> : <VisibleIcon size={18} />}
							</button>
						</InputGroupAddon>
					) : null}
				</InputGroup>
			) : (
				<Input
					{...common}
					size={size}
					variant={variant}
					label={label}
					type={type}
				/>
			)}
			{description ? (
				<FieldDescription id={`${inputId}-hint`}>
					{description}
				</FieldDescription>
			) : null}
			{invalid ? (
				<FieldError id={`${inputId}-error`}>{errors.join(". ")}</FieldError>
			) : null}
		</Field>
	);
}

export function FieldCheckbox({ label }: { label: string }) {
	const field = useFieldContext<boolean>();
	return (
		<Checkbox
			name={field.name}
			checked={field.state.value}
			onCheckedChange={(checked) => {
				field.handleChange(checked === true);
				field.handleBlur();
			}}
		>
			{label}
		</Checkbox>
	);
}

export function FieldSwitch({
	label,
	description,
	disabled,
}: {
	label: string;
	description?: string;
	disabled?: boolean;
}) {
	const field = useFieldContext<boolean>();
	return (
		<div className="flex items-center justify-between gap-4">
			<div className="text-subheadline">
				{label}
				{description && (
					<p className="text-footnote text-label-secondary">{description}</p>
				)}
			</div>
			<Switch
				aria-label={label}
				name={field.name}
				checked={field.state.value}
				disabled={disabled}
				onCheckedChange={(checked) => {
					field.handleChange(checked);
					field.handleBlur();
				}}
			/>
		</div>
	);
}

export function FieldTextarea({
	label,
	icon,
	...props
}: ComponentProps<"textarea"> & {
	label: string;
	icon?: ReactNode;
}) {
	const field = useFieldContext<string>();
	const errors = useFieldErrors();
	return (
		<Field invalid={errors.length > 0}>
			<FieldLabel htmlFor={field.name}>
				{icon}
				{label}
			</FieldLabel>
			<Textarea
				{...props}
				id={field.name}
				name={field.name}
				aria-invalid={errors.length > 0 || undefined}
				aria-describedby={errors.length ? `${field.name}-errors` : undefined}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(event) => field.handleChange(event.target.value)}
			/>
			{errors.length > 0 && (
				<FieldError id={`${field.name}-errors`}>{errors.join(". ")}</FieldError>
			)}
		</Field>
	);
}

export function FieldOtp({
	label,
	maxLength = 6,
	onComplete,
}: {
	label: string;
	maxLength?: number;
	onComplete?: (value: string) => void;
}) {
	const field = useFieldContext<string>();
	const errors = useFieldErrors();
	return (
		<Field invalid={errors.length > 0}>
			<FieldLabel>{label}</FieldLabel>
			<InputOTP
				aria-label={label}
				name={field.name}
				length={maxLength}
				value={field.state.value}
				invalid={errors.length > 0}
				onValueChange={(code) => field.handleChange(code)}
				onComplete={(code) => onComplete?.(code)}
			/>
			{errors.length > 0 && <FieldError>{errors.join(". ")}</FieldError>}
		</Field>
	);
}
