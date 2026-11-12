import { DisclosureGroup } from "@passui/react/disclosure-group";

export function DisclosureGroupDisabled() {
	return (
		<DisclosureGroup
			label="Managed settings"
			open={false}
			onOpenChange={() => {}}
			disabled
			description="Controlled by your organization"
		>
			<p>Managed details</p>
		</DisclosureGroup>
	);
}
