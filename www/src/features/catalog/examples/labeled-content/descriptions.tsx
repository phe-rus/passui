import { Card, CardContent, CardHeader, CardTitle } from "@passui/react/card";
import { LabeledContent } from "@passui/react/labeled-content";
import { Switch } from "@passui/react/switch";
import { useState } from "react";

export function LabeledContentDescriptions() {
	const [alerts, setAlerts] = useState(true);
	const [digest, setDigest] = useState(false);

	return (
		<div className="w-full max-w-sm">
			<Card className="w-full overflow-hidden">
				<CardHeader>
					<CardTitle>Email</CardTitle>
				</CardHeader>
				<CardContent className="px-0">
					<LabeledContent
						label="Sign-in alerts"
						description="When a new device signs in to your account."
					>
						<Switch
							aria-label="Sign-in alerts"
							checked={alerts}
							onCheckedChange={setAlerts}
						/>
					</LabeledContent>
					<LabeledContent
						label="Weekly digest"
						description="A summary of activity every Monday."
					>
						<Switch
							aria-label="Weekly digest"
							checked={digest}
							onCheckedChange={setDigest}
						/>
					</LabeledContent>
				</CardContent>
			</Card>
		</div>
	);
}
