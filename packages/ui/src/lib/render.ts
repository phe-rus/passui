import {
	cloneElement,
	createElement,
	type ElementType,
	type ReactElement,
	type Ref,
} from "react";
import { cx } from "./cx";

type Props = Record<string, unknown>;

/**
 * Lets a part become the consumer's own element. Pass an element to receive
 * the part's props merged into it, or a function that gets the props.
 */
export type RenderProp = ReactElement | ((props: Props) => ReactElement);

function setRef<T>(ref: Ref<T> | undefined, value: T | null) {
	if (typeof ref === "function") ref(value);
	else if (ref) (ref as { current: T | null }).current = value;
}

/**
 * Merges two prop bags. Event handlers from both run (the element's first),
 * class names join, styles merge (the element wins) and refs both receive the node.
 */
export function mergeProps(base: Props, own: Props): Props {
	const merged: Props = { ...base, ...own };
	for (const key of Object.keys(own)) {
		const a = base[key];
		const b = own[key];
		if (
			/^on[A-Z]/.test(key) &&
			typeof a === "function" &&
			typeof b === "function"
		)
			merged[key] = (...args: unknown[]) => {
				b(...args);
				a(...args);
			};
		else if (key === "className") merged[key] = cx(a as string, b as string);
		else if (key === "style")
			merged[key] = { ...(a as object), ...(b as object) };
		else if (key === "ref" && a && b)
			merged[key] = (node: unknown) => {
				setRef(a as Ref<unknown>, node);
				setRef(b as Ref<unknown>, node);
			};
	}
	return merged;
}

/** Renders `tag` with `props`, or the consumer's `render` element or function in its place. */
export function renderPart(
	tag: ElementType,
	props: Props,
	render?: RenderProp,
): ReactElement {
	if (typeof render === "function") return render(props);
	if (render)
		return cloneElement(
			render,
			mergeProps(props, render.props as Props) as Record<string, unknown>,
		);
	return createElement(tag, props);
}
