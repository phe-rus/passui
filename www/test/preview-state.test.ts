import { describe, expect, test } from "vitest";
import {
	applyDocumentAttributes,
	getDocumentAttributes,
} from "@/domains/preview/get-document-attributes";
import {
	frameMessageSchema,
	parentMessageSchema,
} from "@/domains/preview/types";
import { settingsDefaults } from "@/domains/settings";

describe("preview messages", () => {
	test("accepts handshakes and bounded finite content sizes", () => {
		expect(frameMessageSchema.safeParse({ type: "passui:ready" }).success).toBe(
			true,
		);
		for (const height of [0, 160, 440, 10000])
			expect(
				frameMessageSchema.safeParse({ type: "passui:size", height }).success,
			).toBe(true);
		for (const height of [
			-1,
			10001,
			Number.NaN,
			Number.POSITIVE_INFINITY,
			"440",
		])
			expect(
				frameMessageSchema.safeParse({ type: "passui:size", height }).success,
			).toBe(false);
		expect(frameMessageSchema.safeParse({ type: "unknown" }).success).toBe(
			false,
		);
	});

	test("normalizes settings individually without accepting invalid prop payloads", () => {
		const parsed = parentMessageSchema.parse({
			type: "passui:state",
			settings: { theme: "invalid", accent: "ocean", os: "android" },
			props: { label: "Hello", disabled: true },
		});
		expect(parsed).toEqual({
			type: "passui:state",
			settings: { theme: "system", accent: "ocean", os: "android" },
			props: { label: "Hello", disabled: true },
		});
		expect(
			parentMessageSchema.safeParse({
				type: "passui:state",
				settings: {},
				props: [],
			}).success,
		).toBe(false);
	});
});

test("preview document settings restore defaults without erasing auto-detected platform", () => {
	const attributes = new Map<string, string>([["data-os", "linux"]]);
	// Only the DOM attribute contract is needed; no browser is simulated here.
	const root = {
		setAttribute: (name: string, value: string) => attributes.set(name, value),
		removeAttribute: (name: string) => attributes.delete(name),
	} as unknown as HTMLElement;
	const dark = { ...settingsDefaults, theme: "dark", accent: "ocean" } as const;
	expect(getDocumentAttributes(settingsDefaults)).toEqual({});
	applyDocumentAttributes(root, dark, settingsDefaults);
	expect(Object.fromEntries(attributes)).toEqual({
		"data-theme": "dark",
		"data-accent": "ocean",
		"data-os": "linux",
	});
	applyDocumentAttributes(root, settingsDefaults, dark);
	expect(Object.fromEntries(attributes)).toEqual({ "data-os": "linux" });
	applyDocumentAttributes(
		root,
		{ ...settingsDefaults, os: "ios" },
		settingsDefaults,
	);
	expect(attributes.get("data-os")).toBe("ios");
	applyDocumentAttributes(root, settingsDefaults, {
		...settingsDefaults,
		os: "ios",
	});
	expect(attributes.has("data-os")).toBe(false);
});
