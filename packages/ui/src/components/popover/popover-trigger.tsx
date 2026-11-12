import { type ReactNode, cloneElement, isValidElement } from "react";
import { usePopover } from "./popover-root";

export type PopoverTriggerRenderProps = {
	ref: (node: HTMLElement | null) => void;
	"aria-haspopup": "dialog";
	"aria-expanded": boolean;
	"aria-controls": string | undefined;
	onClick: () => void;
	onKeyDown: (event: React.KeyboardEvent) => void;
};

export interface PopoverTriggerProps {
	/** The trigger content when using render prop. */
	children?: ReactNode;
	/**
	 * Render prop: receives the trigger props (ref, aria, onClick) and
	 * returns the trigger element. This prevents ref-passing conflicts
	 * when multiple triggers exist — borrowed from Base UI.
	 *
	 * If you pass a single element as children instead, it will be
	 * cloned with the trigger props merged in.
	 */
	render?: (props: PopoverTriggerRenderProps) => ReactNode;
}

export function PopoverTrigger({ children, render }: PopoverTriggerProps) {
	const { state, send, triggerRef, contentId } = usePopover();

	const triggerProps: PopoverTriggerRenderProps = {
		ref: (node) => {
			triggerRef.current = node;
		},
		"aria-haspopup": "dialog",
		"aria-expanded": state === "open" || state === "opening",
		"aria-controls": state !== "closed" ? contentId : undefined,
		onClick: () => send("TOGGLE"),
		onKeyDown: (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				send("TOGGLE");
			}
		},
	};

	if (render) {
		return render(triggerProps);
	}

	// Clone a single child element with the trigger props merged.
	if (isValidElement(children)) {
		const child = children as React.ReactElement<Record<string, unknown>>;
		return cloneElement(child, {
			ref: (node: HTMLElement | null) => {
				triggerRef.current = node;
			},
			"aria-haspopup": "dialog",
			"aria-expanded": state === "open" || state === "opening",
			"aria-controls": state !== "closed" ? contentId : undefined,
			onClick: () => send("TOGGLE"),
			onKeyDown: (event: React.KeyboardEvent) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					send("TOGGLE");
				}
			},
		});
	}

	return null;
}
