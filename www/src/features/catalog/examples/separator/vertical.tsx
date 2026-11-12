import { Separator } from "@passui/react/separator";

export function SeparatorVertical() {
	return (
		<div className="text-subheadline flex h-5 items-center gap-3">
			Docs <Separator orientation="vertical" /> Blog{" "}
			<Separator orientation="vertical" /> Source
		</div>
	);
}
