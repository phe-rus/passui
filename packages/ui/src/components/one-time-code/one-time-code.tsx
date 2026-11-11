import {
	type CSSProperties,
	type InputHTMLAttributes,
	type Ref,
	useEffect,
	useId,
	useRef,
} from "react";
import { CheckIcon } from "../../icons/icons";
import { cn } from "../../lib/class-names";

export type OneTimeCodeStatus = "idle" | "verifying" | "success" | "error";
export type OneTimeCodeFormat = "numeric" | "alphanumeric";
export type OneTimeCodeSize = "sm" | "md" | "lg";

const checkSizes: Record<OneTimeCodeSize, number> = {
	sm: 20,
	md: 24,
	lg: 28,
};
const statusText: Record<OneTimeCodeSize, string> = {
	sm: "mt-1.5 text-caption2",
	md: "mt-2 text-footnote",
	lg: "mt-2.5 text-subheadline",
};
export interface OneTimeCodeProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		"value" | "defaultValue" | "onChange" | "type" | "maxLength" | "size"
	> {
	label: string;
	value: string;
	onChange: (value: string) => void;
	/** Called when a complete code is entered, including paste and autofill. */
	onComplete?: (value: string) => void;
	/** Number of characters, 3–8. @default 6 */
	length?: number;
	/** Accepted characters. Alphanumeric codes use uppercase ASCII letters and digits. @default "numeric" */
	format?: OneTimeCodeFormat;
	/** Ref to the single native input, for focus and selection. */
	ref?: Ref<HTMLInputElement>;
	status?: OneTimeCodeStatus;
	/** Localized verification feedback announced without reading decorative cells. */
	statusLabel?: string;
	/** Cell height, digit text scale and check icon size. @default "md" */
	size?: OneTimeCodeSize;
}

/** Normalize common numeric keyboards and optional ASCII letters in one native field. */
export function normalizeCode(
	value: string,
	length: number,
	format: OneTimeCodeFormat = "numeric",
) {
	return Array.from(value, (digit) => {
		const point = digit.codePointAt(0) ?? 0;
		for (const base of [0x30, 0x660, 0x6f0, 0xff10]) {
			if (point >= base && point < base + 10) return String(point - base);
		}
		return format === "alphanumeric" && /^[a-z]$/i.test(digit)
			? digit.toUpperCase()
			: "";
	})
		.join("")
		.slice(0, length);
}

/** Six cells, one field: paste, autofill, selection and Backspace stay native. */
export function OneTimeCode({
	label,
	value,
	onChange,
	onComplete,
	length = 6,
	format = "numeric",
	ref,
	status = "idle",
	statusLabel,
	size = "md",
	className,
	disabled,
	id: suppliedId,
	...props
}: OneTimeCodeProps) {
	const generated = useId();
	const id = suppliedId ?? generated;
	const filter = `otp-goo-${generated.replace(/:/g, "")}`;
	const input = useRef<HTMLInputElement>(null);
	const count = Number.isFinite(length)
		? Math.max(3, Math.min(8, Math.round(length)))
		: 6;
	const code = normalizeCode(value, count, format);
	const locked =
		disabled ||
		props.readOnly ||
		status === "verifying" ||
		status === "success";
	useEffect(() => {
		if (status === "error") input.current?.select();
	}, [status]);
	const update = (next: string) => {
		if (locked) return;
		const normalized = normalizeCode(next, count, format);
		onChange(normalized);
		if (normalized.length === count && normalized !== code)
			onComplete?.(normalized);
	};
	return (
		<div
			className={cn("passui-one-time-code not-typeset", className)}
			data-status={status}
			data-size={size}
			style={
				{
					"--otp-length": count,
					"--otp-middle": (count - 1) / 2,
				} as CSSProperties
			}
		>
			<svg aria-hidden="true" width="0" height="0" className="absolute">
				<defs>
					<filter
						id={filter}
						x="-20%"
						y="-50%"
						width="140%"
						height="200%"
						colorInterpolationFilters="sRGB"
					>
						<feGaussianBlur stdDeviation="3" result="smear" />
						<feColorMatrix
							in="smear"
							type="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"
						/>
					</filter>
				</defs>
			</svg>
			<div className="passui-otp-row" dir="ltr">
				{/* A right code fuses: cells converge on one point while a capsule
                grows there. The filter joins the material, never the digits. */}
				<div
					aria-hidden="true"
					className="passui-otp-materials"
					style={{ filter: `url(#${filter})` }}
				>
					{Array.from({ length: count }, (_, index) => (
						<span
							key={index}
							className="passui-otp-cell"
							style={{ "--otp-index": index } as CSSProperties}
						/>
					))}
					<span className="passui-otp-capsule" />
				</div>
				<div aria-hidden="true" className="passui-otp-digits">
					{Array.from({ length: count }, (_, index) => (
						<span
							key={index}
							className="passui-otp-digit"
							data-active={
								index === Math.min(code.length, count - 1) || undefined
							}
							style={{ "--otp-index": index } as CSSProperties}
						>
							{code[index] && (
								<span
									key={`${index}-${code[index]}`}
									className="passui-otp-glyph"
								>
									{code[index]}
								</span>
							)}
						</span>
					))}
				</div>
				<CheckIcon
					aria-hidden="true"
					className="passui-otp-check"
					size={checkSizes[size]}
				/>
				<input
					{...props}
					ref={(node) => {
						input.current = node;
						if (typeof ref === "function") return ref(node);
						if (ref) ref.current = node;
					}}
					id={id}
					type="text"
					inputMode={format === "numeric" ? "numeric" : "text"}
					autoComplete={props.autoComplete ?? "one-time-code"}
					autoCapitalize={format === "alphanumeric" ? "characters" : "off"}
					spellCheck={false}
					pattern={format === "numeric" ? "[0-9]*" : "[A-Za-z0-9]*"}
					maxLength={count}
					minLength={count}
					aria-label={label}
					value={code}
					disabled={disabled}
					readOnly={locked}
					aria-busy={status === "verifying" || undefined}
					aria-invalid={status === "error" || props["aria-invalid"]}
					aria-describedby={
						[props["aria-describedby"], statusLabel && `${id}-status`]
							.filter(Boolean)
							.join(" ") || undefined
					}
					onChange={(event) => update(event.target.value)}
					onPaste={(event) => {
						props.onPaste?.(event);
						if (event.defaultPrevented || locked) return;
						const pasted = event.clipboardData.getData("text");
						const normalized = normalizeCode(pasted, count, format);
						if (normalized && normalized !== pasted) {
							event.preventDefault();
							update(normalized);
						}
					}}
					className="passui-otp-input"
				/>
			</div>
			{statusLabel && (
				<p
					id={`${id}-status`}
					role="status"
					className={cn(
						statusText[size],
						status === "error" ? "text-danger" : "text-label-secondary",
					)}
				>
					{statusLabel}
				</p>
			)}
		</div>
	);
}
