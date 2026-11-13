import { CodeBlock } from "@passui/react/code-block";
import { Layout } from "@passui/react/layout";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getPageHead } from "@/features/seo/lib/seo";
import { templates } from "@/features/templates/content";

export const Route = createFileRoute("/(marketing)/templates")({
	head: () =>
		getPageHead(
			"/templates",
			"Templates · Passui",
			"Start a Vite or TanStack Start app with Passui already set up.",
		),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="mx-auto w-full max-w-5xl px-6 py-12">
			<Layout
				heading={
					<Layout.Heading
						title="Templates"
						description="Two starters from the Passui CLI. Each one has the stylesheet and providers in place."
					/>
				}
			>
				<div className="mt-8 grid gap-6 md:grid-cols-2">
					{templates.map((template) => (
						<section
							key={template.id}
							aria-labelledby={`template-${template.id}`}
							className="bg-elevated ring-separator/60 flex flex-col gap-4 rounded-3xl p-6 ring-1"
						>
							<h2
								id={`template-${template.id}`}
								className="text-title3 text-label m-0 font-medium"
							>
								{template.name}
							</h2>
							<p className="text-body text-label-secondary m-0">
								{template.summary}
							</p>
							<ul className="text-callout text-label-secondary m-0 flex list-none flex-col gap-1 p-0">
								{template.includes.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
							<div className="not-typeset ring-separator/60 mt-auto overflow-hidden rounded-2xl ring-1">
								<CodeBlock
									code={template.command}
									language="bash"
									lineNumbers={false}
									wrap
									copyable
								/>
							</div>
						</section>
					))}
				</div>
				<p className="text-footnote text-label-tertiary mt-6">
					Adding Passui to an existing app instead?{" "}
					<Link to="/docs/$slug" params={{ slug: "installation" }}>
						Read the installation guide
					</Link>
				</p>
			</Layout>
		</div>
	);
}
