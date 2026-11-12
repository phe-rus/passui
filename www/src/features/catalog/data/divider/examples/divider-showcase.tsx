import { Divider } from "@passui/react/divider";

export function DividerShowcase() {
	return (
		<section className="bg-surface flex w-full max-w-sm flex-col gap-3 rounded-3xl p-5">
			<span>General</span>
			<Divider />
			<span>Notifications</span>
			<Divider />
			<span>Privacy</span>
		</section>
	);
}
