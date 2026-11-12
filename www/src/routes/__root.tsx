import {
	PlatformProvider,
	PlatformScript,
	ThemeProvider,
} from "@passui/react/appearance";
import { Toaster } from "@passui/react/toast";
import { ComposeViewport } from "@passui/tanstack/document";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getStars } from "@/lib/github-stars";
import tailwind from "@/styles/site.css?url";

export const Route = createRootRoute({
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
			{ rel: "stylesheet", href: tailwind },
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700..800&display=swap",
			},
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
	loader: () => getStars(),
	shellComponent: RouteComponent,
});

function RouteComponent() {
	const stars = Route.useLoaderData() ?? null;
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
						<SiteHeader stars={stars} />
						<Outlet />
						<SiteFooter />
						<Toaster />
					</ThemeProvider>
				</PlatformProvider>
			</ComposeViewport.Window>
		</ComposeViewport>
	);
}
