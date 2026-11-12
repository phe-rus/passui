import { ChevronRightIcon } from "@passui/icons/chevron-right";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@passui/react/breadcrumb";

export function BreadcrumbCustomSeparator() {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<ChevronRightIcon size={12} />
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<ChevronRightIcon size={12} />
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
