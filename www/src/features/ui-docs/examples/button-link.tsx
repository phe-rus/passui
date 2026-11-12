import { buttonVariants } from "@passui/react/button";

/** Any element can wear the button's classes, such as a link. */
export function ButtonLink() {
	return (
		<a
			href="https://passui.pherus.org"
			className={buttonVariants({ variant: "outline" })}
		>
			Open the docs
		</a>
	);
}
