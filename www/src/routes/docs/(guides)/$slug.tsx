import { cn } from "@passui/react/cn";
import { CodeBlock } from "@passui/react/code-block";
import { ViewController } from "@passui/react/view-controller";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageNav } from "@/components/docs/page-nav";
import { getGuide } from "@/features/docs/lib/get-guides";
import {
	pageColumn,
	pageGrid,
	pageRail,
	prose,
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
			<ViewController
				key={guide.slug}
				className={pageColumn}
				heading={
					<ViewController.Heading
						title={guide.title}
						description={guide.summary}
					/>
				}
			>
				{/* Markdown, rendered once at build time: prose as HTML, code in CodeBlock. */}
				<div className={prose}>
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
								className="not-typeset ring-separator/60 mt-4 overflow-hidden rounded-3xl ring-1"
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
			</ViewController>

			<aside className={pageRail}>
				<nav
					aria-label="On this page"
					className="sticky top-24 flex flex-col gap-3"
				>
					<span className="text-footnote text-label font-semibold">
						On this page
					</span>
					<ul className="border-separator/70 m-0 flex list-none flex-col border-s p-0">
						{guide.headings.map((heading) => (
							<li key={heading.id}>
								<a
									href={`#${heading.id}`}
									aria-current={heading.id === active ? "location" : undefined}
									className={cn(
										"text-footnote -ms-px block truncate border-s-2 py-1 ps-3 no-underline transition-colors",
										heading.id === active
											? "border-accent text-label font-semibold"
											: "text-label-secondary hover:text-label border-transparent",
									)}
								>
									{heading.title}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</aside>
		</div>
	);
}
