import type { ReactNode } from "react";
import { DocsSidebar } from "./docs-sidebar";

/**
 * The docs shell runs edge to edge: the navigation rail on the left, pinned
 * under the header, and the page filling the rest. Phones open the same list
 * in a Sheet from the header.
 */
export function DocsLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex w-full flex-1">
			<aside className="border-separator/50 no-scrollbar sticky top-12 hidden h-[calc(100svh-3rem)] w-64 shrink-0 overflow-y-auto border-e md:block">
				<DocsSidebar />
			</aside>
			<div className="min-w-0 flex-1">{children}</div>
		</div>
	);
}
