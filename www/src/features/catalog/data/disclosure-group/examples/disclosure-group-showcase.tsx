import { useState } from "react";
import { DisclosureGroup } from "@passui/react/disclosure-group";

export function DisclosureGroupShowcase() {
	const [network, setNetwork] = useState(false);
	const [privacy, setPrivacy] = useState(true);
	return (
		<section className="bg-surface w-full max-w-md rounded-3xl p-3">
			<DisclosureGroup label="Network" open={network} onOpenChange={setNetwork}>
				<p className="text-footnote">Connected through Wi-Fi.</p>
			</DisclosureGroup>
			<DisclosureGroup label="Privacy" open={privacy} onOpenChange={setPrivacy}>
				<p className="text-footnote">Control who can see your activity.</p>
			</DisclosureGroup>
		</section>
	);
}
