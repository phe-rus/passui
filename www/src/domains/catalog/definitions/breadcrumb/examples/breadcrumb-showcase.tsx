import { Breadcrumb } from "@passui/react/breadcrumb";
export function BreadcrumbShowcase() {
	return (
		<div className="w-full max-w-sm">
			<Breadcrumb
				label="Breadcrumb"
				items={[
					{ label: "Docs", href: "/docs/introduction" },
					{ label: "Components", href: "/components" },
					{ label: "Button" },
				]}
			/>
		</div>
	);
}
