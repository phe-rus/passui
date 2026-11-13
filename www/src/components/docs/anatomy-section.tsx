import { CodeBlock } from "@passui/react/code-block";
import type { PartApi } from "@/features/catalog/types";
import { DocSection } from "./doc-section";

interface AnatomySectionProps {
	/** Public entry, the part after `@passui/react/`. */
	entry: string;
	/** The root first, then every part it nests. */
	parts: PartApi[];
	/** Part name to the part it nests in; parts left out sit under the root. */
	parents?: Record<string, string>;
}

interface TreeRow {
	part: PartApi;
	/** Guides and the branch, such as `│  ├─`. Empty for the root. */
	prefix: string;
}

/**
 * Walk the parts depth first in the order the API lists them, drawing a guide
 * for every open branch so deep trees stay readable.
 */
function buildRows(
	parts: PartApi[],
	parents: Record<string, string> = {},
): TreeRow[] {
	const [root, ...rest] = parts;
	if (!root) return [];
	const known = new Set(parts.map((part) => part.name));
	const parentOf = (part: PartApi) => {
		const parent = parents[part.name];
		return parent && known.has(parent) ? parent : root.name;
	};
	const rows: TreeRow[] = [{ part: root, prefix: "" }];
	const walk = (parent: PartApi, guides: string) => {
		const children = rest.filter((part) => parentOf(part) === parent.name);
		children.forEach((child, index) => {
			const isLast = index === children.length - 1;
			rows.push({ part: child, prefix: `${guides}${isLast ? "└─" : "├─"}` });
			walk(child, `${guides}${isLast ? "   " : "│  "}`);
		});
	};
	walk(root, "");
	return rows;
}

/**
 * The parts of a component and how they nest, drawn as a tree. Guides sit back
 * in tertiary ink so the names lead, the root is set heavier, and each part
 * says how many props it takes. Rows settle in one after another; the base
 * styles drop that motion for Reduce Motion.
 */
export function AnatomySection({ entry, parts, parents }: AnatomySectionProps) {
	const rows = buildRows(parts, parents);
	const text = rows.map(({ part, prefix }) => `${prefix} ${part.name}`.trim());
	return (
		<DocSection
			id="anatomy"
			title="Anatomy"
			description="The parts, and how they nest."
		>
			<div className="bg-elevated ring-separator/60 overflow-hidden rounded-3xl ring-1">
				<CodeBlock
					className="bg-transparent"
					code={text.join("\n")}
					title={`@passui/react/${entry}`}
					language={`${parts.length} parts`}
					lineNumbers={false}
					copyable
				>
					<pre>
						<code>
							{rows.map(({ part, prefix }, index) => (
								<span
									key={part.name}
									className="flex animate-[passui-step-in_var(--duration-slow)_var(--ease-standard)_both] items-baseline justify-between gap-4"
									style={{ animationDelay: `${index * 60}ms` }}
								>
									<span className="flex items-baseline gap-2 whitespace-pre">
										{prefix ? (
											<span
												aria-hidden="true"
												className="text-label-tertiary select-none"
											>
												{prefix}
											</span>
										) : null}
										<span
											className={
												index === 0 ? "text-label font-semibold" : "text-label"
											}
										>
											{part.name}
										</span>
									</span>
									{part.props.length ? (
										<span className="text-label-tertiary text-caption2 font-sans tabular-nums select-none">
											{part.props.length}{" "}
											{part.props.length === 1 ? "prop" : "props"}
										</span>
									) : null}
								</span>
							))}
						</code>
					</pre>
				</CodeBlock>
			</div>
		</DocSection>
	);
}
