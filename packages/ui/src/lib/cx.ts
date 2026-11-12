/** Joins class names, skipping falsy values. Later classes do not override earlier ones. */
export function cx(...parts: (string | false | null | undefined)[]): string {
	return parts.filter(Boolean).join(" ");
}
