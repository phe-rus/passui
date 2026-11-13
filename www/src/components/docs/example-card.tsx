import { CodeBlock } from "@passui/react/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@passui/react/tabs";
import type { ReactNode } from "react";

interface ExampleCardProps {
	id: string;
	title: ReactNode;
	description?: ReactNode;
	/** The file name shown on the code tab. */
	fileName: string;
	/** Server highlighted HTML and plain source of the example. */
	sample?: { html: string; source: string };
	children: ReactNode;
}

/**
 * One example: its title and line, then a Preview tab with the live demo and a
 * Code tab with the real source. Tabs follow the app's accent, so the page
 * takes the chosen theme.
 */
export function ExampleCard({
	id,
	title,
	description,
	fileName,
	sample,
	children,
}: ExampleCardProps) {
	return (
		<article
			id={`example-${id}`}
			aria-labelledby={`example-${id}-title`}
			className="not-typeset flex scroll-mt-24 flex-col gap-3"
		>
			<header className="flex flex-col gap-0">
				<h3
					id={`example-${id}-title`}
					className="text-headline text-label m-0 font-medium"
				>
					<a
						href={`#example-${id}`}
						className="text-inherit no-underline hover:underline"
					>
						{title}
					</a>
				</h3>
				{description ? (
					<p className="text-footnote text-label-secondary m-0">
						{description}
					</p>
				) : null}
			</header>
			<Tabs defaultValue="preview" variant="line" tone="accent">
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					{sample ? <TabsTrigger value="code">Code</TabsTrigger> : null}
				</TabsList>
				<TabsContent value="preview">
					<div className="bg-background ring-separator/60 flex min-h-44 items-center justify-center rounded-4xl p-6 ring-1">
						{children}
					</div>
				</TabsContent>
				{sample ? (
					<TabsContent value="code">
						<div className="ring-separator/60 overflow-hidden rounded-4xl ring-1">
							<CodeBlock
								className="bg-elevated"
								code={sample.source}
								title={fileName}
								language="TypeScript JSX"
								copyable
								foldAfter={12}
							>
								{/* biome-ignore lint/security/noDangerouslySetInnerHtml: highlighted on the server from the example's own file */}
								<div dangerouslySetInnerHTML={{ __html: sample.html }} />
							</CodeBlock>
						</div>
					</TabsContent>
				) : null}
			</Tabs>
		</article>
	);
}
