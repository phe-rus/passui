import type { AnyControl, RegisteredDocs } from "@/features/catalog/data";

export type ControlValue = string | boolean | number;
export type PropValues = Record<string, ControlValue>;

function isValid(control: AnyControl, value: unknown) {
	switch (control.kind) {
		case "select":
			return typeof value === "string" && Object.hasOwn(control.options, value);
		case "boolean":
			return typeof value === "boolean";
		case "number":
			return (
				typeof value === "number" &&
				Number.isFinite(value) &&
				(control.min === undefined || value >= control.min) &&
				(control.max === undefined || value <= control.max)
			);
		case "text":
			return typeof value === "string";
	}
}

/**
 * Keeps each valid value from a URL and falls back to the default for
 * anything missing, unknown or wrong, one key at a time (contract item 8).
 */
export function resolveProps(
	docs: RegisteredDocs,
	raw: Record<string, unknown>,
): PropValues {
	const values: PropValues = {};
	for (const [key, control] of Object.entries(docs.controls)) {
		if (!control) continue;
		const value = raw[key];
		values[key] = isValid(control, value)
			? (value as ControlValue)
			: control.default;
	}
	return values;
}

/** Only the values that differ from their defaults, for clean URLs. */
export function getChangedProps(
	docs: RegisteredDocs,
	values: PropValues,
): PropValues {
	const changed: PropValues = {};
	for (const [key, control] of Object.entries(docs.controls)) {
		if (control && key in values && values[key] !== control.default)
			changed[key] = values[key];
	}
	return changed;
}
