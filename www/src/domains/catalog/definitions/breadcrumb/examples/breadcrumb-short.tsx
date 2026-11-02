import { Breadcrumb } from "@passui/react/breadcrumb"
export function BreadcrumbShort() {
    return (
        <Breadcrumb label="Breadcrumb" items={[{ label: "Home", href: "/" }, { label: "Docs" }]} />
    )
}
