import {
	PlatformProvider,
	PlatformScript,
	ThemeProvider,
} from "@passui/react/appearance";
import { Toaster } from "@passui/react/toast";
import { ComposeViewport } from "@passui/tanstack/document";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/site-header";
import { starsQuery } from "@/features/layout/lib/github-stars";
import type { RouterContext } from "@/lib/router-context";
import styles from "@/styles.css?url";

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ title: "Passui · Native React controls" },
			{
				name: "description",
				content:
					"Native React controls on Zag.js with an Apple 2026 look. Import one component and pay only for it.",
			},
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ name: "theme-color", content: "#d16988" },
		],
		links: [
			{ rel: "stylesheet", href: styles },
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{
				rel: "icon",
				type: "image/png",
				sizes: "192x192",
				href: "/favicon.png",
			},
			{ rel: "icon", sizes: "any", href: "/favicon.ico" },
			{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
		],
	}),
	loader: ({ context }) => context.queryClient.prefetchQuery(starsQuery),
	shellComponent: RouteComponent,
});

function RouteComponent() {
	return (
		<ComposeViewport>
			<head>
				<PlatformScript />
				<HeadContent />
			</head>
			<ComposeViewport.Window after={<Scripts />}>
				<PlatformProvider>
					<ThemeProvider
						attribute={["class", "data-theme"]}
						defaultTheme="system"
						enableColorScheme
						enableSystem
					>
						<SiteHeader />
						<Outlet />
						<Toaster />
					</ThemeProvider>
				</PlatformProvider>
			</ComposeViewport.Window>
		</ComposeViewport>
	);
}
