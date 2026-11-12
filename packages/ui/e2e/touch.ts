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

/**
 * A whole swipe run inside the page, so timing never waits on a protocol round
 * trip. Zag samples velocity with `performance.now()` as events arrive and only
 * trusts a release within 80 ms of the last move, so a flick must lift the
 * finger the instant it stops, which separate `evaluate` calls cannot do.
 */
export function swipe(
	page: Page,
	from: { x: number; y: number },
	by: { dx: number; dy: number },
	{ steps, stepMs }: { steps: number; stepMs: number },
) {
	return page.evaluate(
		async ({ from, by, steps, stepMs }) => {
			const fire = (
				type: "pointerdown" | "pointermove" | "pointerup",
				x: number,
				y: number,
			) => {
				const target =
					type === "pointerdown"
						? (document.elementFromPoint(x, y) ?? document.body)
						: document;
				target.dispatchEvent(
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
			};
			fire("pointerdown", from.x, from.y);
			for (let i = 1; i <= steps; i += 1) {
				await new Promise((r) => setTimeout(r, stepMs));
				fire(
					"pointermove",
					from.x + (by.dx * i) / steps,
					from.y + (by.dy * i) / steps,
				);
			}
			fire("pointerup", from.x + by.dx, from.y + by.dy);
		},
		{ from, by, steps, stepMs },
	);
}

/** The panel's rect, read at this instant. */
export const panelRect = (page: Page) =>
	page.getByTestId("panel").evaluate((el) => {
		const r = el.getBoundingClientRect();
		return { top: r.top, left: r.left, width: r.width, height: r.height };
	});

/**
 * Waits until the panel has stopped for good: nothing is animating and its rect
 * has held for 15 frames. A single pair of equal frames is not enough, because
 * a release leaves the panel still for a frame or two before the spring back
 * (or the exit) begins.
 */
export async function settled(page: Page, testId = "panel") {
	await page.getByTestId(testId).waitFor();
	await page.evaluate(
		(testId) =>
			new Promise<void>((resolve) => {
				const frames = 15;
				let still = 0;
				let last = "";
				const tick = () => {
					const el = document.querySelector(`[data-testid="${testId}"]`);
					if (!el) return resolve();
					const r = el.getBoundingClientRect();
					const now = `${r.top}|${r.left}|${r.width}|${r.height}`;
					const running = el
						.getAnimations({ subtree: true })
						.some((a) => a.playState === "running" || a.pending);
					still = now === last && !running ? still + 1 : 0;
					last = now;
					if (still >= frames) resolve();
					else requestAnimationFrame(tick);
				};
				requestAnimationFrame(tick);
			}),
		testId,
	);
}
