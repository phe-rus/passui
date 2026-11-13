import { CodeBlock } from "@passui/react/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@passui/react/tabs";
import { useEffect, useState } from "react";
import { packageManagers } from "@/features/catalog/install";
import { DocSection } from "./doc-section";

const storageKey = "passui:package-manager";

interface HighlightedSource {
	html: string;
	source: string;
}

interface InstallSectionProps {
	/** Public entry, the part after `@passui/react/`. */
	entry: string;
	/** Install command per package manager, highlighted on the server. */
	installs: Record<string, HighlightedSource | undefined>;
	/** Plain import statement for copying. */
	importLine: string;
	/** The same import, highlighted on the server. */
	importHtml: string;
}

/** The reader's last package manager, kept across component pages. */
function readStored(): string | null {
	try {
		return window.localStorage.getItem(storageKey);
	} catch {
		return null;
	}
}

function writeStored(value: string) {
	try {
		window.localStorage.setItem(storageKey, value);
	} catch {
		// Private windows block storage; the choice just lasts for this page.
	}
}

/**
 * Installation as one object: a single surface holding the package manager
 * tabs and the command, then a hairline, then the import line. The tabs
 * remember the reader's package manager, the underline glides between them
 * on the spring, and each command settles in as it is selected. Reduce
 * Motion is handled by the base styles.
 */
export function InstallSection({
	entry,
	installs,
	importLine,
	importHtml,
}: InstallSectionProps) {
	const [manager, setManager] = useState<string>(packageManagers[0].id);

	useEffect(() => {
		const stored = readStored();
		if (packageManagers.some(({ id }) => id === stored) && stored) {
			setManager(stored);
		}
	}, []);

	return (
		<DocSection
			first
			id="installation"
			title="Installation"
			description={
				<>
					Add the package once, import <code>@passui/react/{entry}</code> where
					you use it.
				</>
			}
		>
			<div className="bg-elevated ring-separator/60 animate-[passui-step-in_var(--spring-smooth-duration)_var(--spring-smooth)_both] overflow-hidden rounded-3xl ring-1">
				<Tabs
					value={manager}
					onValueChange={(value) => {
						setManager(value);
						writeStored(value);
					}}
					variant="line"
					tone="accent"
					className="gap-0"
				>
					<CodeBlock
						className="bg-transparent"
						code={installs[manager]?.source ?? ""}
						language="Shell"
						lineNumbers={false}
						copyable
						header={
							<TabsList className="h-9 w-auto! self-stretch border-b-0!">
								{packageManagers.map(({ id }) => (
									<TabsTrigger key={id} value={id}>
										{id}
									</TabsTrigger>
								))}
							</TabsList>
						}
					>
						{packageManagers.map(({ id }) => (
							<TabsContent
								key={id}
								value={id}
								className="data-[state=open]:animate-[passui-step-in_var(--duration-normal)_var(--ease-standard)_both]"
							>
								<div
									dangerouslySetInnerHTML={{ __html: installs[id]?.html ?? "" }}
								/>
							</TabsContent>
						))}
					</CodeBlock>
				</Tabs>
				<div className="bg-separator/60 h-px" aria-hidden="true" />
				<div className="animate-[passui-step-in_var(--spring-smooth-duration)_var(--spring-smooth)_120ms_both]">
					<CodeBlock
						className="bg-transparent"
						code={importLine}
						title={`@passui/react/${entry}`}
						language="TypeScript JSX"
						lineNumbers={false}
						copyable
					>
						<div dangerouslySetInnerHTML={{ __html: importHtml }} />
					</CodeBlock>
				</div>
			</div>
		</DocSection>
	);
}
