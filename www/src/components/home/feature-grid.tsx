import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@passui/react/card";

const features = [
	{
		title: "Pay for what you import",
		body: "Button is under 2 KB gzip. Each overlay is its own entry with a size budget that fails CI on growth.",
	},
	{
		title: "Accessible by machine",
		body: "Focus, dismissal, positioning and typeahead come from Zag state machines, tested with axe.",
	},
	{
		title: "Shadcn names",
		body: "Dialog, DialogContent, DialogTrigger. Triggers take a render prop to become your own element.",
	},
	{
		title: "Interruptible motion",
		body: "CSS transitions, so a sheet reversed halfway continues from where it is. Reduce Motion is honoured.",
	},
	{
		title: "Icons that match",
		body: "Redrawn mono and duo icons, one subpath each, in @passui/icons.",
	},
	{
		title: "Optional TanStack",
		body: "Forms, tables and route boundaries built on the same controls.",
	},
];

export function FeatureGrid() {
	return (
		<section
			aria-label="Features"
			className="mx-auto grid max-w-6xl gap-4 px-4 pb-24 sm:grid-cols-2 lg:grid-cols-3"
		>
			{features.map((f) => (
				<Card key={f.title}>
					<CardHeader>
						<CardTitle>{f.title}</CardTitle>
						<CardDescription>{f.body}</CardDescription>
					</CardHeader>
					<CardContent />
				</Card>
			))}
		</section>
	);
}
