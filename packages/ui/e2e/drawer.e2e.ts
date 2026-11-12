import { expect, test } from "@playwright/test";
import { finger, panelRect, settled, swipe } from "./touch";

async function open(page: import("@playwright/test").Page, search = "") {
	await page.goto(`/${search}`);
	await page.getByTestId("trigger").tap();
	await settled(page);
}

test("a slow drag past a quarter of the height dismisses", async ({ page }) => {
	await open(page);
	const rect = await panelRect(page);
	const touch = finger(page);
	await touch.down(rect.left + rect.width / 2, rect.top + 12);
	await touch.move(0, rect.height * 0.6, 12, 30);
	await touch.up();
	await expect(page.getByTestId("panel")).toHaveCount(0, { timeout: 4000 });
});

test("a quick flick dismisses even when short", async ({ page }) => {
	await open(page);
	const rect = await panelRect(page);
	// 60 px in about 40 ms is well over 1000 px/s. Zag adds 0.4 s of that
	// velocity to the drop point (60 + 0.4 × 1000+ px), which lands past halfway.
	await swipe(
		page,
		{ x: rect.left + rect.width / 2, y: rect.top + 12 },
		{ dx: 0, dy: 60 },
		{ steps: 5, stepMs: 8 },
	);
	await expect(page.getByTestId("panel")).toHaveCount(0, { timeout: 4000 });
});

test("a short slow drag springs back", async ({ page }) => {
	await open(page);
	const before = await panelRect(page);
	const touch = finger(page);
	await touch.down(before.left + before.width / 2, before.top + 12);
	await touch.move(0, 20, 8, 50);
	await touch.up();
	await settled(page);
	const after = await panelRect(page);
	expect(Math.abs(after.top - before.top)).toBeLessThanOrEqual(1);
	await expect(page.getByTestId("panel")).toHaveCount(1);
});

test("reversing mid exit continues from where the panel is", async ({
	page,
}) => {
	await open(page);
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
		const before = panel.getBoundingClientRect().top;
		window.__setOpen(true);
		// The reversal starts a new transition. Pausing it before it has ticked
		// holds it at progress zero, so the reading is its start value in this
		// very task, with no frame of movement in between.
		for (const a of document.getAnimations()) a.pause();
		const after = panel.getBoundingClientRect().top;
		for (const a of document.getAnimations()) a.play();
		return {
			before,
			after,
			same: panel === document.querySelector('[data-testid="panel"]'),
		};
	});
	expect(within.same).toBe(true);
	expect(Math.abs(within.after - within.before)).toBeLessThanOrEqual(1);
});

test("the page scales back while open, follows the finger and eases out", async ({
	page,
}) => {
	await open(page);
	const pageEl = page.getByTestId("page");
	const scale = () =>
		pageEl.evaluate((el) => {
			const t = getComputedStyle(el).transform;
			return t === "none" ? 1 : Number(t.slice(7, -1).split(",")[0]);
		});
	const width = await page.evaluate(() => window.innerWidth);
	await expect(pageEl).toHaveAttribute("data-passui-page-active", "");
	await expect.poll(scale).toBeCloseTo((width - 26) / width, 2);
	await expect(pageEl).toHaveCSS("border-top-left-radius", "8px");

	const rect = await panelRect(page);
	const touch = finger(page);
	await touch.down(rect.left + rect.width / 2, rect.top + 12);
	// Well past halfway: at exactly half Zag's drop point ties with the snap
	// point and a stale release velocity springs back instead of dismissing.
	await touch.move(0, rect.height * 0.7, 10, 20);
	await expect(pageEl).toHaveAttribute("data-passui-page-dragging", "");
	const mid = await scale();
	expect(mid).toBeGreaterThan((width - 26) / width);
	expect(mid).toBeLessThan(1);

	await touch.up();
	await expect(page.getByTestId("panel")).toHaveCount(0, { timeout: 4000 });
	await expect(pageEl).not.toHaveAttribute("data-passui-page-active", "");
	expect(await scale()).toBe(1);
});

test("the page is left alone when nothing opts in", async ({ page }) => {
	await open(page, "?page=off");
	await expect(page.locator("[data-passui-page-active]")).toHaveCount(0);
});

test("reduced motion turns the page scale off", async ({ page }) => {
	await page.emulateMedia({ reducedMotion: "reduce" });
	await open(page);
	await expect(page.getByTestId("page")).toHaveCSS("transform", "none");
});

test("the panel is sized from the visual viewport", async ({ page }) => {
	await open(page);
	const heights = await page.evaluate(() => ({
		variable: getComputedStyle(
			document.querySelector('[data-slot="drawer-content"]')
				?.parentElement as Element,
		).getPropertyValue("--visual-viewport-height"),
		actual: window.visualViewport?.height,
	}));
	expect(Number.parseFloat(heights.variable)).toBeCloseTo(
		heights.actual ?? 0,
		0,
	);
});
