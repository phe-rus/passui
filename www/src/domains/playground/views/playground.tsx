import type { RegisteredDocs } from "@/domains/catalog/definitions";
import { useNavigate } from "@tanstack/react-router";
import { useId, useMemo, useState } from "react";
import {
	getChangedProps,
	resolveProps,
	type PropValues,
} from "@/domains/catalog";
import { cn } from "@passui/react/cn";
import { Button } from "@passui/react/button";
import { IconButton } from "@passui/react/icon-button";
import { SegmentedControl } from "@passui/react/segmented-control";
import { Sheet } from "@passui/react/sheet";
import {
	CopyIcon,
	UndoIcon,
	SettingsIcon,
	LaptopIcon,
	SmartphoneIcon,
	TabletIcon,
} from "@passui/react/icons";
import {
	type DocsSettings,
	type PreviewViewport,
	SettingsBar,
	docsSettingsDefaults,
} from "@/domains/settings";
import { useCopyText } from "@/domains/clipboard/use-copy-text";
import { getSnippet } from "../get-snippet";
import { useFormattedCode } from "../use-formatted-code";
import { CodeView } from "./code-view";
import { ControlsPanel } from "./controls-panel";
import { PreviewFrame } from "./preview-frame";

const frameWidths: Record<PreviewViewport, string> = {
	phone: "w-[390px]",
	tablet: "w-[820px]",
	fill: "w-full",
};
const viewports = [
	{ value: "fill", label: "Full width preview", icon: LaptopIcon },
	{ value: "tablet", label: "Tablet preview", icon: TabletIcon },
	{ value: "phone", label: "Phone preview", icon: SmartphoneIcon },
] as const;

type PlaygroundProps = {
	docs: RegisteredDocs;
	settings: DocsSettings;
	rawProps: Record<string, unknown>;
};

function PlaygroundCode({
	docs,
	values,
}: {
	docs: RegisteredDocs;
	values: PropValues;
}) {
	const snippet = useFormattedCode(
		useMemo(() => getSnippet(docs, values), [docs, values]),
	);
	return <CodeView code={snippet} collapsible={false} />;
}

/** One quiet toolbar; settings and props stay available without crowding the preview. */
export function Playground({ docs, settings, rawProps }: PlaygroundProps) {
	const navigate = useNavigate({ from: "/components/react/$slug" });
	const clipboard = useCopyText();
	const optionsId = useId();
	const [view, setView] = useState<"preview" | "code">("preview");
	const [optionsOpen, setOptionsOpen] = useState(false);
	const [resetVersion, setResetVersion] = useState(0);
	const values = useMemo(() => resolveProps(docs, rawProps), [docs, rawProps]);
	const previewSettings = useMemo(
		() => ({ theme: settings.theme, accent: settings.accent, os: settings.os }),
		[settings.theme, settings.accent, settings.os],
	);
	function changeSettings(next: Partial<DocsSettings>) {
		void navigate({
			search: (previous) => ({ ...previous, ...next }),
			replace: true,
			resetScroll: false,
		});
	}
	function reset() {
		void navigate({
			search: (previous) => ({
				...previous,
				...docsSettingsDefaults,
				props: {},
			}),
			replace: true,
			resetScroll: false,
		}).then(() => setResetVersion((version) => version + 1));
	}
	return (
		<>
			<div className="ring-separator/60 min-w-0 overflow-hidden rounded-2xl ring-1">
				<div className="border-separator/60 bg-elevated flex flex-wrap items-center gap-2 border-b px-2 py-2">
					<div className="w-36 shrink-0">
						<SegmentedControl
							label="Playground view"
							value={view}
							onChange={setView}
							options={[
								{ value: "preview", label: "Preview" },
								{ value: "code", label: "Code" },
							]}
						/>
					</div>
					<div className="ms-auto flex items-center gap-1">
						<fieldset
							aria-label="Preview viewport"
							className="bg-fill/50 me-1 hidden items-center rounded-lg p-0.5 sm:flex"
						>
							{viewports.map(({ value, label, icon: Icon }) => (
								<IconButton
									key={value}
									label={label}
									size="icon-xs"
									variant="ghost"
									aria-pressed={settings.viewport === value}
									disabled={view === "code"}
									onClick={() => changeSettings({ viewport: value })}
									className={cn(
										"rounded-md",
										settings.viewport === value && "bg-elevated shadow-sm",
									)}
								>
									<Icon size={15} />
								</IconButton>
							))}
						</fieldset>
						<IconButton
							label="Preview options"
							size="icon-xs"
							variant="ghost"
							aria-haspopup="dialog"
							aria-expanded={optionsOpen}
							onClick={() => setOptionsOpen(true)}
						>
							<SettingsIcon size={16} />
						</IconButton>
						<IconButton
							label="Reset playground"
							size="icon-xs"
							variant="ghost"
							onClick={reset}
						>
							<UndoIcon size={16} />
						</IconButton>
						<IconButton
							label="Share playground"
							size="icon-xs"
							variant="ghost"
							onClick={() => {
								void clipboard.copy(
									window.location.href,
									"Playground link copied",
								);
							}}
						>
							<CopyIcon size={16} />
						</IconButton>
					</div>
				</div>
				<section
					aria-label="Live component preview"
					hidden={view !== "preview"}
					className={cn(
						"bg-background overflow-x-auto",
						view !== "preview" && "hidden",
					)}
				>
					<div
						className={cn(
							"mx-auto shrink-0 transition-[width] duration-200 motion-reduce:transition-none",
							frameWidths[settings.viewport],
							settings.viewport !== "fill" && "border-separator/60 border-x",
						)}
					>
						<PreviewFrame
							key={`${docs.slug}-${resetVersion}`}
							docs={docs}
							settings={previewSettings}
							props={values}
						/>
					</div>
				</section>
				{view === "code" && (
					<section
						aria-label="Generated example code"
						className="max-h-[60svh] overflow-auto"
					>
						<PlaygroundCode docs={docs} values={values} />
					</section>
				)}
			</div>
			<Sheet
				open={optionsOpen}
				onClose={() => setOptionsOpen(false)}
				label="Preview options"
				labelledBy={optionsId}
				className="max-w-lg"
			>
				<div className="border-separator/60 flex items-center justify-between gap-3 border-b px-4 py-3">
					<h3 id={optionsId} className="text-headline font-semibold">
						Preview options
					</h3>
					<Button
						size="xs"
						variant="secondary"
						onClick={() => setOptionsOpen(false)}
					>
						Done
					</Button>
				</div>
				<div className="min-h-0 overflow-y-auto">
					<SettingsBar settings={settings} onChange={changeSettings} />
					{Object.keys(docs.controls).length > 0 && (
						<section
							aria-label="Component props"
							className="border-separator/60 border-t"
						>
							<h4 className="text-footnote text-label-secondary px-4 pt-4 font-medium">
								Component props
							</h4>
							<ControlsPanel
								docs={docs}
								values={values}
								onChange={(key, value) => {
									void navigate({
										search: (previous) => ({
											...previous,
											props: getChangedProps(docs, {
												...values,
												[key]: value,
											}),
										}),
										replace: true,
										resetScroll: false,
									});
								}}
							/>
						</section>
					)}
				</div>
			</Sheet>
			{clipboard.fallback}
		</>
	);
}
