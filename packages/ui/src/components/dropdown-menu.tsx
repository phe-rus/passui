"use client";

import * as menu from "@zag-js/menu";
import { normalizeProps, useMachine } from "@zag-js/react";
import {
	type ComponentProps,
	createContext,
	type MouseEvent,
	type MutableRefObject,
	type PointerEvent,
	type ReactNode,
	useContext,
	useEffect,
	useId,
	useRef,
} from "react";
import { cx } from "../lib/cx";
import { Portal } from "../lib/portal";
import { usePresence } from "../lib/presence";
import { mergeProps, type RenderProp, renderPart } from "../lib/render";
import {
	positionerSide,
	useAnchorFollow,
	useTriggerAnchor,
	useWaterDrop,
} from "../lib/water-drop";

type Placement = NonNullable<menu.Props["positioning"]>["placement"];

interface Ctx {
	api: menu.Api;
	service: menu.Service;
	/** Where the pointer last pressed the context region, so the glass can grow from it. */
	point: MutableRefObject<{ x: number; y: number } | null>;
}

const Context = createContext<Ctx | null>(null);
/** The menu a submenu opens from, so its trigger can be wired as an item. */
const ParentContext = createContext<Ctx | null>(null);

function useMenu() {
	const ctx = useContext(Context);
	if (!ctx)
		throw new Error("DropdownMenu parts must be used inside <DropdownMenu>.");
	return ctx;
}

interface RadioCtx {
	value: string | undefined;
	onValueChange: (value: string) => void;
}
const RadioContext = createContext<RadioCtx | null>(null);

export interface DropdownMenuProps
	extends Omit<menu.Props, "id" | "ids" | "positioning"> {
	/** Where the menu sits against its trigger. Defaults to `bottom-start`. */
	placement?: Placement;
	children?: ReactNode;
}

function useMenuMachine(
	props: Omit<menu.Props, "id">,
	placement: Placement,
	/** A top level menu opens on its trigger; a submenu opens beside the item it came from. */
	onTrigger = false,
): Ctx {
	const id = useId();
	const point = useRef<{ x: number; y: number } | null>(null);
	const anchor = useTriggerAnchor(placement ?? "", 6);
	const service = useMachine(menu.machine, {
		id,
		positioning: {
			placement,
			offset: { mainAxis: 6 },
			...(onTrigger && { getAnchorRect: anchor.getAnchorRect }),
		},
		...props,
	});
	const api = menu.connect(service, normalizeProps);
	useAnchorFollow(
		anchor,
		onTrigger && api.open,
		positionerSide(api.getPositionerProps()),
		api.reposition,
	);
	return { service, api, point };
}

/** Owns the open state, highlight and typeahead. Renders no element of its own. */
export function DropdownMenu({
	children,
	placement = "bottom-start",
	...props
}: DropdownMenuProps) {
	const ctx = useMenuMachine(props, placement, true);
	return <Context.Provider value={ctx}>{children}</Context.Provider>;
}

/** A menu that opens at the pointer on right click or long press, instead of on a trigger. */
export function ContextMenu({
	children,
	placement = "bottom-start",
	...props
}: DropdownMenuProps) {
	const ctx = useMenuMachine(props, placement);
	return <Context.Provider value={ctx}>{children}</Context.Provider>;
}

/** The region that answers to a right click or long press. Renders a `div` by default. */
export function ContextMenuTrigger({ render, ...props }: PartProps<"div">) {
	const { api, point } = useMenu();
	const base = api.getContextTriggerProps();
	const remember = (event: { clientX: number; clientY: number }) => {
		point.current = { x: event.clientX, y: event.clientY };
	};
	return renderPart(
		"div",
		mergeProps(
			{
				...base,
				"data-slot": "context-menu-trigger",
				onPointerDown(event: PointerEvent<HTMLElement>) {
					remember(event);
					base.onPointerDown?.(event);
				},
				onContextMenu(event: MouseEvent<HTMLElement>) {
					remember(event);
					base.onContextMenu?.(event);
				},
			},
			props,
		),
		render,
	);
}

/** A nested menu. Put a `DropdownMenuSubTrigger` and `DropdownMenuSubContent` inside. */
export function DropdownMenuSub({
	children,
	placement = "right-start",
	...props
}: DropdownMenuProps) {
	const parent = useMenu();
	const ctx = useMenuMachine(props, placement);
	const { setParent } = ctx.api;
	const { setChild } = parent.api;
	useEffect(() => {
		setParent(parent.service);
		setChild(ctx.service);
	}, [setParent, setChild, parent.service, ctx.service]);
	return (
		<ParentContext.Provider value={parent}>
			<Context.Provider value={ctx}>{children}</Context.Provider>
		</ParentContext.Provider>
	);
}

type PartProps<T extends "button" | "div"> = ComponentProps<T> & {
	/** Render your own element instead of the default one. */
	render?: RenderProp;
};

export function DropdownMenuTrigger({ render, ...props }: PartProps<"button">) {
	const { api } = useMenu();
	return renderPart(
		"button",
		mergeProps(
			{ ...api.getTriggerProps(), "data-slot": "dropdown-menu-trigger" },
			props,
		),
		render,
	);
}

function Panel({
	className,
	render,
	slot,
	...props
}: PartProps<"div"> & { slot: string }) {
	const { api, point } = useMenu();
	const drop = useWaterDrop({
		sourceId: api.getTriggerProps().id,
		point: () => point.current,
		material: "liquid-glass-dense squircle [--squircle-radius:1.25rem]",
	});
	const { ref, mounted, attrs } = usePresence(api.open, drop);
	if (!mounted) return null;
	return (
		<Portal>
			<div {...api.getPositionerProps()} className="z-[70]">
				{renderPart(
					"div",
					mergeProps(
						{
							...api.getContentProps(),
							...attrs,
							ref,
							hidden: false,
							"data-slot": slot,
							className: cx(
								"min-w-44 max-h-(--available-height,24rem) overflow-y-auto liquid-glass-dense squircle morph-reset [--squircle-radius:1.25rem] p-1 text-label outline-none transition spring-smooth origin-(--transform-origin,center) data-ending-style:scale-[0.88] data-starting-style:scale-[0.88] data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:origin-top data-[side=top]:origin-bottom motion-reduce:transition-none motion-reduce:data-ending-style:scale-100 motion-reduce:data-starting-style:scale-100",
								className,
							),
						},
						props,
					),
					render,
				)}
			</div>
		</Portal>
	);
}

/** The floating list. Mounts only while open or leaving. */
export function DropdownMenuContent(props: PartProps<"div">) {
	return <Panel slot="dropdown-menu-content" {...props} />;
}

export function DropdownMenuSubContent(props: PartProps<"div">) {
	return <Panel slot="dropdown-menu-sub-content" {...props} />;
}

const itemClass =
	"relative flex cursor-default select-none items-center gap-2 rounded-xl px-2.5 py-1.5 text-footnote outline-none transition-colors duration-(--duration-instant) data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-accent/15";

export interface DropdownMenuItemProps
	extends Omit<ComponentProps<"div">, "onSelect"> {
	/** Identifies the item for typeahead and `onSelect` on the menu. Defaults to a generated id. */
	value?: string;
	disabled?: boolean;
	/** Set false to keep the menu open after this item is chosen. */
	closeOnSelect?: boolean;
	/** Runs when the item is chosen by pointer or keyboard. */
	onSelect?: () => void;
	render?: RenderProp;
}

/** Calls `onSelect` when Zag selects the element with this id. */
function useSelect(id: string, onSelect: (() => void) | undefined) {
	const { api } = useMenu();
	const latest = useRef(onSelect);
	latest.current = onSelect;
	const add = useRef(api.addItemListener);
	add.current = api.addItemListener;
	useEffect(
		() => add.current({ id, onSelect: () => latest.current?.() }),
		[id],
	);
}

export function DropdownMenuItem({
	value,
	disabled,
	closeOnSelect,
	onSelect,
	className,
	render,
	...props
}: DropdownMenuItemProps) {
	const { api } = useMenu();
	const generated = useId();
	const itemValue = value ?? generated;
	useSelect(api.getItemState({ value: itemValue }).id, onSelect);
	return renderPart(
		"div",
		mergeProps(
			{
				...api.getItemProps({ value: itemValue, disabled, closeOnSelect }),
				"data-slot": "dropdown-menu-item",
				className: cx(itemClass, className),
			},
			props,
		),
		render,
	);
}

export interface DropdownMenuCheckboxItemProps
	extends Omit<DropdownMenuItemProps, "onSelect"> {
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
}

function OptionBody({
	checked,
	children,
}: {
	checked: boolean;
	children: ReactNode;
}) {
	return (
		<>
			<span
				aria-hidden="true"
				className="text-accent-text inline-flex size-4 items-center justify-center"
			>
				{checked ? "✓" : null}
			</span>
			{children}
		</>
	);
}

export function DropdownMenuCheckboxItem({
	value,
	checked,
	onCheckedChange,
	disabled,
	closeOnSelect,
	className,
	render,
	children,
	...props
}: DropdownMenuCheckboxItemProps) {
	const { api } = useMenu();
	const generated = useId();
	const itemValue = value ?? generated;
	return renderPart(
		"div",
		mergeProps(
			{
				...api.getOptionItemProps({
					type: "checkbox",
					value: itemValue,
					checked,
					onCheckedChange,
					disabled,
					closeOnSelect,
				}),
				"data-slot": "dropdown-menu-checkbox-item",
				className: cx(itemClass, className),
				children: <OptionBody checked={checked}>{children}</OptionBody>,
			},
			props,
		),
		render,
	);
}

export interface DropdownMenuRadioGroupProps extends ComponentProps<"div"> {
	value?: string;
	onValueChange?: (value: string) => void;
}

export function DropdownMenuRadioGroup({
	value,
	onValueChange,
	...props
}: DropdownMenuRadioGroupProps) {
	const { api } = useMenu();
	const id = useId();
	return (
		<RadioContext.Provider
			value={{ value, onValueChange: onValueChange ?? (() => {}) }}
		>
			<div
				{...api.getItemGroupProps({ id })}
				data-slot="dropdown-menu-radio-group"
				{...props}
			/>
		</RadioContext.Provider>
	);
}

export function DropdownMenuRadioItem({
	value,
	disabled,
	closeOnSelect,
	className,
	render,
	children,
	...props
}: Omit<DropdownMenuItemProps, "onSelect"> & { value: string }) {
	const { api } = useMenu();
	const radio = useContext(RadioContext);
	const checked = radio?.value === value;
	return renderPart(
		"div",
		mergeProps(
			{
				...api.getOptionItemProps({
					type: "radio",
					value,
					checked,
					onCheckedChange: () => radio?.onValueChange(value),
					disabled,
					closeOnSelect,
				}),
				"data-slot": "dropdown-menu-radio-item",
				className: cx(itemClass, className),
				children: <OptionBody checked={checked}>{children}</OptionBody>,
			},
			props,
		),
		render,
	);
}

export function DropdownMenuGroup({
	children,
	...props
}: ComponentProps<"div">) {
	const { api } = useMenu();
	const id = useId();
	return (
		<GroupContext.Provider value={id}>
			<div
				{...api.getItemGroupProps({ id })}
				data-slot="dropdown-menu-group"
				{...props}
			>
				{children}
			</div>
		</GroupContext.Provider>
	);
}

const GroupContext = createContext<string | undefined>(undefined);

export function DropdownMenuLabel({
	className,
	...props
}: ComponentProps<"div">) {
	const { api } = useMenu();
	const group = useContext(GroupContext);
	const label = group ? api.getItemGroupLabelProps({ htmlFor: group }) : {};
	return (
		<div
			{...label}
			data-slot="dropdown-menu-label"
			className={cx(
				"px-2.5 py-1.5 text-footnote font-semibold text-label-secondary",
				className,
			)}
			{...props}
		/>
	);
}

export function DropdownMenuSeparator({
	className,
	...props
}: ComponentProps<"div">) {
	const { api } = useMenu();
	return (
		<div
			{...api.getSeparatorProps()}
			data-slot="dropdown-menu-separator"
			className={cx("-mx-1 my-1 h-px bg-separator", className)}
			{...props}
		/>
	);
}

export function DropdownMenuShortcut({
	className,
	...props
}: ComponentProps<"span">) {
	return (
		<span
			data-slot="dropdown-menu-shortcut"
			className={cx(
				"ms-auto ps-4 text-caption tracking-widest text-label-tertiary",
				className,
			)}
			{...props}
		/>
	);
}

/** The item that opens a submenu. Place it inside `DropdownMenuSub`. */
export function DropdownMenuSubTrigger({
	className,
	render,
	children,
	...props
}: PartProps<"div">) {
	const parent = useContext(ParentContext);
	const { api } = useMenu();
	if (!parent)
		throw new Error(
			"DropdownMenuSubTrigger must be used inside <DropdownMenuSub>.",
		);
	return renderPart(
		"div",
		mergeProps(
			{
				...parent.api.getTriggerItemProps(api),
				"data-slot": "dropdown-menu-sub-trigger",
				className: cx(itemClass, className),
				children: (
					<>
						{children}
						<span aria-hidden="true" className="text-label-tertiary ms-auto">
							›
						</span>
					</>
				),
			},
			props,
		),
		render,
	);
}
