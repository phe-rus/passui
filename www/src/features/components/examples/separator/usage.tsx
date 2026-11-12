import { Separator } from "@passui/react/separator";

export function SeparatorUsage() {
	return (
		<div className="w-full max-w-xs">
			<p className="text-subheadline font-semibold">Passui</p>
			<p className="text-footnote text-label-secondary">
				Native React controls.
			</p>
			<Separator className="my-3" />
			<p className="text-footnote">Open source</p>
		</div>
	);
}
