import { Card, CardContent, CardHeader, CardTitle } from "@passui/react/card";
import { Input } from "@passui/react/input";
import { LabeledContent } from "@passui/react/labeled-content";
import { SegmentedControl } from "@passui/react/segmented-control";
import { useState } from "react";

export function LabeledContentShowcase() {
	const [density, setDensity] = useState("comfortable");
	const [signature, setSignature] = useState("Sent from Passui");

	return (
		<div className="w-full max-w-md">
			<Card className="w-full overflow-hidden">
				<CardHeader>
					<CardTitle>Mail</CardTitle>
				</CardHeader>
				<CardContent className="px-0">
					<LabeledContent
						label="Density"
						description="How much fits on screen."
						wide
					>
						<SegmentedControl
							aria-label="Density"
							value={density}
							onValueChange={setDensity}
							options={[
								{
									value: "compact",
									label: "Compact",
								},
								{
									value: "comfortable",
									label: "Comfortable",
								},
							]}
						/>
					</LabeledContent>
					<LabeledContent label="Signature" stacked>
						<Input
							aria-label="Signature"
							value={signature}
							onChange={(event) => setSignature(event.target.value)}
						/>
					</LabeledContent>
					<LabeledContent label="Account">aiko@example.com</LabeledContent>
				</CardContent>
			</Card>
		</div>
	);
}
