import { Divider } from "@passui/react/divider";

export function DividerVertical() {
	return (
		<div className="flex h-12 items-center gap-4">
			<span>Day</span>
			<Divider orientation="vertical" />
			<span>Week</span>
			<Divider orientation="vertical" />
			<span>Month</span>
		</div>
	);
}
