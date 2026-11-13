import { Card, CardContent, CardHeader, CardTitle } from "@passui/react/card";
import { LabeledContent } from "@passui/react/labeled-content";
import { Layout } from "@passui/react/layout";
import { Text } from "@passui/react/text";

export function LayoutSettings() {
	return (
		<div className="bg-background ring-separator/60 w-full max-w-lg rounded-4xl px-6 shadow-sm ring-1">
			<Layout
				className="py-8"
				heading={
					<Layout.Heading
						title="Personal info"
						description="Your name and how to reach you."
					/>
				}
			>
				<Card className="w-full overflow-hidden">
					<CardHeader>
						<CardTitle>Basics</CardTitle>
					</CardHeader>
					<CardContent className="px-0">
						<LabeledContent label="Name">
							<Text as="span" size="subheadline" tone="secondary">
								Aiko Kamado
							</Text>
						</LabeledContent>
						<LabeledContent label="Birthday">
							<Text as="span" size="subheadline" tone="secondary">
								21 July
							</Text>
						</LabeledContent>
					</CardContent>
				</Card>
			</Layout>
		</div>
	);
}
