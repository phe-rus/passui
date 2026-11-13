import { Ambient } from "@passui/react/ambient";
import { Button } from "@passui/react/button";
import { Text } from "@passui/react/text";

export function AmbientShowcase() {
	return (
		<Ambient
			src="/avatars/mira.svg"
			className="flex w-full max-w-sm flex-col items-center gap-4 py-12 text-center"
		>
			<img
				src="/avatars/mira.svg"
				alt=""
				className="size-28 rounded-full shadow-sm"
			/>
			<div className="flex flex-col gap-1">
				<Text as="h2" size="title2" weight="bold">
					Mira Patel
				</Text>
				<Text size="callout" tone="secondary">
					Support lead, Lisbon
				</Text>
			</div>
			<div className="flex gap-2">
				<Button size="sm">Message</Button>
				<Button variant="secondary" size="sm">
					View profile
				</Button>
			</div>
		</Ambient>
	);
}
