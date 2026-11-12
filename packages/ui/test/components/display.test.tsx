// @vitest-environment jsdom
import { expect, it } from "vitest";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "../../src/components/alert";
import { Avatar, AvatarFallback } from "../../src/components/avatar";
import { Badge } from "../../src/components/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../../src/components/breadcrumb";
import { ButtonGroup } from "../../src/components/button-group";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../src/components/card";
import { Kbd } from "../../src/components/kbd";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from "../../src/components/pagination";
import { Progress } from "../../src/components/progress";
import { Separator } from "../../src/components/separator";
import { Skeleton } from "../../src/components/skeleton";
import { Spinner } from "../../src/components/spinner";
import { expectNoA11yViolations } from "../helpers/axe";

it("static display components have no axe violations", async () => {
	await expectNoA11yViolations(
		<div>
			<Alert>
				<AlertTitle>Heads up</AlertTitle>
				<AlertDescription>Details</AlertDescription>
			</Alert>
			<Avatar>
				<AvatarFallback>AB</AvatarFallback>
			</Avatar>
			<Badge>New</Badge>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Docs</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<ButtonGroup>
				<button type="button">A</button>
				<button type="button">B</button>
			</ButtonGroup>
			<Card>
				<CardHeader>
					<CardTitle>Title</CardTitle>
				</CardHeader>
				<CardContent>Body</CardContent>
			</Card>
			<Kbd>⌘K</Kbd>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationLink href="#1" isActive>
							1
						</PaginationLink>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
			<Progress value={40} aria-label="Upload" />
			<Separator />
			<Skeleton className="h-4 w-20" />
			<Spinner />
		</div>,
	);
});

it("Progress clamps and reports its value", async () => {
	const host = document.createElement("div");
	const { renderToStaticMarkup } = await import("react-dom/server");
	const html = renderToStaticMarkup(<Progress value={150} />);
	expect(html).toContain('aria-valuenow="150"');
	expect(html).toContain("width:100%");
	expect(renderToStaticMarkup(<Progress />)).toContain(
		'data-state="indeterminate"',
	);
	host.remove();
});
