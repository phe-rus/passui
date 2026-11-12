import { Badge } from "@passui/react/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@passui/react/card";
import { LabeledContent } from "@passui/react/labeled-content";

export function LabeledContentValues() {
	return (
		<div className="w-full max-w-sm">
			<Card className="w-full overflow-hidden">
				<CardHeader>
					<CardTitle>Account</CardTitle>
				</CardHeader>
				<CardContent className="px-0">
					<LabeledContent label="Account ID">
						<span className="text-footnote text-label-secondary font-mono">
							pass_7f3a9c
						</span>
					</LabeledContent>
					<LabeledContent label="Plan">
						<Badge>Family</Badge>
					</LabeledContent>
					<LabeledContent label="Member since">
						<span className="text-subheadline text-label-secondary">
							March 2024
						</span>
					</LabeledContent>
				</CardContent>
			</Card>
		</div>
	);
}
