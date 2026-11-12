import type { PartApi } from "@/features/components/types";

/** The parts of a component as a nested tree, like shadcn's composition outline. */
export function Composition({ parts }: { parts: PartApi[] }) {
	if (parts.length < 2) return null;
	const [root, ...rest] = parts;
	if (!root) return null;
	return (
		<pre className="bg-fill/50 text-footnote m-0 overflow-x-auto rounded-2xl p-4 leading-relaxed">
			{[
				root.name,
				...rest.map(
					(p, i) => `${i === rest.length - 1 ? "└─" : "├─"} ${p.name}`,
				),
			].join("\n")}
		</pre>
	);
}
