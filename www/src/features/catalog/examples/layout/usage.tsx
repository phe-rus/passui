import { Layout } from "@passui/react/layout";

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
			<p className="text-callout text-label-secondary">
				The screen's content goes here.
			</p>
		</Layout>
	);
}
