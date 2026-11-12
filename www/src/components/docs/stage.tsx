import { cn } from "@passui/react/cn";
import { SegmentedControl } from "@passui/react/segmented-control";
import { createContext, type ReactNode, useContext, useState } from "react";

/** iOS style wallpapers behind the live preview, so glass vibrancy is visible at once. */
export const wallpapers = {
	plain: { label: "Plain", css: "var(--color-background)" },
	aurora: {
		label: "Aurora",
		css: "radial-gradient(60% 80% at 15% 20%, #7ad7f0 0%, transparent 60%), radial-gradient(50% 70% at 85% 30%, #b388ff 0%, transparent 62%), radial-gradient(70% 80% at 50% 100%, #ff8fb1 0%, transparent 60%), #1c1b3a",
	},
	dusk: {
		label: "Dusk",
		css: "linear-gradient(160deg, #ff9a8b 0%, #ff6a88 38%, #6a4c93 100%)",
	},
	meadow: {
		label: "Meadow",
		css: "radial-gradient(70% 90% at 80% 10%, #fff6b0 0%, transparent 55%), linear-gradient(180deg, #8fd694 0%, #3f8f6b 100%)",
	},
	graphite: {
		label: "Graphite",
		css: "radial-gradient(60% 80% at 30% 10%, #5b5f6b 0%, transparent 70%), #17181c",
	},
} as const;

export type WallpaperId = keyof typeof wallpapers;

const Context = createContext<WallpaperId>("plain");

/** Holds the chosen wallpaper for every stage on the page. */
export function StageProvider({
	children,
}: {
	children: (props: { wallpaper: WallpaperId; picker: ReactNode }) => ReactNode;
}) {
	const [wallpaper, setWallpaper] = useState<WallpaperId>("plain");
	const picker = (
		<SegmentedControl
			aria-label="Preview background"
			value={wallpaper}
			onValueChange={(next) => setWallpaper(next as WallpaperId)}
			options={(Object.keys(wallpapers) as WallpaperId[]).map((id) => ({
				value: id,
				label: wallpapers[id].label,
			}))}
		/>
	);
	return (
		<Context.Provider value={wallpaper}>
			{children({ wallpaper, picker })}
		</Context.Provider>
	);
}

/** The live preview surface. Dark wallpapers flip its text to light so contrast holds. */
export function PreviewStage({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	const id = useContext(Context);
	const dark = id === "aurora" || id === "graphite" || id === "dusk";
	return (
		<div
			data-wallpaper={id}
			data-theme={dark ? "dark" : undefined}
			style={{ background: wallpapers[id].css }}
			className={cn(
				"text-label ring-separator relative flex min-h-56 items-center justify-center overflow-hidden rounded-3xl p-8 ring-1 transition-[background] duration-700 motion-reduce:transition-none",
				className,
			)}
		>
			{children}
		</div>
	);
}
