import { usePlatform } from "../appearance/platform";

const apple = new Set(["ios", "macos"]);

/**
 * The platform, SSR safe: `"unknown"` on the server and on the first client
 * render, then the real one, so markup never mismatches. For styling prefer the
 * `ios:` and `macos:` variants, which read `data-os` before the first paint.
 */
export function useOS() {
	const os = usePlatform();
	return {
		os,
		isApple: apple.has(os),
		isTouch: os === "ios" || os === "android",
	};
}
