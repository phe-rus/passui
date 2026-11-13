import { Ambient } from "@passui/react/ambient";
import { Text } from "@passui/react/text";

export function AmbientUsage() {
	return (
		<Ambient
			src="/avatars/aiko.svg"
			className="flex flex-col items-center gap-3 py-10"
		>
			<img src="/avatars/aiko.svg" alt="" className="size-20 rounded-full" />
			<Text size="headline" weight="semibold">
				Aiko Kamado
			</Text>
		</Ambient>
	);
}
