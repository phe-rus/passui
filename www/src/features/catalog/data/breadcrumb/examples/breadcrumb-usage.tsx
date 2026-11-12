import { Breadcrumb } from "@passui/react/breadcrumb";
export function BreadcrumbUsage() {
	return (
		<Breadcrumb
			label="Breadcrumb"
			items={[
				{ label: "Docs", href: "/docs/introduction" },
				{ label: "Components", href: "/components" },
				{ label: "Button" },
			]}
		/>
	);
}
