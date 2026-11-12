import { CodeView } from "@/features/playground";
import { installSteps } from "../data/installation/content";

/** Numbered setup steps, each with its code. */
export function InstallSteps() {
	const steps = installSteps;
	return (
		<ol className="border-separator/70 m-0 flex list-none flex-col gap-5 border-s p-0 ps-6">
			{steps.map((step, index) => (
				<li key={step.title} className="relative flex flex-col gap-2">
					<span className="bg-fill text-footnote text-label ring-background absolute -start-[2.3rem] top-0 flex size-7 items-center justify-center rounded-full font-bold ring-4">
						{index + 1}
					</span>
					<span>{step.title}</span>
					<div className="ring-separator/60 overflow-hidden rounded-3xl ring-1">
						<CodeView code={step.code} lang={step.lang} />
					</div>
				</li>
			))}
		</ol>
	);
}
