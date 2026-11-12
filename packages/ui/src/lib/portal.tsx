import { type ReactNode, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const subscribe = () => () => {};

/**
 * Renders children into `document.body`. The server and the first hydration
 * pass render nothing, so overlays never cause an id or markup mismatch.
 */
export function Portal({
	children,
	container,
}: {
	children: ReactNode;
	container?: Element | null;
}) {
	const ready = useSyncExternalStore(
		subscribe,
		() => true,
		() => false,
	);
	return ready ? createPortal(children, container ?? document.body) : null;
}
