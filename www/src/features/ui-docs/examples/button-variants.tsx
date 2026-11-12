import { Button } from "@passui/react/button";

export function ButtonVariants() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Button>Default</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="destructive">Delete</Button>
			<Button variant="link">Link</Button>
		</div>
	);
}
