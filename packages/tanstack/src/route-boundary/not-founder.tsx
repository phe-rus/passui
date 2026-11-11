import { Link, useRouter } from "@tanstack/react-router";
import { Button, buttonStyle } from "@passui/react/button";
import type { PropsWithChildren } from "react";
import { cn } from "@passui/react/cn";

type NotFoundProps = PropsWithChildren;

export function NotFound({ children }: NotFoundProps) {
	const router = useRouter();

	return (
		<div className="flex min-h-[80svh] w-full flex-col items-center justify-center text-center">
			<section className="mx-auto flex w-full max-w-sm flex-col items-center justify-center gap-4">
				{children ?? (
					<div className="flex flex-col items-center gap-2">
						<span className="text-caption text-destructive font-mono font-semibold tracking-widest uppercase">
							Error 404
						</span>
						<h2 className="text-foreground text-2xl font-bold tracking-tight">
							Page Not Found
						</h2>
						<p className="text-subheadline text-muted-foreground max-w-70">
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
					<Link to="/" className={cn(buttonStyle({ size: "sm" }))}>
						Start Over
					</Link>
				</div>
			</section>
		</div>
	);
}
