import type { ReactNode } from "react";
import { Code, Prose, Snippet } from "@/components/docs/prose";
import type { GuideSlug } from "./guides";

export interface GuideSection {
	id: string;
	title: string;
	body: ReactNode;
}

const rootSetup = `import { PlatformProvider, PlatformScript, ThemeProvider } from "@passui/react/appearance";
import { Toaster } from "@passui/react/toast";

export function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PlatformScript />
      </head>
      <body>
        <PlatformProvider>
          <ThemeProvider attribute={["class", "data-theme"]} defaultTheme="system" enableColorScheme enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </PlatformProvider>
      </body>
    </html>
  );
}`;

export const guideContent: Record<GuideSlug, GuideSection[]> = {
	introduction: [
		{
			id: "what",
			title: "What Passui is",
			body: (
				<>
					<Prose>
						Passui is a small, native React control library with an Apple 2026
						look. Every component is plain readable code, built on a headless
						Zag.js state machine where behaviour is hard, and on a native
						element where it is not.
					</Prose>
					<Prose>
						You pay only for what you import. <Code>Button</Code> is under 2 KB
						gzip; an overlay such as a Dialog costs about 20 KB because it
						carries focus handling, dismissal and positioning for you.
					</Prose>
				</>
			),
		},
		{
			id: "packages",
			title: "Packages",
			body: (
				<ul className="text-callout text-label-secondary flex max-w-2xl list-disc flex-col gap-2 ps-5">
					<li>
						<Code>@passui/react</Code>: the components, one subpath each.
					</li>
					<li>
						<Code>@passui/icons</Code>: redrawn mono and duo icons, one subpath
						each.
					</li>
					<li>
						<Code>@passui/tokens</Code>: colours, type scale, motion and the
						shared stylesheet.
					</li>
					<li>
						<Code>@passui/tanstack</Code>: optional form, table and router
						integrations.
					</li>
					<li>
						<Code>@passui/cli</Code>: project setup.
					</li>
				</ul>
			),
		},
		{
			id: "ideas",
			title: "Ideas",
			body: (
				<Prose>
					Names follow shadcn (<Code>Dialog</Code>, <Code>DialogContent</Code>),
					so nothing needs translating. Triggers take a <Code>render</Code> prop
					to become your own element. State is styled through data attributes,
					and animation is CSS only, so a panel reversed halfway continues from
					where it is.
				</Prose>
			),
		},
	],
	installation: [
		{
			id: "install",
			title: "Install",
			body: (
				<>
					<Prose>
						For guided setup, run the Passui CLI in your app. It generates a
						stylesheet and providers for your framework.
					</Prose>
					<Snippet
						code={
							"bunx @passui/cli@latest init\n\n# Create a new project\nbunx @passui/cli@latest create my-app --template vite\nbunx @passui/cli@latest create my-app --template tanstack"
						}
					/>
					<Prose>
						Prefer to do it by hand? Add the packages and configure Tailwind CSS
						4.
					</Prose>
					<Snippet code="bun add @passui/react @passui/icons" />
					<Snippet
						label="With TanStack"
						code="bun add @passui/tanstack @tanstack/react-query"
					/>
				</>
			),
		},
		{
			id: "styles",
			title: "Styles",
			body: (
				<>
					<Prose>
						One import brings in Tailwind, the theme and everything the controls
						need. Tailwind finds your files itself, and the stylesheet registers
						Passui's, so there are no paths to maintain.
					</Prose>
					<Snippet
						label="app.css"
						code={
							'@import "@passui/react/styles.css";\n@import "@passui/icons/styles.css"; /* optional icon animation */'
						}
					/>
				</>
			),
		},
		{
			id: "root",
			title: "Root setup",
			body: (
				<>
					<Prose>
						<Code>PlatformScript</Code> sets <Code>data-os</Code> before the
						first paint. Mount <Code>Toaster</Code> once if you use toasts.
					</Prose>
					<Snippet label="src/root.tsx" code={rootSetup} />
				</>
			),
		},
		{
			id: "first",
			title: "Use a component",
			body: (
				<Snippet
					code={`import { Button } from "@passui/react/button";\n\nexport function Save() {\n  return <Button>Save</Button>;\n}`}
				/>
			),
		},
	],
	theming: [
		{
			id: "appearance",
			title: "Light and dark",
			body: (
				<Prose>
					Passui follows the system theme. <Code>ThemeProvider</Code> sets both
					a <Code>class</Code> and <Code>data-theme</Code>, and either attribute
					on any element gives that part of a screen its own appearance.
				</Prose>
			),
		},
		{
			id: "accent",
			title: "Accent",
			body: (
				<>
					<Prose>
						Set <Code>data-accent</Code> on the root to one of seven accents.
						Blush is the default. The accent also tints the window ground by a
						few percent, the way iOS does.
					</Prose>
					<Snippet code={'<html data-accent="ocean">'} />
				</>
			),
		},
		{
			id: "roles",
			title: "Colour roles",
			body: (
				<Prose>
					Use roles, never hex: <Code>bg-elevated</Code>,{" "}
					<Code>text-label-secondary</Code>, <Code>bg-accent</Code>,{" "}
					<Code>text-danger</Code>. Every pairing is checked for WCAG AA
					contrast in the tokens package.
				</Prose>
			),
		},
		{
			id: "platform",
			title: "Platform looks",
			body: (
				<Prose>
					The variants <Code>ios:</Code>, <Code>android:</Code>,{" "}
					<Code>macos:</Code>, <Code>windows:</Code> and <Code>linux:</Code>{" "}
					apply where the root has <Code>data-os</Code>, set before the first
					paint.
				</Prose>
			),
		},
	],
	typeset: [
		{
			id: "styles",
			title: "Text styles",
			body: (
				<Prose>
					Apple's Dynamic Type, named as SwiftUI names it:{" "}
					<Code>text-large-title</Code>, <Code>text-title</Code>,{" "}
					<Code>text-headline</Code>, <Code>text-body</Code>,{" "}
					<Code>text-callout</Code>, <Code>text-subheadline</Code>,{" "}
					<Code>text-footnote</Code> and <Code>text-caption</Code>. All scale
					with the app's text size setting.
				</Prose>
			),
		},
		{
			id: "typeset",
			title: "Long form writing",
			body: (
				<>
					<Prose>
						Wrap Markdown output in <Code>typeset</Code> for sensible headings,
						lists, quotes and code.
					</Prose>
					<Snippet code={'<article className="typeset">{children}</article>'} />
				</>
			),
		},
	],
	skills: [
		{
			id: "llms",
			title: "llms.txt",
			body: (
				<Prose>
					The site publishes <Code>/llms.txt</Code>, an index of every page, and
					a Markdown copy of each component page, generated from the same
					registry as the docs.
				</Prose>
			),
		},
		{
			id: "skill",
			title: "The Passui skill",
			body: (
				<>
					<Prose>
						Add the skill to your agent so it follows Passui's rules and knows
						each component's import path.
					</Prose>
					<Snippet code="bunx skills add https://passui.pherus.org/skills/passui/SKILL.md" />
				</>
			),
		},
	],
};
