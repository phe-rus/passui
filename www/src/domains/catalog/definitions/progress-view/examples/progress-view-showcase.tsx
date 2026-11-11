import { ProgressView } from "@passui/react/progress-view";

export function ProgressViewShowcase() {
	return (
		<section className="bg-surface flex w-full max-w-sm flex-col gap-5 rounded-3xl p-5">
			<ProgressView label="Images" value={8} max={12} detail="8 of 12" />
			<ProgressView label="Processing" size="sm" />
		</section>
	);
}
