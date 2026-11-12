import { buttonVariants } from "@passui/react/button";
import { Link } from "@tanstack/react-router";
import { PassuiMark } from "../layout/passui-mark";

export function Hero() {
	return (
		<section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center">
			<PassuiMark animated className="size-16" />
			<h1 className="font-brand text-large-title font-extrabold tracking-tight md:text-[3.5rem]">
				Native React controls, on Zag.
			</h1>
			<p className="text-callout text-label-secondary max-w-xl">
				A small, shadcn shaped library with an Apple 2026 look. Import one
				component and pay only for it.
			</p>
			<div className="flex flex-wrap justify-center gap-3">
				<Link
					to="/docs/$slug"
					params={{ slug: "installation" }}
					className={buttonVariants({ size: "lg" })}
				>
					Get started
				</Link>
				<Link
					to="/docs/components"
					className={buttonVariants({ variant: "secondary", size: "lg" })}
				>
					Browse components
				</Link>
			</div>
		</section>
	);
}
