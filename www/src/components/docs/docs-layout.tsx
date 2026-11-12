import type { ReactNode } from "react";
import { DocsSidebar } from "./docs-sidebar";

/** The sidebar beside the page on wide screens. Phones open the same list in a Sheet from the header. */
export function DocsLayout({ children }: { children: ReactNode }) {
	return (
		<div className="mx-auto flex w-full max-w-7xl gap-10 px-4 pt-8 pb-16 md:px-6">
			<aside className="sticky top-24 hidden h-[calc(100svh-7rem)] w-56 shrink-0 overflow-y-auto md:block">
				<DocsSidebar />
			</aside>
			<div className="min-w-0 flex-1">{children}</div>
		</div>
	);
}
