import { createFileRoute } from "@tanstack/react-router";
import { UiDocPage } from "@/features/ui-docs/components/ui-doc-page";
import { doc } from "@/features/ui-docs/docs/tooltip";
import { getDocCode } from "@/features/ui-docs/lib/get-doc-code";
import { getUiDocHead } from "@/features/ui-docs/lib/get-ui-doc-head";

export const Route = createFileRoute("/_site/_docs/components/react/tooltip")({
	staticData: { lean: true },
	loader: () => getDocCode({ data: "tooltip" }),
	head: () => getUiDocHead("tooltip"),
	component: RouteComponent,
});

function RouteComponent() {
	return <UiDocPage doc={doc} code={Route.useLoaderData()} />;
}
