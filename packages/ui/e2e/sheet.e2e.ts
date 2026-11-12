import { expect, test } from "@playwright/test";
import { finger, panelRect, settled } from "./touch";

async function open(page: import("@playwright/test").Page, side: string) {
	await page.goto(`/?ui=sheet&side=${side}`);
	await page.getByTestId("trigger").tap();
	await settled(page);
}

test("a right sheet dismisses when dragged toward the right", async ({
	page,
}) => {
	await open(page, "right");
	const rect = await panelRect(page);
	const touch = finger(page);
	await touch.down(rect.left + 24, rect.top + rect.height / 2);
	await touch.move(rect.width * 0.7, 0, 12, 30);
	await touch.up();
	await expect(page.getByTestId("panel")).toHaveCount(0, { timeout: 4000 });
});

test("a right sheet ignores a drag toward the left", async ({ page }) => {
	await open(page, "right");
	const before = await panelRect(page);
	const touch = finger(page);
	await touch.down(before.left + 24, before.top + before.height / 2);
	await touch.move(-80, 0, 8, 30);
	await touch.up();
	await settled(page);
	const after = await panelRect(page);
	expect(Math.abs(after.left - before.left)).toBeLessThanOrEqual(1);
});

test("a left sheet dismisses when dragged toward the left", async ({
	page,
}) => {
	await open(page, "left");
	const rect = await panelRect(page);
	const touch = finger(page);
	await touch.down(rect.left + rect.width - 24, rect.top + rect.height / 2);
	await touch.move(-rect.width * 0.7, 0, 12, 30);
	await touch.up();
	await expect(page.getByTestId("panel")).toHaveCount(0, { timeout: 4000 });
});

test("reversing mid exit continues from where the panel is", async ({
	page,
}) => {
	await open(page, "right");
	await page.evaluate(() => window.__setOpen(false));
	await page.waitForTimeout(150);
	const within = await page.evaluate(async () => {
		const panel = document.querySelector('[data-testid="panel"]');
		if (!panel) throw new Error("the panel unmounted before the reversal");
		const frame = () => new Promise((r) => requestAnimationFrame(r));
		// pause() only takes effect on the next frame, so freeze the exit and let
		// two frames pass. Then the reading is a settled position, not a moving one.
		for (const a of document.getAnimations()) a.pause();
		await frame();
		await frame();
		const before = panel.getBoundingClientRect().left;
		window.__setOpen(true);
		// The reversal starts a new transition. Pausing it before it has ticked
		// holds it at progress zero, so the reading is its start value in this
		// very task, with no frame of movement in between.
		for (const a of document.getAnimations()) a.pause();
		const after = panel.getBoundingClientRect().left;
		for (const a of document.getAnimations()) a.play();
		return { before, after };
	});
	expect(Math.abs(within.after - within.before)).toBeLessThanOrEqual(1);
});

test("a sheet does not scale the page", async ({ page }) => {
	await open(page, "right");
	await expect(page.locator("[data-passui-page-active]")).toHaveCount(0);
});
