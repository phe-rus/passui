import { Button } from "@passui/react/button";
import { Layout } from "@passui/react/layout";

export function LayoutAction() {
	return (
		<Layout
			className="py-6"
			heading={
				<Layout.Heading
					title="Applications"
					description="Apps that sign people in with Pass."
					action={
						<Button size="sm" className="ms-auto">
							New application
						</Button>
					}
				/>
			}
		>
			<div className="bg-fill/60 h-24 rounded-3xl" />
		</Layout>
	);
}
