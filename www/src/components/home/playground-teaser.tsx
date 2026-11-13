import type { ButtonVariant } from "@passui/react/button";
import { Button } from "@passui/react/button";
import { LabeledContent } from "@passui/react/labeled-content";
import { SegmentedControl } from "@passui/react/segmented-control";
import { Switch } from "@passui/react/switch";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

type TeaserVariant = Extract<
	ButtonVariant,
	"default" | "secondary" | "outline" | "accent"
>;

const variants: { value: TeaserVariant; label: string }[] = [
	{ value: "default", label: "Default" },
	{ value: "secondary", label: "Secondary" },
	{ value: "outline", label: "Outline" },
	{ value: "accent", label: "Accent" },
];

/** A small live demo of the Button, with the code that produces it. */
export function PlaygroundTeaser() {
	const [variant, setVariant] = useState<TeaserVariant>("accent");
	const [pending, setPending] = useState(false);
	const props = [
		variant !== "default" && `variant="${variant}"`,
		pending && "isPending",
	]
		.filter(Boolean)
		.join(" ");
	const code = `import { Button } from "@passui/react/button";\n\n<Button${props ? ` ${props}` : ""}>Continue</Button>`;

	return (
		<section
			id="playground"
			aria-labelledby="playground-title"
			className="mx-auto grid w-full max-w-6xl scroll-mt-24 items-center gap-8 px-4 md:grid-cols-2 md:px-6"
		>
			<div className="flex flex-col gap-5">
				<h2
					id="playground-title"
					className="text-label text-[clamp(2rem,4vw,2.6rem)] leading-[1.08] font-medium"
				>
					Try it right here
				</h2>
				<p className="text-body text-label-secondary max-w-md">
					Flip the options, watch the press spring settle, and copy code that
					matches what you see.
				</p>
				<div className="flex max-w-md flex-col gap-4">
					<SegmentedControl
						aria-label="Variant"
						value={variant}
						onValueChange={(next) => setVariant(next as TeaserVariant)}
						options={variants}
					/>
					<LabeledContent label="Pending">
						<Switch
							aria-label="Pending"
							checked={pending}
							onCheckedChange={setPending}
						/>
					</LabeledContent>
				</div>
				<p className="text-footnote text-label-tertiary">
					<Link to="/docs/components/$slug" params={{ slug: "button" }}>
						Every option is on the Button page
					</Link>
					.
				</p>
			</div>
			<div className="liquid-glass squircle overflow-hidden [--squircle-radius:2rem]">
				<div className="bg-accent-soft/50 flex min-h-56 items-center justify-center p-10 transition-colors duration-500">
					<Button variant={variant} isPending={pending}>
						Continue
					</Button>
				</div>
				<pre className="text-footnote m-0 overflow-x-auto p-4">{code}</pre>
			</div>
		</section>
	);
}
