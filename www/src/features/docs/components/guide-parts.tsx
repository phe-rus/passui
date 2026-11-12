import type { ReactNode } from "react";
import { CodeView, type CodeLang } from "@/features/playground";

/** A paragraph of guide text. */
export function Prose({ children }: { children: ReactNode }) {
	return <p className="text-callout text-label m-0 max-w-2xl">{children}</p>;
}

/** Inline code inside guide text. */
export function Code({ children }: { children: ReactNode }) {
	return (
		<code className="bg-fill text-footnote text-label rounded-md px-1.5 py-0.5 font-mono">
			{children}
		</code>
	);
}

/** Code in a rounded frame with a caption, such as a file name. */
export function CodeBlock({
	code,
	label,
	lang,
}: {
	code: string;
	label?: string;
	lang?: CodeLang;
}) {
	return (
		<div className="ring-separator/60 overflow-hidden rounded-3xl ring-1">
			<CodeView code={code} label={label} lang={lang} />
		</div>
	);
}

type Step = {
	title: string;
	body?: ReactNode;
	code?: string;
	label?: string;
	lang?: CodeLang;
};

/** Numbered steps, each with optional words and code. */
export function Steps({ steps }: { steps: Step[] }) {
	return (
		<ol className="border-separator/70 m-0 flex list-none flex-col gap-6 border-s p-0 ps-6">
			{steps.map((step, index) => (
				<li key={step.title} className="relative flex flex-col gap-3">
					<span className="bg-fill text-footnote text-label ring-background absolute -start-[2.3rem] top-0 flex size-7 items-center justify-center rounded-full font-bold ring-4">
						{index + 1}
					</span>
					<span className="text-subheadline text-label font-semibold">
						{step.title}
					</span>
					{step.body}
					{step.code && (
						<CodeBlock code={step.code} label={step.label} lang={step.lang} />
					)}
				</li>
			))}
		</ol>
	);
}
