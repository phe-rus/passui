export type Template = {
	id: "vite" | "tanstack";
	name: string;
	summary: string;
	command: string;
	includes: string[];
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
	},
];
