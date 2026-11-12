export function SiteFooter() {
	return (
		<footer className="border-separator border-t py-8">
			<div className="text-footnote text-label-secondary mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 md:px-6">
				<p>Passui, by Pherus. MIT licensed.</p>
				<a
					href="https://github.com/phe-rus/passui"
					className="hover:text-label no-underline"
				>
					Source on GitHub
				</a>
			</div>
		</footer>
	);
}
