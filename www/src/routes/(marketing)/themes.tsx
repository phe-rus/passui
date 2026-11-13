import { Button } from "@passui/react/button";
import { cn } from "@passui/react/cn";
import { CodeBlock } from "@passui/react/code-block";
import { Layout } from "@passui/react/layout";
import { accents } from "@passui/react/tokens";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getPageHead } from "@/features/seo/lib/seo";
import {
	accentIds,
	usePinnedAccent,
} from "@/features/themes/lib/use-pinned-accent";

export const Route = createFileRoute("/(marketing)/themes")({
	head: () =>
		getPageHead(
			"/themes",
			"Themes · Passui",
			"Seven accents, each tuned for light and dark. Pick one and the whole page follows.",
		),
	component: RouteComponent,
});

const roles = ["accent", "onAccent", "accentText", "accentSoft"] as const;

function RouteComponent() {
	const [current, setCurrent] = usePinnedAccent();
	const code = `<html data-accent="${current}">`;
	return (
		<div className="mx-auto w-full max-w-5xl px-6 py-12">
			<Layout
				heading={
					<Layout.Heading
						title="Themes"
						description="Seven accents, each tuned for light and dark. Choose one and this page follows."
					/>
				}
			>
				<fieldset className="mt-8 flex flex-wrap gap-2 border-0 p-0">
					<legend className="sr-only">Accent</legend>
					{accentIds.map((id) => (
						<Button
							key={id}
							variant={id === current ? "accent" : "secondary"}
							size="sm"
							aria-pressed={id === current}
							onClick={() => setCurrent(id)}
						>
							<span
								aria-hidden
								className="size-3 rounded-full ring-1 ring-black/10"
								style={{ backgroundColor: accents[id].swatch }}
							/>
							{accents[id].name}
						</Button>
					))}
				</fieldset>

				<div className="bg-accent-soft/60 mt-6 flex flex-wrap items-center gap-3 rounded-3xl p-8 transition-colors duration-500">
					<Button>Default</Button>
					<Button variant="accent">Accent</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="outline">Outline</Button>
					<span className="text-accent-text text-callout font-medium">
						Accent text
					</span>
				</div>

				<div className="not-typeset ring-separator/60 mt-4 overflow-hidden rounded-2xl ring-1">
					<CodeBlock
						code={code}
						language="html"
						lineNumbers={false}
						wrap
						copyable
					/>
				</div>

				<h2 className="text-title3 text-label mt-12 mb-3 font-medium">
					Values for {accents[current].name}
				</h2>
				<div className="grid gap-4 md:grid-cols-2">
					{(["light", "dark"] as const).map((scheme) => (
						<section
							key={scheme}
							aria-label={`${scheme} values`}
							className="bg-elevated ring-separator/60 rounded-3xl p-5 ring-1"
						>
							<h3 className="text-headline text-label m-0 mb-3 font-medium capitalize">
								{scheme}
							</h3>
							<ul className="m-0 flex list-none flex-col gap-2 p-0">
								{roles.map((role) => (
									<li key={role} className="flex items-center gap-3">
										<span
											aria-hidden
											className={cn(
												"size-6 shrink-0 rounded-lg ring-1 ring-black/10",
											)}
											style={{
												backgroundColor: accents[current][scheme][role],
											}}
										/>
										<span className="text-callout text-label-secondary flex-1">
											{role}
										</span>
										<code className="text-footnote text-label-tertiary font-mono tabular-nums">
											{accents[current][scheme][role]}
										</code>
									</li>
								))}
							</ul>
						</section>
					))}
				</div>
				<p className="text-footnote text-label-tertiary mt-6">
					<Link to="/docs/$slug" params={{ slug: "accents" }}>
						How accents work
					</Link>
				</p>
			</Layout>
		</div>
	);
}
