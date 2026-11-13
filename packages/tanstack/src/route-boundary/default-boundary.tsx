import { Button, buttonVariants } from "@passui/react/button";
import { cn } from "@passui/react/cn";
import type { ErrorComponentProps } from "@tanstack/react-router";
import {
	ErrorComponent,
	Link,
	useLocation,
	useRouter,
} from "@tanstack/react-router";

export function DefaultBoundary({ error }: ErrorComponentProps) {
	const router = useRouter();
	const isRoot = useLocation({
		select: (location) => location.pathname === "/",
	});

	return (
		<div className="flex min-h-100 w-full flex-col items-center justify-center gap-6 p-6 text-center">
			<div className="border-danger/20 bg-danger/5 w-full max-w-md overflow-hidden rounded-md border p-4 text-left">
				<p className="text-caption text-danger mb-2 font-semibold tracking-wider uppercase">
					Application Error
				</p>
				<ErrorComponent error={error} />
			</div>

			<div className="flex flex-wrap items-center justify-center gap-2">
				<Button
					onClick={() => router.invalidate()}
					variant="secondary"
					size="sm"
				>
					Try Again
				</Button>

				{isRoot ? (
					<Link
						to="/"
						className={cn(
							buttonVariants({
								variant: "default",
								size: "sm",
							}),
						)}
					>
						Go Home
					</Link>
				) : (
					<Button
						onClick={() => router.history.back()}
						variant="default"
						size="sm"
					>
						Go Back
					</Button>
				)}
			</div>
		</div>
	);
}
