import { cn } from "@passui/react/cn";
import { Link } from "@tanstack/react-router";
import { getNavigation } from "@/features/components/navigation";

/** The docs navigation. Used in the rail on wide screens and in the phone sheet. */
export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
	return (
		<nav aria-label="Documentation" className="flex flex-col gap-6 pb-10">
			{getNavigation().map((group) => (
				<div key={group.title} className="flex flex-col gap-1">
					<h4 className="text-caption text-label-tertiary px-3 font-semibold tracking-wide uppercase">
						{group.title}
					</h4>
					<ul className="m-0 flex list-none flex-col gap-0.5 p-0">
						{group.items.map((item) => (
							<li key={item.href}>
								<Link
									to={item.href}
									onClick={onNavigate}
									activeOptions={{ exact: true }}
									className={cn(
										"text-subheadline text-label-secondary hover:bg-fill/70 hover:text-label flex items-center justify-between rounded-xl px-3 py-1.5 no-underline transition-colors",
									)}
									activeProps={{
										className: "bg-fill text-label font-semibold",
										"aria-current": "page",
									}}
								>
									{item.title}
									{item.preview ? (
										<span className="text-caption2 text-label-tertiary">
											preview
										</span>
									) : null}
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
		</nav>
	);
}
