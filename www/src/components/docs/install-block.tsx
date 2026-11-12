import { Tabs, TabsContent, TabsList, TabsTrigger } from "@passui/react/tabs";
import { Snippet } from "./prose";

const managers = [
	{ id: "bun", command: (pkg: string) => `bun add ${pkg}` },
	{ id: "npm", command: (pkg: string) => `npm install ${pkg}` },
	{ id: "pnpm", command: (pkg: string) => `pnpm add ${pkg}` },
	{ id: "yarn", command: (pkg: string) => `yarn add ${pkg}` },
];

/** Installation, as shadcn lays it out: package manager tabs over one command. */
export function InstallBlock({ entry }: { entry: string }) {
	return (
		<div className="flex flex-col gap-4">
			<Tabs defaultValue="bun">
				<TabsList>
					{managers.map((m) => (
						<TabsTrigger key={m.id} value={m.id}>
							{m.id}
						</TabsTrigger>
					))}
				</TabsList>
				{managers.map((m) => (
					<TabsContent key={m.id} value={m.id}>
						<Snippet code={m.command("@passui/react @passui/icons")} />
					</TabsContent>
				))}
			</Tabs>
			<p className="text-subheadline text-label-secondary">
				Then import only what you use from{" "}
				<code className="bg-fill text-footnote rounded-md px-1.5 py-0.5">
					@passui/react/{entry}
				</code>
				. Add{" "}
				<code className="bg-fill text-footnote rounded-md px-1.5 py-0.5">
					@import "@passui/react/styles.css";
				</code>{" "}
				to your stylesheet once.
			</p>
		</div>
	);
}
