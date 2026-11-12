import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@passui/react/table";
import type { DocCode, PropRow, UiDoc } from "../types";
import { HighlightedCode } from "./highlighted-code";

function PropsTable({ rows }: { rows: PropRow[] }) {
	return (
		<div className="ring-separator overflow-x-auto rounded-xl ring-1">
			<Table className="w-full min-w-120 border-collapse text-left">
				<TableHeader className="bg-fill/50">
					<TableRow>
						<TableHead className="px-3 py-2">Prop</TableHead>
						<TableHead className="px-3 py-2">Type</TableHead>
						<TableHead className="px-3 py-2">Default</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.name}
							className="border-separator border-t align-top"
						>
							<TableCell className="px-3 py-2 whitespace-normal">
								<code className="text-accent-text">{row.name}</code>
								<p className="text-label-secondary mt-1">{row.description}</p>
							</TableCell>
							<TableCell className="px-3 py-2 whitespace-normal">
								<code className="break-words">{row.type}</code>
							</TableCell>
							<TableCell className="px-3 py-2">
								{row.default ? <code>{row.default}</code> : "–"}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

/**
 * One docs page: live examples rendered directly (no iframe), with the exact
 * source highlighted on the server, then the parts and accessibility notes.
 */
export function UiDocPage({ doc, code }: { doc: UiDoc; code: DocCode }) {
	return (
		<article className="flex min-w-0 flex-col gap-8">
			<header className="flex flex-col gap-3">
				<h1 className="font-brand text-large-title font-extrabold tracking-tight">
					{doc.name}
				</h1>
				<p className="text-callout text-label-secondary max-w-2xl">
					{doc.summary}
				</p>
				<p className="text-footnote text-label-tertiary">
					About {doc.sizeKb} KB gzip on its own, loaded only where you import
					it.
				</p>
			</header>

			<section aria-labelledby="installation" className="flex flex-col gap-3">
				<h2 id="installation" className="text-title3 font-semibold">
					Import
				</h2>
				<HighlightedCode html={code.install} />
			</section>

			<section aria-labelledby="examples" className="flex flex-col gap-6">
				<h2 id="examples" className="text-title3 font-semibold">
					Examples
				</h2>
				{doc.examples.map(({ id, title, description, Demo }) => (
					<div key={id} className="flex flex-col gap-3">
						<h3 id={`example-${id}`} className="text-headline font-semibold">
							{title}
						</h3>
						<p className="text-subheadline text-label-secondary">
							{description}
						</p>
						<div className="bg-background ring-separator flex min-h-32 items-center justify-center rounded-2xl p-6 ring-1">
							<Demo />
						</div>
						<HighlightedCode html={code.examples[id] ?? ""} />
					</div>
				))}
			</section>

			<section aria-labelledby="api" className="flex flex-col gap-4">
				<h2 id="api" className="text-title3 font-semibold">
					API
				</h2>
				{doc.parts.map((part) => (
					<div key={part.name} className="flex flex-col gap-2">
						<h3 className="text-headline font-semibold">
							<code>{part.name}</code>
						</h3>
						<p className="text-subheadline text-label-secondary">
							{part.description}
						</p>
						{part.props ? <PropsTable rows={part.props} /> : null}
					</div>
				))}
			</section>

			<section aria-labelledby="accessibility" className="flex flex-col gap-3">
				<h2 id="accessibility" className="text-title3 font-semibold">
					Accessibility
				</h2>
				<ul className="text-subheadline text-label-secondary flex list-disc flex-col gap-1.5 ps-5">
					{doc.accessibility.map((note) => (
						<li key={note}>{note}</li>
					))}
				</ul>
			</section>
		</article>
	);
}
