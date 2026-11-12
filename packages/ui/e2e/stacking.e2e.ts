import { expect, type Page, test } from "@playwright/test";
import { settled } from "./touch";

/** Spec 0003 AC-9: any overlay inside any other, only the top layer reacts. */
const stacks = [
	"dialog,dialog",
	"dialog,sheet",
	"sheet,dialog",
	"drawer,drawer",
	"dialog,drawer",
	"drawer,dialog",
	"dialog,sheet,drawer",
];

const panel = (page: Page, depth: number) => page.getByTestId(`panel-${depth}`);

async function openAll(page: Page, layers: string) {
	await page.goto(`/?ui=stack&layers=${layers}`);
	const count = layers.split(",").length;
	for (let depth = 0; depth < count; depth++) {
		await page.getByTestId(`trigger-${depth}`).tap();
		await expect(panel(page, depth)).toBeVisible();
		await settled(page, `panel-${depth}`);
	}
	return count;
}

const focusedTestId = (page: Page) =>
	page.evaluate(() => document.activeElement?.getAttribute("data-testid"));

const scrollLocked = (page: Page) =>
	page.evaluate(
		() =>
			getComputedStyle(document.body).overflow === "hidden" ||
			getComputedStyle(document.documentElement).overflow === "hidden",
	);

for (const layers of stacks) {
	test.describe(layers, () => {
		test("Escape closes only the top layer, then the next", async ({
			page,
		}) => {
			const count = await openAll(page, layers);
			for (let top = count - 1; top >= 0; top--) {
				await page.keyboard.press("Escape");
				await expect(panel(page, top)).toHaveCount(0, { timeout: 4000 });
				for (let below = 0; below < top; below++)
					await expect(panel(page, below)).toBeVisible();
			}
		});

		test("an outside press closes only the top layer", async ({ page }) => {
			const count = await openAll(page, layers);
			// The top layer's backdrop covers the page, so a corner press is outside it.
			await page.mouse.click(2, 2);
			await expect(panel(page, count - 1)).toHaveCount(0, { timeout: 4000 });
			await expect(panel(page, count - 2)).toBeVisible();
		});

		test("focus returns to the trigger of the layer that closed", async ({
			page,
		}) => {
			const count = await openAll(page, layers);
			for (let top = count - 1; top >= 0; top--) {
				await page.keyboard.press("Escape");
				await expect(panel(page, top)).toHaveCount(0, { timeout: 4000 });
				await expect.poll(() => focusedTestId(page)).toBe(`trigger-${top}`);
			}
		});

		test("scroll lock holds until the last layer closes", async ({ page }) => {
			const count = await openAll(page, layers);
			for (let top = count - 1; top >= 0; top--) {
				expect(await scrollLocked(page)).toBe(true);
				await page.keyboard.press("Escape");
				await expect(panel(page, top)).toHaveCount(0, { timeout: 4000 });
			}
			await expect.poll(() => scrollLocked(page)).toBe(false);
		});

		test("only the top layer takes focus", async ({ page }) => {
			const count = await openAll(page, layers);
			await page.keyboard.press("Tab");
			const inside = await page.evaluate((depth) => {
				const top = document.querySelector(`[data-testid="panel-${depth}"]`);
				return Boolean(top?.contains(document.activeElement));
			}, count - 1);
			expect(inside).toBe(true);
		});
	});
}

test("a drawer inside a drawer scales the parent back and restores it", async ({
	page,
}) => {
	await openAll(page, "drawer,drawer");
	const parent = panel(page, 0);
	await expect(parent).toHaveAttribute("data-nested-drawer-open", "");
	await page.keyboard.press("Escape");
	await expect(panel(page, 1)).toHaveCount(0, { timeout: 4000 });
	await expect(parent).not.toHaveAttribute("data-nested-drawer-open", "");
});

test("the page scale holds while any drawer is open and clears after the last", async ({
	page,
}) => {
	await openAll(page, "drawer,drawer");
	const active = page.locator("[data-passui-page-active]");
	await expect(active).toHaveCount(1);
	await page.keyboard.press("Escape");
	await expect(panel(page, 1)).toHaveCount(0, { timeout: 4000 });
	await expect(active).toHaveCount(1);
	await page.keyboard.press("Escape");
	await expect(panel(page, 0)).toHaveCount(0, { timeout: 4000 });
	await expect(active).toHaveCount(0);
});
