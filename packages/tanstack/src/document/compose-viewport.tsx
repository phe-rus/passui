import { cn } from "@passui/react/cn";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type {
	ComponentPropsWithoutRef,
	PropsWithChildren,
	ReactNode,
} from "react";

/** Extra props (such as `data-theme`) land on `<html>` itself. */
type ComposeViewportProps = PropsWithChildren<ComponentPropsWithoutRef<"html">>;

type WindowProps = ComponentPropsWithoutRef<"body"> & {
	/**
	 * Rendered as direct `<body>` children, after `<main>`, not inside it.
	 * `<Scripts />` (and devtools) belong here — TanStack Router's own docs
	 * say `<Scripts />` "should be placed near the end of the document
	 * body", not nested inside the app's content wrapper.
	 */
	after?: ReactNode;
	/**
	 * `"container"` (default) fixes `<body>` and scrolls inside `<main>`.
	 * `"document"` lets the page itself scroll, which is what lets iOS Safari
	 * collapse its toolbar and tint the overscroll area.
	 */
	scroll?: "container" | "document";
	/**
	 * iOS only: a 6px transparent strip fixed to the bottom edge, so Safari
	 * treats the area under the toolbar as page chrome. Off unless a real
	 * device shows the gap it closes.
	 */
	edgeShim?: boolean;
};

export function ComposeViewport({
	children,
	lang = "en",
	className,
	...props
}: ComposeViewportProps) {
	return (
		<html
			lang={lang}
			className={cn("antialiased blur-none", className)}
			suppressHydrationWarning
			{...props}
		>
			{children}
		</html>
	);
}

function Window({
	className,
	children,
	after,
	scroll = "container",
	edgeShim = false,
	...props
}: WindowProps) {
	const documentScroll = scroll === "document";
	return (
		<body
			className={cn(
				"bg-background w-full min-w-full",
				"selection:bg-accent/20",
				"typeset wrap-anywhere duration-200",
				"flex flex-col",
				documentScroll
					? "h-auto min-h-dvh overflow-x-clip"
					: "fixed h-svh overflow-x-hidden",
				className,
			)}
			{...props}
		>
			<main
				className={cn(
					"no-scrollbar flex flex-1 flex-col",
					documentScroll
						? "min-h-0 overflow-visible"
						: "min-h-svh overflow-auto",
				)}
			>
				{children}
			</main>
			{edgeShim && (
				<div
					aria-hidden="true"
					data-slot="edge-shim"
					className="ios:block pointer-events-none fixed inset-x-0 -bottom-px z-9999 hidden h-1.5 w-full"
				/>
			)}
			{after}
		</body>
	);
}

function Devtools() {
	return (
		<TanStackDevtools
			config={{
				triggerMode: "floating",
				position: "top-right",
			}}
			plugins={[
				{
					name: "TanStack Query",
					render: <ReactQueryDevtoolsPanel />,
				},
				{
					name: "Tanstack Router",
					render: <TanStackRouterDevtoolsPanel />,
				},
			]}
		/>
	);
}

ComposeViewport.Window = Window;
ComposeViewport.Devtools = Devtools;
