import { Link } from "@tanstack/react-router";
import { getNavigation } from "@/features/components/navigation";

/**
 * The docs navigation, used in the rail on wide screens and in the phone sheet.
 * Rows are one line each and never wrap: a long name is cut with an ellipsis and
 * the full name stays in the tooltip. Rows sit a pixel apart; only categories
 * get room around them.
 */
export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
	return (
		<nav
			aria-label="Documentation"
			className="flex flex-col gap-6 px-3 py-6 pb-10"
		>
			{getNavigation().map((group) => (
				<div key={group.title} className="flex flex-col gap-1">
					<h4 className="text-caption text-label-tertiary truncate px-3 font-semibold tracking-wide uppercase">
						{group.title}
					</h4>
					<ul className="m-0 flex list-none flex-col gap-px p-0">
						{group.items.map((item) => (
							<li key={item.href} className="min-w-0">
								<Link
									to={item.href}
									title={item.title}
									onClick={onNavigate}
									activeOptions={{ exact: true }}
									className="text-label-secondary hover:bg-accent/15 hover:text-label flex h-8 min-w-0 items-center justify-between gap-2 rounded-xl px-3 text-sm font-normal no-underline transition-colors duration-(--duration-instant)"
									activeProps={{
										className: "bg-accent/15 text-label font-medium",
										"aria-current": "page",
									}}
								>
									<span className="min-w-0 truncate">{item.title}</span>
									{item.preview ? (
										<span className="text-caption2 text-label-tertiary shrink-0">
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
