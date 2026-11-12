import { Button } from "@passui/react/legacy/button";
import { Popover } from "@passui/react/popover";

export function PopoverUsage() {
	return (
		<Popover>
			<Popover.Trigger>
				<Button variant="secondary">What's this?</Button>
			</Popover.Trigger>
			<Popover.Content className="w-64 p-4">
				<p className="text-callout text-label">
					A passkey signs you in with your face, fingerprint or screen lock.
				</p>
			</Popover.Content>
		</Popover>
	);
}
