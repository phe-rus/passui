import { Button, buttonVariants } from "@passui/react/button";
import { cn } from "@passui/react/cn";
import { Link, useRouter } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";

type NotFoundProps = PropsWithChildren;

export function NotFound({ children }: NotFoundProps) {
	const router = useRouter();

	return (
		<div className="flex min-h-[80svh] w-full flex-col items-center justify-center text-center">
			<section className="mx-auto flex w-full max-w-sm flex-col items-center justify-center gap-4">
				{children ?? (
					<div className="flex flex-col items-center gap-2">
						<span className="text-caption text-danger font-mono font-semibold tracking-widest uppercase">
							Error 404
						</span>
						<h2 className="text-label text-2xl font-bold tracking-tight">
							Page Not Found
						</h2>
						<p className="text-subheadline text-label-secondary max-w-70">
							The page you are looking for might have been moved, renamed, or
							deleted.
						</p>
					</div>
				)}

				<div className="mt-2 flex items-center gap-2">
					<Button
						onClick={() => router.history.back()}
						variant="secondary"
						size="sm"
					>
						Go back
					</Button>
					<Link to="/" className={cn(buttonVariants({ size: "sm" }))}>
						Start Over
					</Link>
				</div>
			</section>
		</div>
	);
}
