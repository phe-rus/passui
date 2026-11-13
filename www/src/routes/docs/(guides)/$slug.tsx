import { CodeBlock } from "@passui/react/code-block";
import { Layout } from "@passui/react/layout";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { OnThisPage } from "@/components/docs/on-this-page";
import { PageNav } from "@/components/docs/page-nav";
import { getGuide } from "@/features/docs/lib/get-guides";
import {
	guideProse,
	pageColumn,
	pageGrid,
	pageRail,
} from "@/features/docs/lib/prose";
import { getPageHead } from "@/features/seo/lib/seo";
import { useActiveSection } from "@/hooks/use-active-section";

export const Route = createFileRoute("/docs/(guides)/$slug")({
	loader: ({ params }) => {
		const guide = getGuide(params.slug);
		if (!guide) throw notFound();
		return guide;
	},
	head: ({ params }) => {
		const guide = getGuide(params.slug);
		return getPageHead(
			`/docs/${params.slug}`,
			`${guide?.title ?? "Not found"} · Passui`,
			guide?.summary ?? "",
		);
	},
	component: RouteComponent,
});

function RouteComponent() {
	const guide = Route.useLoaderData();
	const active = useActiveSection(guide.headings.map((heading) => heading.id));

	return (
		<div className={pageGrid}>
			<Layout
				key={guide.slug}
				className={pageColumn}
				heading={
					<Layout.Heading title={guide.title} description={guide.summary} />
				}
			>
				{/* Markdown, rendered once at build time: prose as HTML, code in CodeBlock. */}
				<div className={guideProse}>
					{guide.blocks.map((block, index) =>
						block.type === "html" ? (
							<div
								// biome-ignore lint/suspicious/noArrayIndexKey: a fixed, build time list
								key={index}
								dangerouslySetInnerHTML={{ __html: block.html }}
							/>
						) : (
							<div
								// biome-ignore lint/suspicious/noArrayIndexKey: a fixed, build time list
								key={index}
								className="not-typeset ring-separator/60 mt-3 overflow-hidden rounded-3xl ring-1"
							>
								<CodeBlock
									className="bg-elevated"
									code={block.code}
									language={block.language}
									lineNumbers={block.code.includes("\n")}
									copyable
								>
									<div dangerouslySetInnerHTML={{ __html: block.html }} />
								</CodeBlock>
							</div>
						),
					)}
				</div>
				<PageNav href={guide.path} />
			</Layout>

			<aside className={pageRail}>
				<OnThisPage
					items={guide.headings.map((heading) => ({
						id: heading.id,
						title: heading.title,
					}))}
					active={active}
				/>
			</aside>
		</div>
	);
}
