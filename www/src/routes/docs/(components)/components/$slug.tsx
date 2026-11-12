import { InfoIcon } from "@passui/icons/info";
import { SparkleIcon } from "@passui/icons/sparkle";
import { haptic } from "@passui/react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@passui/react/accordion";
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
import { cn } from "@passui/react/cn";
import { CodeBlock } from "@passui/react/code-block";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@passui/react/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@passui/react/tabs";
import { ViewController } from "@passui/react/view-controller";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { use } from "react";
import { PageNav } from "@/components/docs/page-nav";
import { getComponentMarkdown } from "@/features/ai/lib/get-component-markdown";
import { packageManagers } from "@/features/catalog/install";
import {
	loadComponentPage,
	loadDefinition,
	readDefinition,
} from "@/features/catalog/load";
import { getMeta } from "@/features/catalog/registry";
import {
	pageColumn,
	pageGrid,
	pageRail,
	prose,
} from "@/features/docs/lib/prose";
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
	const doc = readDefinition(meta.slug) ?? use(loadDefinition(meta.slug));
	const copy = useCopyText();
	const outline = [
		{ id: "installation", title: "Installation", depth: 0 },
		{ id: "usage", title: "Usage", depth: 0 },
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
			<ViewController
				key={meta.slug}
				className={`${pageColumn} gap-0`}
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
						<ViewController.Heading
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
				<section
					id="installation"
					aria-labelledby="installation-title"
					className={`${prose} scroll-mt-24`}
				>
					<Accordion>
						<AccordionItem value="installation">
							<AccordionTrigger id="installation-title">
								Installation
							</AccordionTrigger>
							<AccordionContent>
								<Tabs
									defaultValue="bun"
									variant="line"
									className="not-typeset ring-separator/60 gap-0 overflow-hidden rounded-3xl ring-1"
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
											<div className="not-typeset">
												<CodeBlock
													className="bg-elevated"
													code={code.installs[id]?.source ?? ""}
													title={id}
													language="Shell"
													lineNumbers={false}
													copyable
												>
													<div
														dangerouslySetInnerHTML={{
															__html: code.installs[id]?.html ?? "",
														}}
													/>
												</CodeBlock>
											</div>
										</TabsContent>
									))}
								</Tabs>
								<p>
									Then import only what you use from{" "}
									<code>@passui/react/{meta.entry}</code>. Add{" "}
									<code>@import "@passui/react/styles.css";</code> to your
									stylesheet once.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</section>

				<section
					id="usage"
					aria-labelledby="usage-title"
					className={`${prose} scroll-mt-24`}
				>
					<h2 id="usage-title">Usage</h2>
					<div className="not-typeset ring-separator/60 overflow-hidden rounded-3xl ring-1">
						<CodeBlock
							className="bg-elevated"
							code={code.importLine}
							title="tsx"
							language="TypeScript JSX"
							lineNumbers={code.importLine.includes("\n")}
							copyable
						>
							<div dangerouslySetInnerHTML={{ __html: code.install }} />
						</CodeBlock>
					</div>
				</section>

				{api.length > 1 ? (
					<section
						id="anatomy"
						aria-labelledby="anatomy-title"
						className={`${prose} scroll-mt-24`}
					>
						<Accordion>
							<AccordionItem value="anatomy">
								<AccordionTrigger id="anatomy-title">Anatomy</AccordionTrigger>
								<AccordionContent>
									<div className="not-typeset ring-separator/60 overflow-hidden rounded-3xl ring-1">
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
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</section>
				) : null}

				<section
					id="examples"
					aria-labelledby="examples-title"
					className={`${prose} scroll-mt-24`}
				>
					<h2 id="examples-title">Examples</h2>
					<p>Common setups, variations and states.</p>
					{doc.examples.map((example) => {
						const sample = code.examples[example.id];
						const { Demo } = example;
						return (
							<section
								key={example.id}
								id={`example-${example.id}`}
								aria-labelledby={`example-${example.id}-title`}
								className={`${prose} scroll-mt-24`}
							>
								<h3 id={`example-${example.id}-title`}>
									<a
										href={`#example-${example.id}`}
										className="text-inherit no-underline hover:underline"
									>
										{example.title}
									</a>
								</h3>
								<p>{example.description}</p>
								<div className="not-typeset ring-separator/60 mt-3 overflow-hidden rounded-4xl ring-1">
									<div className="bg-background flex min-h-40 items-center justify-center p-5">
										<Demo />
									</div>
									{sample ? (
										<div className="border-separator/60 border-t">
											<CodeBlock
												className="bg-elevated"
												code={sample.source}
												title={`${meta.slug}-${example.id}.tsx`}
												language="TypeScript JSX"
												copyable
												foldAfter={6}
											>
												<div
													dangerouslySetInnerHTML={{ __html: sample.html }}
												/>
											</CodeBlock>
										</div>
									) : null}
								</div>
							</section>
						);
					})}
				</section>

				<section
					id="accessibility"
					aria-labelledby="accessibility-title"
					className={`${prose} scroll-mt-24`}
				>
					<Accordion>
						<AccordionItem value="accessibility">
							<AccordionTrigger id="accessibility-title">
								Accessibility
							</AccordionTrigger>
							<AccordionContent>
								<ul className="not-typeset m-0 flex list-none flex-col gap-4 p-0">
									{doc.accessibility.map((line) => (
										<li key={line} className="flex items-start gap-2">
											<InfoIcon size={18} className="mt-0.5 shrink-0" />
											<span>{line}</span>
										</li>
									))}
								</ul>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</section>

				<section
					id="api-reference"
					aria-labelledby="api-reference-title"
					className={`${prose} scroll-mt-24`}
				>
					<h2 id="api-reference-title">API reference</h2>
					{api
						.filter((part) => part.props.length > 0)
						.map((part) => (
							<div key={part.name}>
								<h3>
									<code>{part.name}</code>
								</h3>
								{part.description ? (
									<p className="line-clamp-1" title={part.description}>
										{part.description}
									</p>
								) : null}
								<div className="not-typeset ring-separator/60 mt-3 overflow-hidden rounded-3xl ring-1">
									<Table className="w-full table-fixed border-collapse text-left">
										<TableHeader className="bg-fill/50">
											<TableRow>
												<TableHead className="w-[28%] px-3 py-2">
													Prop
												</TableHead>
												<TableHead className="w-[44%] px-3 py-2">
													Type
												</TableHead>
												<TableHead className="w-[28%] px-3 py-2">
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
														className="truncate px-3 py-2 font-mono font-semibold"
														title={prop.description || prop.name}
													>
														{prop.name}
														{prop.required ? (
															<span className="text-danger ms-1">*</span>
														) : null}
													</TableCell>
													<TableCell
														className="truncate px-3 py-2 font-mono"
														title={prop.type}
													>
														{prop.type}
													</TableCell>
													<TableCell
														className="truncate px-3 py-2 font-mono"
														title={prop.default}
													>
														{prop.default ?? "–"}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</div>
						))}
				</section>

				<PageNav href={`/docs/components/${meta.slug}`} />
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
						{outline.map((item) => (
							<li key={item.id}>
								<a
									href={`#${item.id}`}
									aria-current={item.id === active ? "location" : undefined}
									className={cn(
										"text-footnote -ms-px block truncate border-s-2 py-1 no-underline transition-colors",
										item.depth === 0 ? "ps-3" : "ps-6",
										item.id === active
											? "border-accent text-label font-semibold"
											: "text-label-secondary hover:text-label border-transparent",
									)}
								>
									{item.title}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</aside>
		</div>
	);
}
