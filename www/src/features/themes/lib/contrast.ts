import { type AccentColors, accents, colors } from "@passui/react/tokens";

function channel(value: number) {
	const c = value / 255;
	return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
	const n = Number.parseInt(hex.replace("#", "").slice(0, 6), 16);
	return (
		0.2126 * channel((n >> 16) & 255) +
		0.7152 * channel((n >> 8) & 255) +
		0.0722 * channel(n & 255)
	);
}

/** WCAG relative luminance contrast between two hex colors. */
export function contrast(a: string, b: string) {
	const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
	return (hi + 0.05) / (lo + 0.05);
}

export type Scheme = "light" | "dark";

export interface RoleSpec {
	role: keyof AccentColors;
	/** What the role is for, in the words the docs use. */
	meaning: string;
	/** What it is measured against, when a ratio means something. */
	against?: { label: string; minimum: number };
}

export const roleSpecs: RoleSpec[] = [
	{
		role: "accent",
		meaning: "Fills for controls, such as a selected switch or a button.",
	},
	{
		role: "onAccent",
		meaning: "Text and icons placed on an accent fill.",
		against: { label: "accent", minimum: 4.5 },
	},
	{
		role: "accentText",
		meaning: "Accent colored text and icons on neutral grounds.",
		against: { label: "window", minimum: 4.5 },
	},
	{
		role: "accentSoft",
		meaning: "A quiet tint behind accent content and in the window ground.",
	},
];

/** The ratio a role earns in a scheme, with the bar it should clear. */
export function measureRole(
	accentId: keyof typeof accents,
	scheme: Scheme,
	spec: RoleSpec,
) {
	if (!spec.against) return null;
	const values = accents[accentId][scheme];
	const ground = colors[scheme].background;
	const other = spec.against.label === "accent" ? values.accent : ground;
	const ratio = contrast(values[spec.role], other);
	return { ratio, passes: ratio >= spec.against.minimum, ...spec.against };
}
