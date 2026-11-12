import { buttonStyle } from "@passui/react/button";
import { Link } from "@tanstack/react-router";

/** Shown for a component slug the registry does not know. */
export function ComponentNotFound() {
	return (
		<div className="flex min-h-[50svh] flex-col items-center justify-center gap-4 text-center">
			<span className="text-footnote text-accent-text font-mono font-semibold">
				404
			</span>
			<h1 className="font-brand text-title text-label font-extrabold tracking-tight">
				No component by that name
			</h1>
			<p className="text-callout text-label-secondary max-w-sm">
				Check the address or browse the catalog to find a documented component.
			</p>
			<Link
				to="/components"
				className={buttonStyle({
					variant: "secondary",
				})}
			>
				Browse components
			</Link>
		</div>
	);
}
