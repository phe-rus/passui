import { Kbd, KbdGroup } from "@passui/react/kbd";
import { Text } from "@passui/react/text";

export function KbdShortcut() {
	return (
		<div className="flex w-64 items-center justify-between">
			<Text>Search</Text>
			<KbdGroup>
				<Kbd>⌘</Kbd>
				<Kbd>K</Kbd>
			</KbdGroup>
		</div>
	);
}
