import { LabeledContent, SegmentedControl, Toggle } from "@passui/react";
import type { ButtonVariant } from "@passui/react/legacy/button";
import { Button } from "@passui/react/legacy/button";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { CodeView } from "@/features/playground/components/code-view";

type TeaserVariant = Extract<
	ButtonVariant,
	"default" | "secondary" | "outline" | "accent"
>;

export function PlaygroundTeaser() {
	const [variant, setVariant] = useState<TeaserVariant>("accent");
	const [pending, setPending] = useState(false);
	const props = [
		variant !== "default" && `variant="${variant}"`,
		pending && "isPending",
	]
		.filter(Boolean)
		.join(" ");
	const code = `import { Button } from "@passui/react/legacy/button"\n\n<Button${props ? ` ${props}` : ""}>Continue</Button>`;

	return (
		<section
			id="playground"
			aria-labelledby="playground-title"
			className="mx-auto grid w-full max-w-6xl scroll-mt-24 items-center gap-8 px-4 md:grid-cols-2 md:px-6"
		>
			<div className="flex flex-col gap-5">
				<h2
					id="playground-title"
					className="text-label text-[clamp(2rem,4vw,2.6rem)] leading-[1.08] font-bold tracking-tight"
				>
					Try it right here
				</h2>
				<p className="text-body text-label-secondary max-w-md">
					Every component has a playground: flip its options, switch theme,
					accent and platform, and copy code that matches what you see.
				</p>
				<div className="flex max-w-md flex-col gap-4">
					<SegmentedControl
						value={variant}
						onChange={setVariant}
						label="Variant"
						options={[
							{
								value: "default",
								label: "Default",
							},
							{
								value: "secondary",
								label: "Secondary",
							},
							{
								value: "outline",
								label: "Outline",
							},
							{
								value: "accent",
								label: "Accent",
							},
						]}
					/>
					<LabeledContent label="Pending">
						<Toggle
							checked={pending}
							onChange={setPending}
							label="Pending"
							labelHidden
						/>
					</LabeledContent>
				</div>
				<p className="text-footnote text-label-tertiary">
					<Link to="/components/react/$slug" params={{ slug: "button" }}>
						Explore every option in the Button playground
					</Link>
					.
				</p>
			</div>
			<div className="rounded-5xl bg-elevated ring-separator/60 overflow-hidden ring-1">
				<div className="bg-accent-soft/50 flex min-h-56 items-center justify-center p-10 transition-colors duration-700">
					<Button variant={variant} isPending={pending}>
						Continue
					</Button>
				</div>
				<CodeView code={code} collapsible={false} />
			</div>
		</section>
	);
}
