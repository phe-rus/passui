import { buttonVariants } from "@passui/react/button";
import { Link } from "@tanstack/react-router";

export function DocNotFound() {
	return (
		<div className="flex flex-col items-start gap-4 py-10">
			<h1 className="font-brand text-large-title font-extrabold">
				Page not found
			</h1>
			<p className="text-callout text-label-secondary">
				That page does not exist in the docs.
			</p>
			<Link to="/docs/components" className={buttonVariants()}>
				Browse components
			</Link>
		</div>
	);
}
