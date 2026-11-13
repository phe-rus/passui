import { Badge } from "@passui/react/badge";
import { Button } from "@passui/react/button";
import { CodeBlock } from "@passui/react/code-block";
import { Layout } from "@passui/react/layout";
import { Switch } from "@passui/react/switch";
import { Text } from "@passui/react/text";
import { accents } from "@passui/react/tokens";
import {
	createFileRoute,
	Link,
	stripSearchParams,
} from "@tanstack/react-router";
import { getPageHead } from "@/features/seo/lib/seo";
import {
	measureRole,
	roleSpecs,
	type Scheme,
} from "@/features/themes/lib/contrast";
import {
	defaultThemesSearch,
	themesSearchSchema,
} from "@/features/themes/lib/search";
import {
	accentIds,
	usePinnedAccent,
} from "@/features/themes/lib/use-pinned-accent";
import { useCopyText } from "@/hooks/use-copy-text";

export const Route = createFileRoute("/(marketing)/themes")({
	validateSearch: themesSearchSchema,
	search: { middlewares: [stripSearchParams(defaultThemesSearch)] },
	head: () =>
		getPageHead(
			"/themes",
			"Themes · Passui",
			"Seven accents, each tuned for light and dark. Pick one and the whole page follows.",
		),
	component: RouteComponent,
});

const schemes: Scheme[] = ["light", "dark"];

function RouteComponent() {
	const { accent: current } = Route.useSearch();
	const navigate = Route.useNavigate();
	const copy = useCopyText();
	usePinnedAccent(current);
	const code =
		current === "blush" ? "<html>" : `<html data-accent="${current}">`;
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
							onClick={() =>
								void navigate({ search: { accent: id }, replace: true })
							}
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

				<div className="mt-6 grid gap-4 md:grid-cols-2">
					{schemes.map((scheme) => (
						<section
							key={scheme}
							data-theme={scheme}
							aria-label={`${scheme} preview`}
							className="bg-background ring-separator/60 flex flex-col gap-5 rounded-3xl p-6 ring-1 transition-colors duration-500"
						>
							<Text size="footnote" tone="secondary" className="capitalize">
								{scheme}
							</Text>
							<div className="flex flex-wrap items-center gap-2">
								<Button>Default</Button>
								<Button variant="accent">Accent</Button>
								<Button variant="outline">Outline</Button>
							</div>
							<div className="flex flex-wrap items-center gap-4">
								<Switch aria-label={`${scheme} sample switch`} defaultChecked />
								<Badge>New</Badge>
								<Badge variant="secondary">Secondary</Badge>
								<span className="text-accent-text text-callout font-medium">
									Accent text
								</span>
							</div>
							<div className="bg-accent-soft rounded-2xl px-4 py-3">
								<span className="text-footnote text-accent-text">
									A soft tint sits behind accent content.
								</span>
							</div>
						</section>
					))}
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
				<Text size="footnote" tone="tertiary" className="mt-2">
					Blush is the root default and needs no attribute. Any element can also
					carry <code>data-theme</code> to keep its own appearance, as the two
					panels above do.
				</Text>

				<h2 className="text-title3 text-label mt-12 mb-1 font-medium">
					Values for {accents[current].name}
				</h2>
				<Text size="subheadline" tone="secondary" className="mb-4">
					Select a value to copy it. Text pairs are measured as the tokens are
					tested: AA asks for 4.5:1.
				</Text>
				<div className="grid gap-4 md:grid-cols-2">
					{schemes.map((scheme) => (
						<section
							key={scheme}
							aria-label={`${scheme} values`}
							className="bg-elevated ring-separator/60 rounded-3xl p-5 ring-1"
						>
							<h3 className="text-headline text-label m-0 mb-3 font-medium capitalize">
								{scheme}
							</h3>
							<ul className="m-0 flex list-none flex-col gap-3 p-0">
								{roleSpecs.map((spec) => {
									const value = accents[current][scheme][spec.role];
									const result = measureRole(current, scheme, spec);
									return (
										<li key={spec.role} className="flex items-start gap-3">
											<span
												aria-hidden
												className="mt-0.5 size-7 shrink-0 rounded-lg ring-1 ring-black/10"
												style={{ backgroundColor: value }}
											/>
											<div className="flex min-w-0 flex-1 flex-col gap-0.5">
												<span className="text-callout text-label">
													{spec.role}
												</span>
												<span className="text-footnote text-label-secondary">
													{spec.meaning}
												</span>
												{result ? (
													<span
														className={
															result.passes
																? "text-footnote text-success tabular-nums"
																: "text-footnote text-danger tabular-nums"
														}
													>
														{result.ratio.toFixed(1)}:1 on {result.label}
														{result.passes ? " · AA" : " · below AA"}
													</span>
												) : null}
											</div>
											<button
												type="button"
												aria-label={`Copy ${spec.role} ${value}`}
												onClick={() => void copy(value, `Copied ${value}`)}
												className="text-footnote text-label-tertiary bg-fill/50 hover:bg-fill hover:text-label focus-visible:ring-accent/70 rounded-lg px-2 py-1 font-mono tabular-nums transition-colors outline-none focus-visible:ring-2"
											>
												{value}
											</button>
										</li>
									);
								})}
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
