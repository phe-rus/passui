import type { ComponentProps, ReactNode } from "react";
import { cx } from "../lib/cx";

/**
 * Modifier names that read differently per platform: Apple shows its symbol,
 * everyone else the word. Both are rendered and CSS picks one from `data-os`
 * (set before first paint), so server and client markup always agree.
 */
const keys: Record<string, { apple: string; other: string }> = {
	mod: { apple: "⌘", other: "Ctrl" },
	cmd: { apple: "⌘", other: "Win" },
	ctrl: { apple: "⌃", other: "Ctrl" },
	alt: { apple: "⌥", other: "Alt" },
	option: { apple: "⌥", other: "Alt" },
	shift: { apple: "⇧", other: "Shift" },
	enter: { apple: "↩", other: "Enter" },
	backspace: { apple: "⌫", other: "Backspace" },
	delete: { apple: "⌦", other: "Del" },
	esc: { apple: "⎋", other: "Esc" },
	tab: { apple: "⇥", other: "Tab" },
};

const showApple =
	"hidden [:root[data-os=macos]_&]:inline [:root[data-os=ios]_&]:inline";
const showOther =
	"[:root[data-os=macos]_&]:hidden [:root[data-os=ios]_&]:hidden";

function renderKey(child: ReactNode) {
	if (typeof child !== "string") return child;
	const key = keys[child.toLowerCase()];
	if (!key) return child;
	return (
		<>
			<span aria-hidden="true" className={showApple}>
				{key.apple}
			</span>
			<span className={showOther}>{key.other}</span>
		</>
	);
}

/** A keyboard key cap. Pass `Mod`, `Alt`, `Shift` and friends and the platform's own symbol shows. */
export function Kbd({ className, children, ...props }: ComponentProps<"kbd">) {
	return (
		<kbd
			data-slot="kbd"
			className={cx(
				"pointer-events-none inline-flex h-5 min-w-5 select-none items-center justify-center gap-1 rounded-md bg-fill px-1.5 font-sans text-caption2 font-medium text-label-secondary shadow-[inset_0_-1px_0_var(--color-separator)]",
				className,
			)}
			{...props}
		>
			{Array.isArray(children) ? children.map(renderKey) : renderKey(children)}
		</kbd>
	);
}

export function KbdGroup({ className, ...props }: ComponentProps<"span">) {
	return (
		<span
			data-slot="kbd-group"
			className={cx("inline-flex items-center gap-1", className)}
			{...props}
		/>
	);
}
