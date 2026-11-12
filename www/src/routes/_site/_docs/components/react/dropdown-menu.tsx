import { createFileRoute } from "@tanstack/react-router";
import { UiDocPage } from "@/features/ui-docs/components/ui-doc-page";
import { doc } from "@/features/ui-docs/docs/dropdown-menu";
import { getDocCode } from "@/features/ui-docs/lib/get-doc-code";
import { getUiDocHead } from "@/features/ui-docs/lib/get-ui-doc-head";

export const Route = createFileRoute(
	"/_site/_docs/components/react/dropdown-menu",
)({
	staticData: { lean: true },
	loader: () => getDocCode({ data: "dropdown-menu" }),
	head: () => getUiDocHead("dropdown-menu"),
	component: RouteComponent,
});

function RouteComponent() {
	return <UiDocPage doc={doc} code={Route.useLoaderData()} />;
}
