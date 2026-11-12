import { Badge } from "@passui/react/badge";
import { Link } from "@tanstack/react-router";
import { getNeighbours } from "@/features/components/navigation";
import type {
	ComponentDoc,
	ComponentMeta,
	PartApi,
} from "@/features/components/types";
import type { DocCode } from "@/lib/highlight.server";
import { Composition } from "./composition";
import { DocsPage } from "./docs-page";
import { ExampleBlock } from "./example-block";
import { HighlightedCode } from "./highlighted-code";
import { InstallBlock } from "./install-block";
import { PageNav } from "./page-nav";
import { PropsTables } from "./props-table";
import { Section } from "./prose";
import { StageProvider } from "./stage";

interface Props {
	meta: ComponentMeta;
	doc: ComponentDoc;
	code: DocCode;
	api: PartApi[];
	sizeKb?: number;
}

/** One component's page: summary, import, live examples, props and accessibility. */
export function ComponentPage({ meta, doc, code, api, sizeKb }: Props) {
	const toc = [
		{ id: "installation", title: "Installation" },
		{ id: "usage", title: "Usage" },
		{ id: "examples", title: "Examples" },
		{ id: "api", title: "API Reference" },
		{ id: "accessibility", title: "Accessibility" },
	];
	const href = `/docs/components/${meta.slug}`;
	const { previous, next } = getNeighbours(href);
	return (
		<DocsPage toc={toc}>
			<header className="flex flex-col gap-3">
				<div className="flex items-start justify-between gap-4">
					<div className="flex items-center gap-3">
						<h1 className="font-brand text-large-title font-extrabold tracking-tight">
							{meta.name}
						</h1>
						{meta.preview ? <Badge variant="outline">Preview</Badge> : null}
					</div>
					<div className="text-footnote flex shrink-0 items-center gap-3 pt-3">
						{previous ? (
							<Link
								to={previous.href}
								aria-label={`Previous: ${previous.title}`}
								className="text-label-secondary hover:text-label no-underline"
							>
								←
							</Link>
						) : null}
						{next ? (
							<Link
								to={next.href}
								aria-label={`Next: ${next.title}`}
								className="text-label-secondary hover:text-label no-underline"
							>
								→
							</Link>
						) : null}
					</div>
				</div>
				<p className="text-callout text-label-secondary max-w-2xl">
					{meta.summary}
				</p>
				{sizeKb ? (
					<p className="text-footnote text-label-tertiary">
						About {sizeKb} KB gzip on its own, loaded only where you import it.
					</p>
				) : null}
				{meta.preview ? (
					<p className="text-footnote text-label-tertiary">
						Preview: not rebuilt on Zag yet. Its API may change.
					</p>
				) : null}
			</header>
			<Section id="installation" title="Installation">
				<InstallBlock entry={meta.entry} />
			</Section>
			<Section id="usage" title="Usage">
				<HighlightedCode html={code.install} />
				<Composition parts={api} />
			</Section>
			<Section id="examples" title="Examples">
				<StageProvider>
					{({ picker }) => (
						<div className="flex flex-col gap-10">
							<div className="flex flex-wrap items-center gap-3">
								<span className="text-footnote text-label-secondary">
									Background
								</span>
								{picker}
							</div>
							{doc.examples.map((example) => (
								<ExampleBlock
									key={example.id}
									example={example}
									code={code.examples[example.id]}
								/>
							))}
						</div>
					)}
				</StageProvider>
			</Section>
			<Section id="api" title="API Reference">
				<PropsTables parts={api} />
			</Section>
			<Section id="accessibility" title="Accessibility">
				<ul className="text-subheadline text-label-secondary flex list-disc flex-col gap-1.5 ps-5">
					{doc.accessibility.map((note) => (
						<li key={note}>{note}</li>
					))}
				</ul>
			</Section>
			<PageNav href={href} />
		</DocsPage>
	);
}
