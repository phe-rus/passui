import { Badge } from "@passui/react/badge";
import type {
	ComponentDoc,
	ComponentMeta,
	PartApi,
} from "@/features/components/types";
import type { DocCode } from "@/lib/highlight.server";
import { ExampleBlock } from "./example-block";
import { HighlightedCode } from "./highlighted-code";
import { OnThisPage } from "./on-this-page";
import { PageNav } from "./page-nav";
import { PropsTables } from "./props-table";
import { Section } from "./prose";

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
		{ id: "import", title: "Import" },
		{ id: "examples", title: "Examples" },
		{ id: "api", title: "API" },
		{ id: "accessibility", title: "Accessibility" },
	];
	return (
		<div className="flex gap-10">
			<article className="flex min-w-0 flex-1 flex-col gap-10">
				<header className="flex flex-col gap-3">
					<div className="flex items-center gap-3">
						<h1 className="font-brand text-large-title font-extrabold tracking-tight">
							{meta.name}
						</h1>
						{meta.preview ? <Badge variant="outline">Preview</Badge> : null}
					</div>
					<p className="text-callout text-label-secondary max-w-2xl">
						{meta.summary}
					</p>
					{sizeKb ? (
						<p className="text-footnote text-label-tertiary">
							About {sizeKb} KB gzip on its own, loaded only where you import
							it.
						</p>
					) : null}
					{meta.preview ? (
						<p className="text-footnote text-label-tertiary">
							Preview: this one has not been rebuilt on Zag yet. Its API may
							change.
						</p>
					) : null}
				</header>
				<Section id="import" title="Import">
					<HighlightedCode html={code.install} />
				</Section>
				<Section id="examples" title="Examples">
					<div className="flex flex-col gap-8">
						{doc.examples.map((example) => (
							<ExampleBlock
								key={example.id}
								example={example}
								code={code.examples[example.id]}
							/>
						))}
					</div>
				</Section>
				<Section id="api" title="API">
					<PropsTables parts={api} />
				</Section>
				<Section id="accessibility" title="Accessibility">
					<ul className="text-subheadline text-label-secondary flex list-disc flex-col gap-1.5 ps-5">
						{doc.accessibility.map((note) => (
							<li key={note}>{note}</li>
						))}
					</ul>
				</Section>
				<PageNav href={`/docs/components/${meta.slug}`} />
			</article>
			<aside className="sticky top-24 hidden h-fit w-44 shrink-0 xl:block">
				<OnThisPage items={toc} />
			</aside>
		</div>
	);
}
