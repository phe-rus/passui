/** @jsxImportSource solid-js */
import { Show, type JSX } from "solid-js"
import {
    Link,
    ErrorComponent,
    useRouter,
    useLocation,
    type ErrorComponentProps,
} from "@tanstack/solid-router"
import { Button, buttonStyle } from "@passui/solid/button"
export function DefaultLoader() {
    return (
        <section class="flex h-screen w-screen items-center justify-center bg-background">
            <span
                role="progressbar"
                class="size-5 animate-spin rounded-full border-2 border-current border-r-transparent"
            />
        </section>
    )
}
export function DefaultBoundary(props: ErrorComponentProps) {
    const router = useRouter(),
        isRoot = useLocation({
            select: (location) => location.pathname === "/",
        })
    return (
        <div class="flex min-h-100 w-full flex-col items-center justify-center gap-6 p-6 text-center">
            <div class="w-full max-w-md overflow-hidden rounded-md border border-danger/20 bg-danger/5 p-4 text-start">
                <p class="mb-2 text-caption font-semibold text-danger">
                    Application Error
                </p>
                <ErrorComponent error={props.error} />
            </div>
            <div class="flex flex-wrap justify-center gap-2">
                <Button
                    onClick={() => router.invalidate()}
                    variant="secondary"
                    size="sm"
                >
                    Try Again
                </Button>
                <Show
                    when={isRoot()}
                    fallback={
                        <Button
                            onClick={() =>
                                router.history.back()
                            }
                            size="sm"
                        >
                            Go Back
                        </Button>
                    }
                >
                    <Link
                        to="/"
                        class={buttonStyle({ size: "sm" })}
                    >
                        Go Home
                    </Link>
                </Show>
            </div>
        </div>
    )
}
export function NotFound(props: { children?: JSX.Element }) {
    const router = useRouter()
    return (
        <div class="flex min-h-[80svh] w-full items-center justify-center text-center">
            <section class="mx-auto flex w-full max-w-sm flex-col items-center gap-4">
                {props.children ?? (
                    <div class="flex flex-col gap-2">
                        <span class="font-mono text-caption text-danger">
                            Error 404
                        </span>
                        <h2 class="text-title2 font-bold">
                            Page Not Found
                        </h2>
                        <p class="text-subheadline text-label-secondary">
                            The page you are looking for might
                            have been moved, renamed, or
                            deleted.
                        </p>
                    </div>
                )}
                <div class="mt-2 flex gap-2">
                    <Button
                        onClick={() => router.history.back()}
                        variant="secondary"
                        size="sm"
                    >
                        Go back
                    </Button>
                    <Link
                        to="/"
                        class={buttonStyle({ size: "sm" })}
                    >
                        Start Over
                    </Link>
                </div>
            </section>
        </div>
    )
}
