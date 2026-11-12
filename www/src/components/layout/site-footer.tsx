/** Runs edge to edge, under the docs navigation too, with the header's own gutter. */
export function SiteFooter() {
	return (
		<footer className="border-separator border-t py-6">
			<div className="text-footnote text-label-secondary flex w-full flex-wrap items-center justify-between gap-3 px-5">
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
