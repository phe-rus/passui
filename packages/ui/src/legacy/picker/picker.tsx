import { CheckIcon, SearchIcon, SelectorIcon } from "@passui/icons";
import {
	type KeyboardEvent,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import { useAnchoredDisclosure } from "../../hooks/use-anchored-disclosure";
import { cn } from "../../lib/class-names";
import { haptic } from "../../lib/haptics";
import { AnchoredSurface } from "../popover/anchored-surface";
import { type PickerSize, pickerTriggerStyle } from "./picker-trigger";

export interface PickerOption<T extends string> {
	value: T;
	label: string;
	/** A quieter second line or trailing note, such as "Free" or a region. */
	disabled?: boolean;
	keywords?: string[];
	detail?: string;
	/** The option's own language, so it is spoken and shaped right. */
	lang?: string;
}

/** Values and callbacks share the option value type, including literal unions. */
export interface PickerProps<T extends string> {
	/** The selected option's value. */
	value: T;
	/** Available choices. Use a literal union for a fixed set of values. */
	options: ReadonlyArray<PickerOption<T>>;
	/** Called with the selected option value. */
	onChange: (value: NoInfer<T>) => void;
	/** Accessible name for the trigger. */
	label: string;
	/** Shown when the selected value has no matching option. */
	placeholder?: string;
	/** Defaults to on for lists of ten or more options. */
	searchable?: boolean;
	/** Label for the filter field. @default "Search" */
	searchPlaceholder?: string;
	/** Shown when the filter matches nothing. @default "No matches" */
	emptyLabel?: string;
	/** Offers a new value when no option has the same label or value. */
	onCreate?: (query: string) => void;
	/** Localized creation action; receives the trimmed query. */
	createLabel?: (query: string) => string;
	className?: string;
	/** Prevents opening or choosing an option. @default false */
	disabled?: boolean;
	/** Trigger height and text scale. @default "md" */
	size?: PickerSize;
}

/** Long lists get a filter field, as in the system pickers. */
const SEARCH_FROM = 10;

/**
 * A pop-up button: shows the chosen value and opens a list that floats
 * above everything, flips upward near the bottom edge and filters long
 * lists. Replaces the browser's own select, which looks foreign on every
 * platform.
 */
export function Picker<T extends string>({
	value,
	options,
	onChange,
	label,
	placeholder,
	searchable,
	searchPlaceholder = "Search",
	emptyLabel = "No matches",
	className,
	onCreate,
	createLabel,
	disabled = false,
	size = "md",
}: PickerProps<T>) {
	const panel = useAnchoredDisclosure(disabled);
	const { open } = panel;
	const trigger = useRef<HTMLButtonElement>(null);
	const listId = useId();
	const selected = options.find((option) => option.value === value);

	const close = useCallback(
		(refocus: boolean) => {
			panel.close();
			if (refocus) trigger.current?.focus({ preventScroll: true });
		},
		[panel.close],
	);

	const onTriggerKey = (event: KeyboardEvent<HTMLButtonElement>) => {
		if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			event.preventDefault();
			panel.show();
		}
	};

	return (
		<>
			<button
				ref={trigger}
				type="button"
				role="combobox"
				aria-label={label}
				aria-haspopup="listbox"
				aria-expanded={open && !disabled}
				aria-controls={open && !disabled ? listId : undefined}
				disabled={disabled}
				onClick={() => panel.toggle()}
				onKeyDown={onTriggerKey}
				className={pickerTriggerStyle(className, size)}
			>
				<span
					lang={selected?.lang}
					className={cn(
						"min-w-0 grow truncate",
						!selected && "text-label-tertiary",
					)}
				>
					{selected?.label ?? placeholder ?? ""}
				</span>
				<SelectorIcon
					size={15}
					strokeWidth={2}
					className="text-label-tertiary shrink-0"
				/>
			</button>
			{typeof document !== "undefined" &&
				createPortal(
					panel.mounted && trigger.current ? (
						<SelectList
							open={open}
							onExited={panel.onExited}
							id={listId}
							anchor={trigger.current}
							options={options}
							value={value}
							label={label}
							searchable={
								searchable ??
								(Boolean(onCreate) || options.length >= SEARCH_FROM)
							}
							searchPlaceholder={searchPlaceholder}
							emptyLabel={emptyLabel}
							onCreate={onCreate}
							createLabel={createLabel}
							onPick={(next) => {
								close(true);
								if (next === value) return;
								haptic("selection");
								onChange(next);
							}}
							onClose={close}
						/>
					) : null,
					document.body,
				)}
		</>
	);
}

function SelectList<T extends string>({
	open,
	onExited,
	id,
	anchor,
	options,
	value,
	label,
	searchable,
	searchPlaceholder,
	emptyLabel,
	onPick,
	onClose,
	onCreate,
	createLabel,
}: {
	open: boolean;
	onExited: () => void;
	id: string;
	anchor: HTMLElement;
	options: ReadonlyArray<PickerOption<T>>;
	value: T;
	label: string;
	searchable: boolean;
	searchPlaceholder: string;
	emptyLabel: string;
	onCreate?: (query: string) => void;
	createLabel?: (query: string) => string;
	onPick: (value: T) => void;
	onClose: (refocus: boolean) => void;
}) {
	const list = useRef<HTMLDivElement>(null);
	const search = useRef<HTMLInputElement>(null);
	const [query, setQuery] = useState("");
	const typed = useRef({ text: "", at: 0 });

	const shown = useMemo(() => {
		const needle = query.trim().toLocaleLowerCase();
		if (!needle) return options;
		return options.filter((option) =>
			`${option.label} ${option.detail ?? ""} ${option.value} ${(option.keywords ?? []).join(" ")}`
				.toLocaleLowerCase()
				.includes(needle),
		);
	}, [options, query]);

	const enabled = shown.filter((option) => !option.disabled);
	const trimmed = query.trim();
	const canCreate = Boolean(
		onCreate &&
			trimmed &&
			!options.some(
				(option) =>
					option.label.toLocaleLowerCase() === trimmed.toLocaleLowerCase() ||
					option.value.toLocaleLowerCase() === trimmed.toLocaleLowerCase(),
			),
	);
	const create = () => {
		if (!canCreate) return;
		onClose(true);
		onCreate?.(trimmed);
	};
	const [active, setActive] = useState(() =>
		Math.max(
			0,
			options
				.filter((option) => !option.disabled)
				.findIndex((option) => option.value === value),
		),
	);
	const last = enabled.length + (canCreate ? 1 : 0) - 1;
	const activeOption = enabled[Math.min(active, last)];
	const activeId = activeOption
		? `${id}-${activeOption.value}`
		: canCreate
			? `${id}-create`
			: undefined;

	useEffect(() => {
		if (searchable) search.current?.focus();
		else list.current?.focus();
	}, [searchable]);

	// The chosen option starts in view, then follows the keyboard.
	useEffect(() => {
		if (!activeOption) return;
		list.current
			?.querySelector(`[data-value="${CSS.escape(activeOption.value)}"]`)
			?.scrollIntoView({ block: "nearest" });
	}, [activeOption]);

	const onKeyDown = (event: KeyboardEvent) => {
		const step = (to: number) => {
			event.preventDefault();
			setActive(Math.max(0, Math.min(last, to)));
		};
		const current = Math.min(active, last);
		if (event.key === "ArrowDown") step(current + 1);
		else if (event.key === "ArrowUp") step(current - 1);
		else if (event.key === "Home" && !searchable) step(0);
		else if (event.key === "End" && !searchable) step(last);
		else if (event.key === "PageDown") step(current + 8);
		else if (event.key === "PageUp") step(current - 8);
		else if (event.key === "Enter" || (event.key === " " && !searchable)) {
			event.preventDefault();
			if (activeOption) onPick(activeOption.value);
			else if (canCreate) create();
		} else if (event.key === "Escape") {
			event.preventDefault();
			event.stopPropagation();
			onClose(true);
		} else if (event.key === "Tab") {
			onClose(false);
		} else if (
			!searchable &&
			event.key.length === 1 &&
			!event.metaKey &&
			!event.ctrlKey
		) {
			// Type to jump, as in a native pop-up button.
			const now = Date.now();
			const text =
				(now - typed.current.at < 700 ? typed.current.text : "") + event.key;
			typed.current = { text, at: now };
			const match = enabled.findIndex((option) =>
				option.label.toLocaleLowerCase().startsWith(text.toLocaleLowerCase()),
			);
			if (match >= 0) setActive(match);
		}
	};

	return (
		<AnchoredSurface
			open={open}
			onExited={onExited}
			anchor={anchor}
			width={Math.min(Math.max(anchor.getBoundingClientRect().width, 220), 360)}
			needed={240}
			onClose={onClose}
			onKeyDown={onKeyDown}
			contentClassName="overflow-hidden"
		>
			{searchable && (
				<div className="border-separator/70 flex shrink-0 items-center gap-2 border-b px-3 py-2">
					<SearchIcon size={15} className="text-label-tertiary shrink-0" />
					<input
						ref={search}
						value={query}
						placeholder={searchPlaceholder}
						aria-label={searchPlaceholder}
						aria-controls={id}
						aria-activedescendant={activeId}
						onChange={(event) => {
							setQuery(event.target.value);
							setActive(0);
						}}
						className="text-subheadline text-label placeholder:text-label-tertiary min-w-0 grow bg-transparent outline-none"
					/>
				</div>
			)}
			<div
				ref={list}
				id={id}
				role="listbox"
				aria-label={label}
				tabIndex={-1}
				aria-activedescendant={activeId}
				className="no-scrollbar flex min-h-0 flex-col overflow-y-auto overscroll-contain p-1.5 outline-none"
			>
				{shown.map((option) => {
					const chosen = option.value === value;
					const focused = option === activeOption;
					return (
						// biome-ignore lint/a11y/useKeyWithClickEvents: option div handles keyboard via role=option and aria-selected
						<div
							key={option.value}
							id={`${id}-${option.value}`}
							data-value={option.value}
							role="option"
							tabIndex={-1}
							aria-selected={chosen}
							aria-disabled={option.disabled || undefined}
							lang={option.lang}
							onPointerMove={() =>
								!option.disabled && setActive(enabled.indexOf(option))
							}
							onClick={() => !option.disabled && onPick(option.value)}
							className={cn(
								"text-subheadline flex min-h-8 cursor-default items-center gap-2 rounded-lg px-2 py-1.5 [@media(pointer:coarse)]:min-h-11",
								focused ? "bg-fill" : "",
								option.disabled && "opacity-40",
								chosen ? "text-label font-semibold" : "text-label",
							)}
						>
							<span className="flex w-4 shrink-0 justify-center">
								{chosen && (
									<CheckIcon
										size={15}
										strokeWidth={2.4}
										className="text-accent-text"
									/>
								)}
							</span>
							<span className="min-w-0 grow break-words">{option.label}</span>
							{option.detail && (
								<span className="text-caption text-label-tertiary shrink-0 font-normal">
									{option.detail}
								</span>
							)}
						</div>
					);
				})}
				{canCreate && (
					// biome-ignore lint/a11y/useKeyWithClickEvents: create div handles keyboard via role=option
					<div
						id={`${id}-create`}
						role="option"
						aria-selected={false}
						tabIndex={-1}
						onPointerMove={() => setActive(enabled.length)}
						onClick={create}
						className={cn(
							"text-subheadline text-accent-text flex min-h-9 cursor-default items-center rounded-lg px-2 py-1.5",
							!activeOption && "bg-fill",
						)}
					>
						{createLabel?.(trimmed) ?? trimmed}
					</div>
				)}
				{shown.length === 0 && !canCreate && (
					<p className="text-footnote text-label-tertiary px-3 py-2">
						{emptyLabel}
					</p>
				)}
			</div>
		</AnchoredSurface>
	);
}
