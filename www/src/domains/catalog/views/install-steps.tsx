import { CodeView } from "@/domains/playground"
import { installSteps } from "../content/installation"

/** Numbered setup steps, each with its code. */
export function InstallSteps() {
    const steps = installSteps
    return (
        <ol className="m-0 flex list-none flex-col gap-5 border-separator/70 border-s p-0 ps-6">
            {steps.map((step, index) => (
                <li key={step.title} className="relative flex flex-col gap-2">
                    <span className="absolute -start-[2.3rem] top-0 flex size-7 items-center justify-center rounded-full bg-fill text-footnote font-bold text-label ring-4 ring-background">
                        {index + 1}
                    </span>
                    <span>{step.title}</span>
                    <div className="overflow-hidden rounded-3xl ring-1 ring-separator/60">
                        <CodeView code={step.code} lang={step.lang} />
                    </div>
                </li>
            ))}
        </ol>
    )
}
