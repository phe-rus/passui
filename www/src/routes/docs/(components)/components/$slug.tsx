import { InfoIcon } from "@passui/icons/info";
import { SparkleIcon } from "@passui/icons/sparkle";
import { haptic } from "@passui/react";
import { Badge } from "@passui/react/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@passui/react/breadcrumb";
import { Button } from "@passui/react/button";
import { CodeBlock } from "@passui/react/code-block";
import { Layout } from "@passui/react/layout";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@passui/react/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@passui/react/tabs";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { use } from "react";
import { DocSection } from "@/components/docs/doc-section";
import { ExampleCard } from "@/components/docs/example-card";
import { OnThisPage } from "@/components/docs/on-this-page";
import { PageNav } from "@/components/docs/page-nav";
import { getComponentMarkdown } from "@/features/ai/lib/get-component-markdown";
import { packageManagers } from "@/features/catalog/install";
import { loadComponentPage, loadDefinition } from "@/features/catalog/load";
import { getMeta } from "@/features/catalog/registry";
import { pageColumn, pageGrid, pageRail } from "@/features/docs/lib/prose";
import { getPageHead } from "@/features/seo/lib/seo";
import { useActiveSection } from "@/hooks/use-active-section";
import { useCopyText } from "@/hooks/use-copy-text";

export const Route = createFileRoute("/docs/(components)/components/$slug")({
	loader: async ({ params }) => {
		const page = await loadComponentPage(params.slug);
		if (!page) throw notFound();
		return page;
	},
	head: ({ params }) => {
		const meta = getMeta(params.slug);
		return getPageHead(
			`/docs/components/${params.slug}`,
			`${meta?.name ?? "Not found"} · Passui`,
			meta?.summary ?? "",
		);
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { meta, code } = Route.useLoaderData();
	const { api, sizeKb } = code;
	const doc = use(loadDefinition(meta.slug));
	const copy = useCopyText();
	const outline = [
		{ id: "installation", title: "Installation", depth: 0 },
		...(api.length > 1 ? [{ id: "anatomy", title: "Anatomy", depth: 0 }] : []),
		{ id: "examples", title: "Examples", depth: 0 },
		...doc.examples.map((example) => ({
			id: `example-${example.id}`,
			title: example.title,
			depth: 1,
		})),
		{ id: "accessibility", title: "Accessibility", depth: 0 },
		{ id: "api-reference", title: "API reference", depth: 0 },
	];
	const active = useActiveSection(outline.map((item) => item.id));

	return (
		<div className={pageGrid}>
			<Layout
				key={meta.slug}
				className={pageColumn}
				heading={
					<>
						<Breadcrumb aria-label="Breadcrumb" className="not-typeset mb-2">
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink render={<Link to="/docs/components" />}>
										Components
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>{meta.name}</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
						<Layout.Heading
							title={meta.name}
							description={meta.summary}
							action={
								meta.preview ? (
									<Badge variant="outline">Preview</Badge>
								) : undefined
							}
						/>
						{sizeKb ? (
							<p className="text-footnote text-label-secondary mt-2">
								About {sizeKb} KB gzip on its own, loaded only where you import
								it.
							</p>
						) : null}
						{meta.preview ? (
							<p className="text-footnote text-label-secondary mt-1">
								Preview: not rebuilt on Zag yet. Its API may change.
							</p>
						) : null}
						<div className="not-typeset mt-3 flex flex-wrap gap-2">
							<Button
								size="sm"
								variant="secondary"
								onClick={async () => {
									const markdown = getComponentMarkdown(meta, doc, code, api);
									if (await copy(markdown, "Copied as Markdown"))
										haptic("success");
								}}
							>
								<SparkleIcon size={14} />
								Copy for AI
							</Button>
						</div>
					</>
				}
			>
				<DocSection
					first
					id="installation"
					title="Installation"
					description={
						<>
							Add the package once, import{" "}
							<code>@passui/react/{meta.entry}</code> where you use it.
						</>
					}
				>
					<Tabs
						defaultValue="bun"
						variant="line"
						tone="accent"
						className="ring-separator/60 gap-0 overflow-hidden rounded-3xl ring-1"
					>
						<TabsList className="px-4">
							{packageManagers.map(({ id }) => (
								<TabsTrigger key={id} value={id}>
									{id}
								</TabsTrigger>
							))}
						</TabsList>
						{packageManagers.map(({ id }) => (
							<TabsContent key={id} value={id}>
								<CodeBlock
									className="bg-elevated"
									code={code.installs[id]?.source ?? ""}
									title={id}
									language="Shell"
									lineNumbers={false}
									copyable
								>
									{/* biome-ignore lint/security/noDangerouslySetInnerHtml: highlighted on the server */}
									<div
										dangerouslySetInnerHTML={{
											__html: code.installs[id]?.html ?? "",
										}}
									/>
								</CodeBlock>
							</TabsContent>
						))}
					</Tabs>
					<div className="ring-separator/60 overflow-hidden rounded-3xl ring-1">
						<CodeBlock
							className="bg-elevated"
							code={code.importLine}
							title="tsx"
							language="TypeScript JSX"
							lineNumbers={code.importLine.includes("\n")}
							copyable
						>
							{/* biome-ignore lint/security/noDangerouslySetInnerHtml: highlighted on the server */}
							<div dangerouslySetInnerHTML={{ __html: code.install }} />
						</CodeBlock>
					</div>
				</DocSection>

				{api.length > 1 ? (
					<DocSection
						id="anatomy"
						title="Anatomy"
						description="The parts, and how they nest."
					>
						<div className="ring-separator/60 overflow-hidden rounded-3xl ring-1">
							<CodeBlock
								className="bg-elevated"
								lineNumbers={false}
								copyable
								code={[
									api[0]?.name,
									...api
										.slice(1)
										.map(
											(part, index, parts) =>
												`${index === parts.length - 1 ? "└─" : "├─"} ${part.name}`,
										),
								].join("\n")}
							/>
						</div>
					</DocSection>
				) : null}

				<DocSection
					id="examples"
					title="Examples"
					description="Common setups, variations and states."
				>
					<div className="flex flex-col gap-10">
						{doc.examples.map((example) => {
							const { Demo } = example;
							return (
								<ExampleCard
									key={example.id}
									id={example.id}
									title={example.title}
									description={example.description}
									fileName={`${meta.slug}-${example.id}.tsx`}
									sample={code.examples[example.id]}
								>
									<Demo />
								</ExampleCard>
							);
						})}
					</div>
				</DocSection>

				<DocSection
					id="accessibility"
					title="Accessibility"
					description="What the component does for assistive technology."
				>
					<ul className="m-0 flex list-none flex-col gap-3 p-0">
						{doc.accessibility.map((line) => (
							<li
								key={line}
								className="text-footnote text-label flex items-start gap-2"
							>
								<InfoIcon
									size={16}
									className="text-accent-text mt-0.5 shrink-0"
								/>
								<span>{line}</span>
							</li>
						))}
					</ul>
				</DocSection>

				<DocSection
					id="api-reference"
					title="API reference"
					description="Props for every part, read from the component's types."
				>
					<div className="flex flex-col gap-8">
						{api
							.filter((part) => part.props.length > 0)
							.map((part) => (
								<div key={part.name} className="text-caption">
									<h3 className="text-caption text-label m-0 font-medium">
										<code>{part.name}</code>
									</h3>
									{part.description ? (
										<p
											className="text-caption text-label-secondary m-0"
											title={part.description}
										>
											{part.description}
										</p>
									) : null}
									<Table className="ring-separator/60 text-caption mt-3 w-full table-fixed rounded-3xl text-left ring-1">
										<TableHeader className="bg-fill/50">
											<TableRow>
												<TableHead className="text-caption w-[28%] px-3 py-2">
													Prop
												</TableHead>
												<TableHead className="text-caption w-[44%] px-3 py-2">
													Type
												</TableHead>
												<TableHead className="text-caption w-[28%] px-3 py-2">
													Default
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{part.props.map((prop) => (
												<TableRow
													key={prop.name}
													className="border-separator/60 border-t align-top"
												>
													<TableCell
														className="text-caption truncate px-3 py-2 font-mono font-medium"
														title={prop.description || prop.name}
													>
														{prop.name}
														{prop.required ? (
															<span className="text-danger ms-1">*</span>
														) : null}
													</TableCell>
													<TableCell
														className="text-caption truncate px-3 py-2 font-mono"
														title={prop.type}
													>
														{prop.type}
													</TableCell>
													<TableCell
														className="text-caption truncate px-3 py-2 font-mono"
														title={prop.default}
													>
														{prop.default ?? "–"}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							))}
					</div>
				</DocSection>

				<PageNav href={`/docs/components/${meta.slug}`} />
			</Layout>

			<aside className={pageRail}>
				<OnThisPage items={outline} active={active} />
			</aside>
		</div>
	);
}
