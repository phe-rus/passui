import { Card, CardContent, CardHeader, CardTitle } from "@passui/react/card";
import { LabeledContent } from "@passui/react/labeled-content";
import { ViewController } from "@passui/react/view-controller";

export function ViewControllerSettings() {
	return (
		<div className="bg-background ring-separator/60 w-full max-w-lg rounded-4xl px-6 shadow-sm ring-1">
			<ViewController
				className="py-8"
				heading={
					<ViewController.Heading
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
							<span className="text-subheadline text-label-secondary">
								Aiko Kamado
							</span>
						</LabeledContent>
						<LabeledContent label="Birthday">
							<span className="text-subheadline text-label-secondary">
								21 July
							</span>
						</LabeledContent>
					</CardContent>
				</Card>
			</ViewController>
		</div>
	);
}
