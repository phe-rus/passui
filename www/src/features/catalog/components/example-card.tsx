import { Button } from "@passui/react/legacy/button";
import { useNavigate } from "@tanstack/react-router";
import type { RegisteredDocs } from "@/features/catalog/data";
import { PreviewFrame } from "@/features/playground";
import type { PreviewSettings } from "@/features/settings";
import { getChangedProps, resolveProps } from "../lib/resolve-props";
import type { ExampleContent } from "../types";
import { DocSection } from "./doc-section";
import { ExampleCode } from "./example-code";

type Example = RegisteredDocs["examples"][number];

type ExampleCardProps = {
	docs: RegisteredDocs;
	example: Example;
	content: ExampleContent;
	settings: PreviewSettings;
};

/**
 * One example: its words, the live component, and its real source. Those
 * with playground values can also open in the playground above.
 */
export function ExampleCard({
	docs,
	example,
	content,
	settings,
}: ExampleCardProps) {
	const navigate = useNavigate({
		from: "/components/react/$slug",
	});
	const Demo = example.component;
	const playground = example.playground;

	function openInPlayground() {
		if (!playground) return;
		void navigate({
			search: (previous) => ({
				...previous,
				props: getChangedProps(docs, resolveProps(docs, playground)),
			}),
			replace: true,
			resetScroll: false,
		}).then(() => {
			document.getElementById("playground")?.scrollIntoView({
				behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
					? "auto"
					: "smooth",
				block: "start",
			});
		});
	}

	return (
		<DocSection
			id={`example-${example.id}`}
			title={content.title}
			description={content.description}
			level={3}
		>
			<div className="ring-separator/60 overflow-hidden rounded-4xl ring-1">
				<div className="bg-background flex min-h-40 items-center justify-center p-5">
					{docs.slug === "view-controller" ||
					docs.slug === "locale-switcher" ? (
						<div className="w-full">
							<PreviewFrame
								docs={docs}
								settings={settings}
								props={{}}
								scene="example"
								example={example.id}
							/>
						</div>
					) : (
						<Demo />
					)}
				</div>
				<div className="border-separator/60 border-t">
					<ExampleCode slug={docs.slug} id={example.id} />
				</div>
			</div>
			{playground && (
				<Button
					variant="link"
					size="sm"
					onClick={openInPlayground}
					className="self-start px-0"
				>
					Open in playground
				</Button>
			)}
		</DocSection>
	);
}
