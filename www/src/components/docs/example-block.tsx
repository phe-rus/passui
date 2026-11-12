import { Tabs, TabsContent, TabsList, TabsTrigger } from "@passui/react/tabs";
import type { ExampleDoc } from "@/features/components/types";
import { HighlightedCode } from "./highlighted-code";

/** A live example with its exact source, as shadcn shows them: Preview and Code tabs. */
export function ExampleBlock({
	example,
	code,
}: {
	example: ExampleDoc;
	code?: { html: string; source: string };
}) {
	const { id, title, description, Demo } = example;
	return (
		<div className="flex flex-col gap-3">
			<h3
				id={`example-${id}`}
				className="text-headline scroll-mt-24 font-semibold"
			>
				{title}
			</h3>
			<p className="text-subheadline text-label-secondary">{description}</p>
			<Tabs defaultValue="preview">
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
				<TabsContent value="preview">
					<div className="bg-background ring-separator flex min-h-40 items-center justify-center rounded-2xl p-6 ring-1">
						<Demo />
					</div>
				</TabsContent>
				<TabsContent value="code">
					{code ? (
						<HighlightedCode html={code.html} source={code.source} />
					) : null}
				</TabsContent>
			</Tabs>
		</div>
	);
}
