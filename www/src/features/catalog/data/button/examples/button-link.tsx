import { buttonVariants } from "@passui/react/button";

export function ButtonLink() {
	return (
		<a href="#guide" className={buttonVariants({ variant: "secondary" })}>
			Read the guide
		</a>
	);
}
