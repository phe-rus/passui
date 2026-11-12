import type { ReactNode } from "react";
import { OnThisPage } from "./on-this-page";

/**
 * One docs page: the reading column in the middle and, from wide screens, the
 * outline of its headings in a rail on the right that stays in view as you scroll.
 */
export function DocsPage({
	toc,
	children,
}: {
	toc: { id: string; title: string }[];
	children: ReactNode;
}) {
	return (
		<div className="flex justify-center gap-12 px-6 py-10 lg:px-10">
			<article className="flex w-full max-w-3xl min-w-0 flex-col gap-10">
				{children}
			</article>
			<aside className="sticky top-22 hidden h-fit max-h-[calc(100svh-7rem)] w-52 shrink-0 overflow-y-auto xl:block">
				<OnThisPage items={toc} />
			</aside>
		</div>
	);
}
