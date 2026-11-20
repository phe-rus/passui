import { createFileRoute } from "@tanstack/react-router";
import { IosLab } from "@/components/lab/ios-lab";

export const Route = createFileRoute("/lab/ios")({
	head: () => ({
		meta: [
			{ title: "iOS lab · Passui" },
			{ name: "robots", content: "noindex, nofollow" },
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <IosLab />;
}
