import {
	createContext,
	type PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";

export type PlatformOS =
	| "ios"
	| "android"
	| "macos"
	| "windows"
	| "linux"
	| "unknown";

const PlatformContext = createContext<PlatformOS>("unknown");

export function detectPlatform(
	userAgent: string,
	platform: string,
	maxTouchPoints: number,
): PlatformOS {
	return resolvePlatform(null, userAgent, platform, maxTouchPoints);
}

export function resolvePlatform(
	override: string | null,
	userAgent: string,
	platform: string,
	maxTouchPoints: number,
): PlatformOS {
	if (
		override === "ios" ||
		override === "android" ||
		override === "macos" ||
		override === "windows" ||
		override === "linux" ||
		override === "unknown"
	) {
		return override;
	}

	if (/android/i.test(userAgent)) return "android";
	if (/iPhone|iPad|iPod/i.test(userAgent)) return "ios";
	if (platform === "MacIntel" && maxTouchPoints > 1) return "ios";
	if (/Mac/i.test(platform)) return "macos";
	if (/Win/i.test(platform)) return "windows";
	if (/Linux/i.test(platform)) return "linux";
	return "unknown";
}

function initializePlatform(
	resolve: typeof resolvePlatform,
	root: HTMLElement,
	userAgent: string,
	platform: string,
	maxTouchPoints: number,
) {
	root.setAttribute(
		"data-os",
		resolve(root.getAttribute("data-os"), userAgent, platform, maxTouchPoints),
	);
}

export function PlatformScript({ nonce }: { nonce?: string }) {
	return (
		<script
			// Run the library's platform bootstrap before first paint.
			dangerouslySetInnerHTML={{
				__html: `(${initializePlatform.toString()})(${resolvePlatform.toString()}, document.documentElement, navigator.userAgent, navigator.platform, navigator.maxTouchPoints)`,
			}}
			nonce={nonce}
			suppressHydrationWarning
		/>
	);
}

const OVERLAY = '[data-slot$="-overlay"]';

/**
 * iOS Safari tints its floating bars from the page and keeps the tint it took
 * while an overlay was open, sometimes until the next navigation. Hiding and
 * showing the root inside one frame forces it to lay the page out and sample
 * again, with nothing visible in between.
 */
export function refreshBars(root: HTMLElement = document.documentElement) {
	const display = root.style.display;
	root.style.display = "none";
	void root.offsetHeight;
	root.style.display = display;
}

/** Re-sample the bars each time the last overlay backdrop leaves the page. */
export function refreshBarsAfterOverlays(body: HTMLElement) {
	let frame = 0;
	const observer = new MutationObserver((records) => {
		const removed = records.some((record) =>
			Array.from(record.removedNodes).some(
				(node) =>
					node instanceof Element &&
					(node.matches(OVERLAY) || node.querySelector(OVERLAY) !== null),
			),
		);
		if (!removed || body.querySelector(OVERLAY)) return;
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(() => refreshBars());
	});
	observer.observe(body, { childList: true, subtree: true });
	return () => {
		observer.disconnect();
		cancelAnimationFrame(frame);
	};
}

export function PlatformProvider({ children }: PropsWithChildren) {
	const [platform, setPlatform] = useState<PlatformOS>("unknown");

	useEffect(() => {
		const resolved = resolvePlatform(
			document.documentElement.getAttribute("data-os"),
			navigator.userAgent,
			navigator.platform,
			navigator.maxTouchPoints,
		);
		document.documentElement.setAttribute("data-os", resolved);
		setPlatform(resolved);
	}, []);

	useEffect(() => {
		if (platform !== "ios") return undefined;
		return refreshBarsAfterOverlays(document.body);
	}, [platform]);

	return (
		<PlatformContext.Provider value={platform}>
			{children}
		</PlatformContext.Provider>
	);
}

export function usePlatform() {
	return useContext(PlatformContext);
}
