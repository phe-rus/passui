import { guideContent } from "@/features/guides/content";
import { getGuide } from "@/features/guides/guides";
import { OnThisPage } from "./on-this-page";
import { PageNav } from "./page-nav";
import { Section } from "./prose";

export function GuidePage({ slug }: { slug: string }) {
	const guide = getGuide(slug);
	if (!guide) return null;
	const sections = guideContent[guide.slug];
	return (
		<div className="flex gap-10">
			<article className="flex min-w-0 flex-1 flex-col gap-10">
				<header className="flex flex-col gap-3">
					<h1 className="font-brand text-large-title font-extrabold tracking-tight">
						{guide.title}
					</h1>
					<p className="text-callout text-label-secondary max-w-2xl">
						{guide.summary}
					</p>
				</header>
				{sections.map((s) => (
					<Section key={s.id} id={s.id} title={s.title}>
						{s.body}
					</Section>
				))}
				<PageNav href={guide.path} />
			</article>
			<aside className="sticky top-24 hidden h-fit w-44 shrink-0 xl:block">
				<OnThisPage
					items={sections.map((s) => ({ id: s.id, title: s.title }))}
				/>
			</aside>
		</div>
	);
}
