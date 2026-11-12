import { SwatchPicker } from "@passui/react";
import { Button } from "@passui/react/legacy/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@passui/react/table";
import { toast } from "@passui/react/toast";
import { Toggle } from "@passui/react/toggle";
import {
	type AccentId,
	accents,
	dark,
	light,
	radius,
} from "@passui/react/tokens";
import { type CSSProperties, useState } from "react";
import { DocSection } from "@/features/catalog/components/doc-section";
import type { TocItem } from "@/features/catalog/components/on-this-page";
import { Code, CodeBlock, Prose } from "./guide-parts";

export const themingSections: TocItem[] = [
	{ id: "appearance", title: "Light and dark" },
	{ id: "accents", title: "Accents" },
	{ id: "platforms", title: "Platform looks" },
	{ id: "roles", title: "Color roles" },
	{ id: "corners", title: "Corners" },
];

/** labelSecondary → label-secondary, as the Tailwind classes name it. */
const kebab = (name: string) =>
	name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

/** A small settings card, used to show a theme or an accent. */
function SampleCard({ title }: { title: string }) {
	const [on, setOn] = useState(true);
	return (
		<div className="bg-elevated text-label ring-separator/60 flex flex-col gap-3 rounded-4xl p-5 shadow-sm ring-1">
			<span className="text-headline font-semibold">{title}</span>
			<Toggle label="Sync across devices" checked={on} onChange={setOn} />
			<Button
				variant="accent"
				size="sm"
				className="self-start"
				onClick={() => toast.success("Settings saved (demo)")}
			>
				Save
			</Button>
		</div>
	);
}

function AccentPreview() {
	const [chosen, setChosen] = useState<AccentId>("ocean");
	const colors = accents[chosen].light;
	// the four accent roles, set on this card alone
	const style = {
		"--color-accent": colors.accent,
		"--color-on-accent": colors.onAccent,
		"--color-accent-text": colors.accentText,
		"--color-accent-soft": colors.accentSoft,
	} as CSSProperties;

	return (
		<div className="grid gap-5 md:grid-cols-[1fr_16rem]">
			<SwatchPicker
				label="Accent color"
				value={chosen}
				onChange={setChosen}
				options={Object.values(accents).map((accent) => ({
					value: accent.id,
					label: accent.name,
					color: accent.swatch,
					ink: accent.light.accentText,
				}))}
			/>
			<div data-theme="light" style={style}>
				<SampleCard title={accents[chosen].name} />
			</div>
		</div>
	);
}

export function ThemingGuide() {
	const roles = Object.keys(light) as (keyof typeof light)[];

	return (
		<>
			<DocSection
				id="appearance"
				title="Light and dark"
				description="Every color is a role with a light and a dark value, so nothing needs a dark: variant."
			>
				<Prose>
					<Code>ThemeProvider</Code> sets <Code>data-theme</Code> on the root
					from the person's choice or the system. Like SwiftUI's{" "}
					<Code>colorScheme</Code>, <Code>data-theme</Code> also works on any
					element, so one surface can keep its own appearance.
				</Prose>
				<div className="grid gap-4 sm:grid-cols-2">
					<div data-theme="light" className="rounded-5xl bg-background p-4">
						<SampleCard title="Light" />
					</div>
					<div data-theme="dark" className="rounded-5xl bg-background p-4">
						<SampleCard title="Dark" />
					</div>
				</div>
				<CodeBlock
					code={`<section data-theme="dark" className="bg-background">
    {/* always dark, whatever the app's appearance */}
</section>`}
				/>
			</DocSection>

			<DocSection
				id="accents"
				title="Accents"
				description="Seven accents, each setting accent, on-accent, accent-text and accent-soft. Blush is the default."
			>
				<AccentPreview />
				<Prose>Set the accent on the root, and every control follows it.</Prose>
				<CodeBlock code={`<html data-accent="ocean">`} />
			</DocSection>

			<DocSection
				id="platforms"
				title="Platform looks"
				description="Apple platforms get glass; Android keeps the solid bars people expect there."
			>
				<Prose>
					<Code>PlatformScript</Code> sets <Code>data-os</Code> before the first
					paint. The <Code>ios:</Code>, <Code>android:</Code>,{" "}
					<Code>macos:</Code>, <Code>windows:</Code> and <Code>linux:</Code>{" "}
					variants then style for one platform. Try each in the playground's
					settings on any component page.
				</Prose>
				<CodeBlock
					code={`<nav className="glass android:bg-elevated android:shadow-none">
    {/* glass on Apple platforms, a solid bar on Android */}
</nav>`}
				/>
			</DocSection>

			<DocSection
				id="roles"
				title="Color roles"
				description="Use the role, never the hex value. Each is a Tailwind color: bg-elevated, text-label-secondary, border-separator."
			>
				<div className="ring-separator/60 overflow-x-auto rounded-4xl ring-1">
					<Table className="text-subheadline w-full text-start">
						<TableHeader>
							<TableRow className="border-separator/60 text-footnote text-label-secondary border-b">
								<TableHead className="p-3 text-start font-semibold">
									Role
								</TableHead>
								<TableHead className="p-3 text-start font-semibold">
									Light
								</TableHead>
								<TableHead className="p-3 text-start font-semibold">
									Dark
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{roles.map((role) => (
								<TableRow
									key={role}
									className="border-separator/60 border-b last:border-0"
								>
									<TableCell className="p-3 whitespace-normal">
										<Code>{kebab(role)}</Code>
									</TableCell>
									{[light[role], dark[role]].map((value, index) => (
										<TableCell key={index} className="p-3">
											<span className="text-caption text-label-secondary flex items-center gap-2 font-mono">
												<span
													className="ring-separator/60 size-5 shrink-0 rounded-md ring-1"
													style={{
														background: value,
													}}
												/>
												{value}
											</span>
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</DocSection>

			<DocSection
				id="corners"
				title="Corners"
				description="Steps of 2 px while small and 4 px beyond. Keep nested corners concentric: inner radius is the outer radius minus the padding between them."
			>
				<div className="flex flex-wrap gap-4">
					{Object.entries(radius)
						.filter(([name]) => name !== "full")
						.map(([name, value]) => (
							<div key={name} className="flex flex-col items-center gap-2">
								<span
									className="bg-accent-soft ring-accent-text/30 size-16 ring-1"
									style={{
										borderRadius: value,
									}}
								/>
								<span className="text-caption text-label-secondary font-mono">
									rounded-{name} · {value}
								</span>
							</div>
						))}
				</div>
			</DocSection>
		</>
	);
}
