import { Divider } from "@passui/react/divider";

export function DividerSections() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			<span>Overview</span>
			<Divider decorative={false} />
			<span>Details</span>
		</div>
	);
}
