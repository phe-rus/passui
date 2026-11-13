import { CheckIcon } from "@passui/icons/check";
import { CodeBlock } from "@passui/react/code-block";
import { Layout } from "@passui/react/layout";
import { Text } from "@passui/react/text";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getPageHead } from "@/features/seo/lib/seo";
import {
	createFlags,
	starterSteps,
	templates,
} from "@/features/templates/content";

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
				<div className="mt-8 grid items-stretch gap-6 md:grid-cols-2">
					{templates.map((template) => (
						<section
							key={template.id}
							aria-labelledby={`template-${template.id}`}
							className="bg-elevated ring-separator/60 flex flex-col gap-5 rounded-3xl p-6 ring-1"
						>
							<header className="flex flex-col gap-1">
								<h2
									id={`template-${template.id}`}
									className="text-title3 text-label m-0 font-medium"
								>
									{template.name}
								</h2>
								<Text size="callout" tone="secondary">
									{template.summary}
								</Text>
							</header>
							<ul className="m-0 flex list-none flex-col gap-2 p-0">
								{template.includes.map((item) => (
									<li
										key={item}
										className="text-callout text-label flex items-start gap-2"
									>
										<CheckIcon
											size={16}
											aria-hidden
											className="text-accent-text mt-0.5 shrink-0"
										/>
										{item}
									</li>
								))}
							</ul>
							<div className="flex flex-col gap-2">
								<Text as="h3" size="footnote" weight="semibold">
									Files it writes
								</Text>
								<ul
									aria-label={`${template.name} files`}
									className="bg-fill/50 text-footnote text-label-secondary m-0 flex list-none flex-col gap-1 rounded-2xl px-4 py-3 font-mono"
								>
									{template.files.map((file) => (
										<li key={file} className="truncate">
											{file}
										</li>
									))}
								</ul>
							</div>
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

				<h2 className="text-title3 text-label mt-12 mb-3 font-medium">
					After the command
				</h2>
				<ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
					{starterSteps.map((step, index) => (
						<li
							key={step.title}
							className="bg-fill/40 flex flex-col gap-1 rounded-2xl p-4"
						>
							<Text as="h3" size="subheadline" weight="semibold">
								{index + 1}. {step.title}
							</Text>
							<Text size="footnote" tone="secondary">
								{step.body.split("`").map((part, i) =>
									i % 2 ? (
										<code key={i} className="font-mono">
											{part}
										</code>
									) : (
										part
									),
								)}
							</Text>
						</li>
					))}
				</ol>

				<h2 className="text-title3 text-label mt-12 mb-3 font-medium">
					Options for create
				</h2>
				<dl className="ring-separator/60 m-0 divide-y overflow-hidden rounded-2xl ring-1">
					{createFlags.map(({ flag, note }) => (
						<div
							key={flag}
							className="divide-separator/60 flex flex-wrap items-baseline gap-x-6 gap-y-1 px-4 py-3"
						>
							<dt className="text-footnote text-label min-w-48 font-mono">
								{flag}
							</dt>
							<dd className="text-footnote text-label-secondary m-0">{note}</dd>
						</div>
					))}
				</dl>

				<p className="text-footnote text-label-tertiary mt-8">
					Adding Passui to an existing app instead?{" "}
					<Link to="/docs/$slug" params={{ slug: "installation" }}>
						Read the installation guide
					</Link>
				</p>
			</Layout>
		</div>
	);
}
