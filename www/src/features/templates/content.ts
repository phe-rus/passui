export type Template = {
	id: "vite" | "tanstack";
	name: string;
	summary: string;
	command: string;
	includes: string[];
	/** The files `create` writes, as the CLI generates them. */
	files: string[];
};

// The two starters `@passui/cli create` generates, nothing else.
export const templates: Template[] = [
	{
		id: "vite",
		name: "Vite",
		summary:
			"A single page React app with Passui, Tailwind CSS 4 and the providers wired up.",
		command: "bunx @passui/cli@latest create my-app --template vite",
		includes: [
			"Vite and React",
			"Passui stylesheet and providers",
			"Tailwind CSS 4",
		],
		files: [
			"index.html",
			"vite.config.ts",
			"passui/providers.tsx",
			"passui/styles.css",
			"src/main.tsx",
			"src/app.tsx",
		],
	},
	{
		id: "tanstack",
		name: "TanStack Start",
		summary:
			"A full stack React app with file routes, the Passui integrations and the same providers.",
		command: "bunx @passui/cli@latest create my-app --template tanstack",
		includes: [
			"TanStack Start and Router",
			"Passui stylesheet and providers",
			"Route files with imports, Route and RouteComponent only",
		],
		files: [
			"vite.config.ts",
			"passui/providers.tsx",
			"passui/styles.css",
			"src/router.tsx",
			"src/routes/__root.tsx",
			"src/routes/index.tsx",
			"src/app.tsx",
		],
	},
];

/** What every `create` run shares, whichever starter is chosen. */
export const starterSteps = [
	{
		title: "Create",
		body: "The command writes the project and installs its dependencies.",
	},
	{
		title: "Run",
		body: "`bun run dev` starts Vite. The first screen is a Button that raises a toast.",
	},
	{
		title: "Build",
		body: "Add controls by importing from `@passui/react/<name>`. `bun run typecheck` checks the result.",
	},
] as const;

/** Flags the CLI documents for `create`. */
export const createFlags = [
	{ flag: "--no-install", note: "Write the files without installing." },
	{ flag: "--dry-run", note: "Show the planned files and change nothing." },
	{
		flag: "--pm bun|npm|pnpm|yarn",
		note: "Choose the package manager. Detected, otherwise Bun.",
	},
] as const;
