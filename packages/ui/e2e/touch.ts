import type { Page } from "@playwright/test";

/**
 * A finger, as touch pointer events. Playwright has no swipe, and CDP touch
 * input is Chromium only, so one path serves both engines: touch typed
 * PointerEvents on the element, then on the document, as a real touch would
 * deliver them. Waits between moves give the machine real velocity.
 */
export function finger(page: Page) {
	const send = (
		type: "pointerdown" | "pointermove" | "pointerup",
		x: number,
		y: number,
		target: string,
	) =>
		page.evaluate(
			({ type, x, y, target }) => {
				const el =
					type === "pointerdown"
						? (document.elementFromPoint(x, y) ??
							document.querySelector(target))
						: document;
				el?.dispatchEvent(
					new PointerEvent(type, {
						pointerId: 7,
						pointerType: "touch",
						isPrimary: true,
						button: 0,
						buttons: type === "pointerup" ? 0 : 1,
						clientX: x,
						clientY: y,
						bubbles: true,
						cancelable: true,
						composed: true,
					}),
				);
			},
			{ type, x, y, target },
		);

	let x = 0;
	let y = 0;
	return {
		async down(atX: number, atY: number, target = "body") {
			x = atX;
			y = atY;
			await send("pointerdown", x, y, target);
		},
		/** Moves by (dx, dy) in `steps`, `stepMs` apart. */
		async move(dx: number, dy: number, steps = 8, stepMs = 16) {
			for (let i = 1; i <= steps; i += 1) {
				await send(
					"pointermove",
					x + (dx * i) / steps,
					y + (dy * i) / steps,
					"body",
				);
				await page.waitForTimeout(stepMs);
			}
			x += dx;
			y += dy;
		},
		async up() {
			await send("pointerup", x, y, "body");
		},
	};
}

/** The panel's rect, read at this instant. */
export const panelRect = (page: Page) =>
	page.getByTestId("panel").evaluate((el) => {
		const r = el.getBoundingClientRect();
		return { top: r.top, left: r.left, width: r.width, height: r.height };
	});

/** Waits until the panel has stopped moving (its rect is the same on two frames). */
export async function settled(page: Page) {
	await page.getByTestId("panel").waitFor();
	await page.waitForFunction(
		() =>
			new Promise<boolean>((resolve) => {
				const el = document.querySelector('[data-testid="panel"]');
				if (!el) return resolve(false);
				const a = el.getBoundingClientRect();
				requestAnimationFrame(() =>
					requestAnimationFrame(() => {
						const b = el.getBoundingClientRect();
						resolve(a.top === b.top && a.left === b.left);
					}),
				);
			}),
		undefined,
		{ polling: 100 },
	);
}
