import { CodeBlock } from "@passui/react/code-block";
import type { ComponentProps, ReactNode } from "react";

export function Prose({ children }: { children: ReactNode }) {
	return (
		<p className="text-callout text-label-secondary max-w-2xl">{children}</p>
	);
}

export function Code({ children }: { children: ReactNode }) {
	return (
		<code className="bg-fill text-footnote rounded-md px-1.5 py-0.5">
			{children}
		</code>
	);
}

/** A plain code sample for guides. Component examples use server highlighted code instead. */
export function Snippet({ code, label }: { code: string; label?: string }) {
	return (
		<figure className="flex flex-col gap-1.5">
			{label ? (
				<figcaption className="text-caption text-label-tertiary">
					{label}
				</figcaption>
			) : null}
			<CodeBlock
				code={code}
				lineNumbers={false}
				className="bg-fill/50 rounded-2xl text-left"
			/>
		</figure>
	);
}

export function Section({
	id,
	title,
	description,
	children,
	...props
}: {
	id: string;
	title: string;
	description?: string;
	children: ReactNode;
} & Omit<ComponentProps<"section">, "title">) {
	return (
		<section
			id={id}
			aria-labelledby={`${id}-title`}
			className="flex scroll-mt-24 flex-col gap-3"
			{...props}
		>
			<h2 id={`${id}-title`} className="text-title3 font-semibold">
				{title}
			</h2>
			{description ? (
				<p className="text-subheadline text-label-secondary">{description}</p>
			) : null}
			{children}
		</section>
	);
}
