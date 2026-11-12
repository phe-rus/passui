/** The package managers on every Installation block, and what each one runs. */
export const packageManagers = [
	{ id: "bun", add: "bun add" },
	{ id: "npm", add: "npm install" },
	{ id: "pnpm", add: "pnpm add" },
	{ id: "yarn", add: "yarn add" },
] as const;

export const installPackages = "@passui/react @passui/icons";

export const installCommand = (add: string) => `${add} ${installPackages}`;
