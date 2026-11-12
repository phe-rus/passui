// @vitest-environment jsdom
import { renderToString } from "react-dom/server";
import { beforeEach, expect, it } from "vitest";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../src/components/tabs";
import {
	getToasts,
	toast,
	toastLimits,
} from "../../src/components/toast/toast-store";

beforeEach(() => {
	for (const item of [...getToasts()]) toast.dismiss(item.id);
});

it("takes a title first, as the original toast did", () => {
	toast("Saved", { description: "Your changes are live." });
	toast.success("Synced");
	const [newest, older] = getToasts();
	expect(newest).toMatchObject({ tone: "success", title: "Synced" });
	expect(older).toMatchObject({
		tone: "neutral",
		title: "Saved",
		description: "Your changes are live.",
	});
});

it("also takes one object, so existing calls keep working", () => {
	toast.error({
		title: "Couldn't save",
		description: "Try again.",
		size: "lg",
	});
	expect(getToasts()[0]).toMatchObject({
		tone: "error",
		title: "Couldn't save",
		description: "Try again.",
		size: "lg",
	});
});

it("keeps info and warning as plain toasts", () => {
	toast.info({ title: "Heads up" });
	toast.warning("Storage almost full");
	expect(getToasts().map((t) => t.tone)).toEqual(["neutral", "neutral"]);
});

it("morphs a loading toast into its outcome, with string or object messages", async () => {
	await toast.promise(Promise.resolve(1), {
		loading: { title: "Uploading…" },
		success: (n) => ({ title: `Uploaded ${n}`, description: "All done." }),
		error: "Upload failed",
	});
	await Promise.resolve();
	expect(getToasts()).toHaveLength(1);
	expect(getToasts()[0]).toMatchObject({
		tone: "success",
		title: "Uploaded 1",
		description: "All done.",
	});
});

it("keeps loading toasts until they are updated and times the rest out", () => {
	toast.loading("Working");
	toast("Done");
	const [done, working] = getToasts();
	expect(working?.duration).toBeNull();
	expect(done?.duration).toBeGreaterThan(0);
	expect(toastLimits.visible).toBe(3);
});

it("draws line tabs as quiet text over an underline", () => {
	const html = renderToString(
		<Tabs defaultValue="bun" variant="line">
			<TabsList>
				<TabsTrigger value="bun">bun</TabsTrigger>
				<TabsTrigger value="npm">npm</TabsTrigger>
			</TabsList>
			<TabsContent value="bun">a</TabsContent>
		</Tabs>,
	);
	expect(html).toContain('data-variant="line"');
	expect(html).toContain("border-b");
	expect(html).not.toContain("glass-lens");
	expect(
		renderToString(
			<Tabs defaultValue="a">
				<TabsList>
					<TabsTrigger value="a">a</TabsTrigger>
				</TabsList>
			</Tabs>,
		),
	).toContain("glass-lens");
});
