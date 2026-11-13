import { Badge } from "@passui/react/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@passui/react/card";
import { LabeledContent } from "@passui/react/labeled-content";
import { Text } from "@passui/react/text";

export function LabeledContentValues() {
	return (
		<div className="w-full max-w-sm">
			<Card className="w-full overflow-hidden">
				<CardHeader>
					<CardTitle>Account</CardTitle>
				</CardHeader>
				<CardContent className="px-0">
					<LabeledContent label="Account ID">
						<Text
							as="span"
							size="footnote"
							tone="secondary"
							className="font-mono"
						>
							pass_7f3a9c
						</Text>
					</LabeledContent>
					<LabeledContent label="Plan">
						<Badge>Family</Badge>
					</LabeledContent>
					<LabeledContent label="Member since">
						<Text as="span" size="subheadline" tone="secondary">
							March 2024
						</Text>
					</LabeledContent>
				</CardContent>
			</Card>
		</div>
	);
}
