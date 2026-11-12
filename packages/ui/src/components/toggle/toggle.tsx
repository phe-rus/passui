import {
	animate,
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
	useTransform,
} from "motion/react";
import { useEffect, useId, useRef } from "react";
import { CheckIcon } from "../../icons/icons";
import { cn } from "../../lib/class-names";
import { haptic } from "../../lib/haptics";
import { spring } from "../../motion/transitions";

export type ToggleStyle = "switch" | "checkbox";
export type ToggleSize = "sm" | "md" | "lg";

const labelText: Record<ToggleSize, string> = {
	sm: "text-footnote",
	md: "text-subheadline",
	lg: "text-body",
};
const labelGap: Record<ToggleSize, string> = {
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-3.5",
};
const checkboxBox: Record<ToggleSize, string> = {
	sm: "size-4 rounded-sm",
	md: "size-5 rounded-sm",
	lg: "size-6 rounded-md",
};
const checkIconSize: Record<ToggleSize, number> = {
	sm: 12,
	md: 14,
	lg: 16,
};
const mixedBar: Record<ToggleSize, string> = {
	sm: "h-0.5 w-2",
	md: "h-0.5 w-2.5",
	lg: "h-0.5 w-3",
};

// Switch physics: travel = track_width - thumb_width - 2*inset.
// md: 50 - 26 - 2 = 22 ✓  sm: 44 - 22 - 2 = 20 ✓  lg: 56 - 30 - 2 = 24 ✓
type SwitchGeo = {
	travel: number;
	inset: number;
	dropOffset: number;
	track: string;
	thumb: string;
	drop: string;
	dropTop: string;
};
const switchGeo: Record<ToggleSize, SwitchGeo> = {
	sm: {
		travel: 20,
		inset: 2,
		dropOffset: 4,
		track: "h-[26px] w-[44px]",
		thumb: "size-[22px]",
		drop: "size-3.5",
		dropTop: "top-[6px]",
	},
	md: {
		travel: 22,
		inset: 2,
		dropOffset: 5,
		track: "h-[30px] w-[50px]",
		thumb: "size-[26px]",
		drop: "size-4",
		dropTop: "top-[7px]",
	},
	lg: {
		travel: 24,
		inset: 2,
		dropOffset: 6,
		track: "h-[34px] w-[56px]",
		thumb: "size-[30px]",
		drop: "size-5",
		dropTop: "top-[8px]",
	},
};

export interface ToggleProps {
	/** Current on or off state. */
	checked: boolean;
	/** Called with the next checked state. */
	onChange: (checked: boolean) => void;
	/** Accessible name, including when the visible label is hidden. */
	label: string;
	disabled?: boolean;
	/** `switch` for a setting, `checkbox` for a selection. @default "switch" */
	style?: ToggleStyle;
	/** Reports a mixed selection to assistive technology. @default false */
	mixed?: boolean;
	/** Keeps the accessible name while hiding the visible label. @default false */
	labelHidden?: boolean;
	/** Switch track size, thumb travel, checkbox box and label text scale. @default "md" */
	size?: ToggleSize;
	/** Custom classes for the toggle container. */
	className?: string;
}

export function Toggle({
	checked,
	onChange,
	label,
	disabled,
	style = "switch",
	mixed = false,
	labelHidden = false,
	size = "md",
	className,
}: ToggleProps) {
	const input = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (input.current) input.current.indeterminate = mixed;
	}, [mixed]);
	if (style === "checkbox") {
		return (
			<label
				className={cn(
					"flex cursor-pointer items-center",
					labelGap[size],
					labelText[size],
					disabled && "cursor-not-allowed opacity-40",
					className,
				)}
			>
				<span
					className={cn("relative inline-flex shrink-0", checkboxBox[size])}
				>
					<input
						ref={input}
						type="checkbox"
						aria-checked={mixed ? "mixed" : checked}
						checked={checked}
						disabled={disabled}
						onChange={(event) => onChange(event.target.checked)}
						className={cn(
							"peer cursor-inherit border-separator/80 bg-elevated checked:bg-accent indeterminate:bg-accent appearance-none border transition-colors checked:border-transparent indeterminate:border-transparent motion-reduce:transition-none",
							checkboxBox[size],
							"focus-visible:outline-accent-text focus-visible:outline-2 focus-visible:outline-offset-2",
						)}
					/>
					{mixed ? (
						<span
							aria-hidden="true"
							className={cn(
								"bg-on-accent pointer-events-none absolute inset-0 m-auto rounded-full",
								mixedBar[size],
							)}
						/>
					) : (
						<CheckIcon
							aria-hidden="true"
							size={checkIconSize[size]}
							strokeWidth={2.5}
							className="text-on-accent pointer-events-none absolute inset-0 m-auto opacity-0 peer-checked:opacity-100"
						/>
					)}
				</span>
				<span className={labelHidden ? "sr-only" : undefined}>{label}</span>
			</label>
		);
	}
	return (
		<SwitchToggle
			checked={checked}
			onChange={onChange}
			label={label}
			disabled={disabled}
			size={size}
			className={className}
		/>
	);
}

function SwitchToggle({
	checked,
	onChange,
	label,
	disabled,
	size = "md",
	className,
}: Pick<
	ToggleProps,
	"checked" | "onChange" | "label" | "disabled" | "size" | "className"
>) {
	const reducedMotion = useReducedMotion();
	const id = `toggle-goo-${useId().replace(/:/g, "")}`;
	const geo = switchGeo[size];
	const on = geo.travel;
	const off = geo.inset;
	const x = useMotionValue(checked ? on : off);
	const chase = useSpring(x, spring.snappy);
	const dropX = useTransform(chase, (value) => value + geo.dropOffset);
	const gesture = useRef({
		start: 0,
		x: 0,
		moved: false,
		skipClick: false,
		held: false,
	});
	useEffect(() => {
		if (reducedMotion) {
			x.set(checked ? on : off);
			return;
		}
		const animation = animate(x, checked ? on : off, spring.snappy);
		return () => animation.stop();
	}, [checked, reducedMotion, x, on, off]);
	const choose = (next: boolean) => {
		if (disabled) return;
		haptic("selection");
		if (next !== checked) onChange(next);
		if (reducedMotion) x.set(next ? on : off);
		else animate(x, next ? on : off, spring.snappy);
	};
	return (
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			aria-label={label}
			disabled={disabled}
			onClick={() => {
				if (gesture.current.skipClick) {
					gesture.current.skipClick = false;
					return;
				}
				choose(!checked);
			}}
			onPointerDown={(event) => {
				if (event.button !== 0 || disabled) return;
				event.currentTarget.setPointerCapture(event.pointerId);
				gesture.current = {
					start: event.clientX,
					x: x.get(),
					moved: false,
					skipClick: false,
					held: true,
				};
			}}
			onPointerMove={(event) => {
				const drag = gesture.current;
				if (!drag.held || disabled) return;
				const direction =
					getComputedStyle(event.currentTarget).direction === "rtl" ? -1 : 1;
				const delta = (event.clientX - drag.start) * direction;
				if (Math.abs(delta) > 3) drag.moved = true;
				if (drag.moved) x.set(Math.max(off, Math.min(on, drag.x + delta)));
			}}
			onPointerUp={() => {
				const drag = gesture.current;
				if (!drag.held) return;
				drag.held = false;
				if (!drag.moved) return;
				drag.skipClick = true;
				choose(x.get() >= (on + off) / 2);
			}}
			onPointerCancel={() => {
				gesture.current.held = false;
				gesture.current.skipClick = false;
				choose(checked);
			}}
			className={cn(
				"duration-normal relative shrink-0 touch-pan-y rounded-full transition-colors motion-reduce:transition-none",
				geo.track,
				"focus-visible:ring-accent/70 focus-visible:ring-offset-background shadow-[inset_0_1px_2px_rgb(0_0_0/0.10)] focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none disabled:opacity-45",
				checked ? "bg-accent" : "bg-separator/80",
				className,
			)}
		>
			<svg aria-hidden="true" width="0" height="0" className="absolute">
				<defs>
					<filter
						id={id}
						x="-50%"
						y="-100%"
						width="200%"
						height="300%"
						colorInterpolationFilters="sRGB"
					>
						<feGaussianBlur stdDeviation="2.5" result="smear" />
						<feColorMatrix
							in="smear"
							type="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
						/>
					</filter>
				</defs>
			</svg>
			<span
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 rtl:-scale-x-100"
				style={{ filter: reducedMotion ? undefined : `url(#${id})` }}
			>
				{!reducedMotion && (
					<motion.span
						className={cn(
							"absolute left-0 rounded-full bg-white",
							geo.dropTop,
							geo.drop,
						)}
						style={{ x: dropX }}
					/>
				)}
				<motion.span
					className={cn(
						"absolute top-0.5 left-0 rounded-full bg-white",
						geo.thumb,
					)}
					style={{ x }}
				/>
			</span>
		</button>
	);
}
