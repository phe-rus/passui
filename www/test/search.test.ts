import { describe, expect, test } from "vitest";
import {
	componentSearchSchema,
	docsSettingsSchema,
	previewSearchSchema,
} from "@/features/settings/types";

describe("search params", () => {
	test("a bare address gets every default", () => {
		expect(docsSettingsSchema.parse({})).toEqual({
			theme: "system",
			accent: "blush",
			os: "auto",
			viewport: "fill",
		});
	});

	test("valid values are kept", () => {
		expect(
			docsSettingsSchema.parse({
				theme: "dark",
				accent: "ocean",
				os: "android",
				viewport: "phone",
			}),
		).toEqual({
			theme: "dark",
			accent: "ocean",
			os: "android",
			viewport: "phone",
		});
	});

	test("each bad value falls back on its own, without an error", () => {
		expect(
			docsSettingsSchema.parse({
				theme: "purple",
				accent: "ocean",
				os: 42,
				viewport: "watch",
			}),
		).toEqual({
			theme: "system",
			accent: "ocean",
			os: "auto",
			viewport: "fill",
		});
	});

	test("props that aren't an object fall back to none", () => {
		expect(componentSearchSchema.parse({ props: "oops" }).props).toEqual({});
		expect(
			componentSearchSchema.parse({
				props: { size: "lg" },
			}).props,
		).toEqual({ size: "lg" });
	});

	test("the preview page falls back the same way", () => {
		const parsed = previewSearchSchema.parse({
			theme: "nope",
			scene: "elsewhere",
		});
		expect(parsed.theme).toBe("system");
		expect(parsed.scene).toBe("component");
	});
});

test("isolated usage and example scenes keep their identity separate from playground props", () => {
	expect(previewSearchSchema.parse({ scene: "usage" }).scene).toBe("usage");
	expect(
		previewSearchSchema.parse({ scene: "example", example: "settings" }),
	).toMatchObject({
		scene: "example",
		example: "settings",
		props: {},
	});
	expect(
		previewSearchSchema.parse({ scene: "unknown", example: 42 }),
	).toMatchObject({
		scene: "component",
		example: "",
	});
});
