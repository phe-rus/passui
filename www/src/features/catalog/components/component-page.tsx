import { Breadcrumb } from "@passui/react/breadcrumb";
import { ComponentNavigation } from "./component-navigation";
import { buttonStyle } from "@passui/react/button";
import { InfoIcon, LinkIcon } from "@passui/react/icons";
import { Link } from "@tanstack/react-router";
import { CopyForAi } from "@/features/ai";
import { CodeView, Playground, PreviewFrame } from "@/features/playground";
import type { DocsSettings } from "@/features/settings";
import { getEntry } from "../lib/get-catalog";
import { getSetup } from "../lib/get-setup";
import { componentTitle } from "../lib/navigation";
import { ExampleCode } from "./example-code";
import { AnatomyTable } from "./anatomy-table";
import { DocSection } from "./doc-section";
import { ExampleCard } from "./example-card";
import { InstallSteps } from "./install-steps";
import { OnThisPage, type TocItem } from "./on-this-page";
import { PracticesList } from "./practices-list";
import { PropsTable } from "./props-table";

type ComponentPageProps = {
	slug: string;
	settings: DocsSettings;
	rawProps: Record<string, unknown>;
};

/**
 * One component, arranged like the best docs sites: the live playground
 * first, then setup, usage, anatomy, examples, practices, accessibility
 * and the full prop reference, with a map of the page beside it.
 */
export function ComponentPage({
	slug,
	settings,
	rawProps,
}: ComponentPageProps) {
	const entry = getEntry(slug);
	if (!entry) return null;
	const { docs, content } = entry;
	const setup = getSetup(docs.slug);
	const Showcase = docs.showcase;
	const Usage = docs.usage;
	const isolated =
		docs.slug === "view-controller" || docs.slug === "locale-switcher";
	const examples = docs.examples.map((example) => ({
		example,
		words: content.examples[example.id],
	}));
	const toc: TocItem[] = [
		{ id: "playground", title: "Playground" },
		{ id: "installation", title: "Installation" },
		...(setup ? [{ id: "setup", title: "Setup" }] : []),
		{ id: "usage", title: "Usage" },
		{ id: "anatomy", title: "Anatomy" },
		...(examples.length > 0
			? [
					{
						id: "examples",
						title: "Examples",
						children: examples.map(({ example, words }) => ({
							id: `example-${example.id}`,
							title: words.title,
						})),
					},
				]
			: []),
		{ id: "best-practices", title: "Best practices" },
		{ id: "accessibility", title: "Accessibility" },
		{ id: "api-reference", title: "API reference" },
	];
	const importLine = `import { ${docs.name} } from "${docs.importPath}"`;

	return (
		<div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_13rem]">
			<article className="flex min-w-0 flex-col gap-5">
				<header className="flex flex-col gap-2">
					<Breadcrumb
						label="Breadcrumb"
						items={[
							{ label: "Components", href: "/components" },
							{ label: componentTitle(entry) },
						]}
						renderLink={(item) => (
							<Link
								to="/components"
								className="hover:text-label focus-visible:outline-accent-text rounded-sm focus-visible:outline-2"
							>
								{item.label}
							</Link>
						)}
					/>
					<h1 className="font-brand text-large-title font-extrabold tracking-tight">
						{componentTitle(entry)}
					</h1>
					<p className="text-callout text-label-secondary max-w-2xl">
						{content.summary}
					</p>
					<div className="flex flex-wrap gap-2">
						<Link
							to="/preview/$slug"
							params={{ slug: docs.slug }}
							search={{
								theme: settings.theme,
								accent: settings.accent,
								os: settings.os,
								scene: "showcase",
							}}
							target="_blank"
							className={buttonStyle({
								variant: "secondary",
								size: "sm",
							})}
						>
							<LinkIcon size={16} />
							Open preview
						</Link>
						<CopyForAi slug={docs.slug} />
					</div>
				</header>

				<section
					aria-label="Showcase"
					className="rounded-5xl bg-accent-soft/50 ring-separator/60 flex min-h-60 items-center justify-center p-5 ring-1"
				>
					{isolated ? (
						<div className="w-full">
							<PreviewFrame
								docs={docs}
								settings={settings}
								props={{}}
								scene="showcase"
							/>
						</div>
					) : (
						<Showcase />
					)}
				</section>

				<DocSection
					id="playground"
					title="Playground"
					description="Adjust the preview and props. Share its URL to restore the same state."
				>
					<Playground docs={docs} settings={settings} rawProps={rawProps} />
				</DocSection>

				<DocSection id="installation" title="Installation" collapsible>
					<InstallSteps />
				</DocSection>

				{setup && (
					<DocSection id="setup" title="Setup" description={setup.description}>
						<CodeView code={setup.code} label="tsx" />
					</DocSection>
				)}
				<DocSection id="usage" title="Usage" description={content.usage}>
					<div className="ring-separator/60 overflow-hidden rounded-3xl ring-1">
						<CodeView code={importLine} label="tsx" />
					</div>
					<div className="ring-separator/60 overflow-hidden rounded-4xl ring-1">
						<div className="bg-background flex min-h-40 items-center justify-center p-5">
							{isolated ? (
								<div className="w-full">
									<PreviewFrame
										docs={docs}
										settings={settings}
										props={{}}
										scene="usage"
									/>
								</div>
							) : (
								<Usage />
							)}
						</div>
						<div className="border-separator/60 border-t">
							<ExampleCode slug={docs.slug} id="usage" />
						</div>
					</div>
				</DocSection>

				<DocSection id="anatomy" title="Anatomy" collapsible>
					<AnatomyTable parts={content.anatomy} />
				</DocSection>

				{examples.length > 0 && (
					<DocSection
						id="examples"
						title="Examples"
						description="Common setups, variations and states."
					>
						<div className="flex flex-col gap-5">
							{examples.map(({ example, words }) => (
								<ExampleCard
									key={example.id}
									docs={docs}
									example={example}
									content={words}
									settings={settings}
								/>
							))}
						</div>
					</DocSection>
				)}

				<DocSection id="best-practices" title="Best practices" collapsible>
					<PracticesList practices={content.practices} />
				</DocSection>

				<DocSection id="accessibility" title="Accessibility" collapsible>
					<ul className="m-0 flex list-none flex-col gap-5 p-0">
						{content.accessibility.map((line) => (
							<li key={line} className="flex items-start gap-2">
								<InfoIcon size={18} />
								<span>{line}</span>
							</li>
						))}
					</ul>
				</DocSection>

				<DocSection id="api-reference" title="API reference">
					<PropsTable docs={docs} descriptions={content.propDescriptions} />
				</DocSection>
				<ComponentNavigation slug={slug} />
			</article>

			<aside className="hidden xl:block">
				<div className="sticky top-24">
					<OnThisPage items={toc} />
				</div>
			</aside>
		</div>
	);
}
