"use client";

import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useId,
	useMemo,
	useState,
} from "react";
import { cx } from "../lib/cx";

interface CommandState {
	query: string;
	setQuery: (q: string) => void;
	active: string | null;
	setActive: (v: string | null) => void;
	listId: string;
	register: (value: string, keywords: string) => void;
	visible: string[];
}

const Context = createContext<CommandState | null>(null);

function useCommand() {
	const ctx = useContext(Context);
	if (!ctx) throw new Error("Command parts must be used inside <Command>.");
	return ctx;
}

/**
 * A filterable list of actions. Arrow keys move, Enter runs, and typing filters.
 * Compose it inside a Dialog for a command palette.
 */
export function Command({
	className,
	children,
	...props
}: ComponentProps<"div">) {
	const listId = useId();
	const [query, setQuery] = useState("");
	const [active, setActive] = useState<string | null>(null);
	const [registry] = useState(() => new Map<string, string>());
	const state = useMemo<CommandState>(() => {
		const q = query.trim().toLowerCase();
		const visible = [...registry]
			.filter(([value, kw]) => !q || `${value} ${kw}`.toLowerCase().includes(q))
			.map(([value]) => value);
		return {
			query,
			setQuery,
			active,
			setActive,
			listId,
			register: (value, keywords) => void registry.set(value, keywords),
			visible,
		};
	}, [query, active, listId, registry]);
	return (
		<Context.Provider value={state}>
			<div
				data-slot="command"
				className={cx(
					"flex w-full flex-col overflow-hidden rounded-3xl bg-elevated text-label",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</Context.Provider>
	);
}

export function CommandInput({
	className,
	...props
}: Omit<ComponentProps<"input">, "value" | "onChange">) {
	const c = useCommand();
	return (
		<input
			role="combobox"
			aria-expanded
			aria-controls={c.listId}
			aria-activedescendant={c.active ? `${c.listId}-${c.active}` : undefined}
			data-slot="command-input"
			value={c.query}
			onChange={(e) => {
				c.setQuery(e.target.value);
				c.setActive(null);
			}}
			onKeyDown={(e) => {
				const list = c.visible;
				if (e.key === "ArrowDown" || e.key === "ArrowUp") {
					e.preventDefault();
					const i = c.active ? list.indexOf(c.active) : -1;
					const n = e.key === "ArrowDown" ? i + 1 : i - 1;
					c.setActive(list[(n + list.length) % list.length] ?? null);
				} else if (e.key === "Enter") {
					const el = document.getElementById(
						`${c.listId}-${c.active ?? list[0]}`,
					);
					el?.click();
				}
			}}
			className={cx(
				"h-12 w-full border-b border-separator bg-transparent px-4 text-body outline-none placeholder:text-label-tertiary",
				className,
			)}
			{...props}
		/>
	);
}

export function CommandList({ className, ...props }: ComponentProps<"div">) {
	const c = useCommand();
	return (
		<div
			role="listbox"
			id={c.listId}
			data-slot="command-list"
			className={cx("max-h-80 overflow-y-auto p-1.5", className)}
			{...props}
		/>
	);
}

export function CommandEmpty({ className, ...props }: ComponentProps<"div">) {
	const c = useCommand();
	if (c.visible.length > 0) return null;
	return (
		<div
			data-slot="command-empty"
			className={cx(
				"px-3 py-6 text-center text-subheadline text-label-secondary",
				className,
			)}
			{...props}
		/>
	);
}

export function CommandGroup({
	heading,
	className,
	children,
	...props
}: Omit<ComponentProps<"div">, "children"> & {
	heading?: ReactNode;
	children?: ReactNode;
}) {
	return (
		<div
			role="group"
			data-slot="command-group"
			className={cx("py-1", className)}
			{...props}
		>
			{heading ? (
				<div className="text-caption text-label-secondary px-3 py-1 font-semibold">
					{heading}
				</div>
			) : null}
			{children}
		</div>
	);
}

export type CommandItemProps = Omit<ComponentProps<"div">, "onSelect"> & {
	value: string;
	/** Extra words that match the query. */
	keywords?: string;
	onSelect?: (value: string) => void;
	disabled?: boolean;
};

export function CommandItem({
	value,
	keywords = "",
	onSelect,
	disabled,
	className,
	...props
}: CommandItemProps) {
	const c = useCommand();
	c.register(value, keywords);
	if (!c.visible.includes(value)) return null;
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents lint/a11y/useFocusableInteractive: options are driven by the combobox input's keys
		<div
			role="option"
			id={`${c.listId}-${value}`}
			aria-selected={c.active === value}
			aria-disabled={disabled}
			data-slot="command-item"
			data-active={c.active === value ? "" : undefined}
			onPointerMove={() => c.setActive(value)}
			onClick={() => !disabled && onSelect?.(value)}
			className={cx(
				"flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-subheadline aria-disabled:opacity-40 data-active:bg-fill",
				className,
			)}
			{...props}
		/>
	);
}

export function CommandShortcut({
	className,
	...props
}: ComponentProps<"span">) {
	return (
		<span
			data-slot="command-shortcut"
			className={cx("ml-auto text-caption text-label-tertiary", className)}
			{...props}
		/>
	);
}
