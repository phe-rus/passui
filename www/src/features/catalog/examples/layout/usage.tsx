import { Layout } from "@passui/react/layout";
import { Text } from "@passui/react/text";

export function LayoutUsage() {
	return (
		<Layout
			className="py-6"
			heading={
				<Layout.Heading
					title="Devices"
					description="Where you're signed in right now."
				/>
			}
		>
			<Text size="callout" tone="secondary">
				The screen's content goes here.
			</Text>
		</Layout>
	);
}
