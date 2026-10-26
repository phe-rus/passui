/** @jsxImportSource solid-js */
import { Outlet, useLocation } from "@tanstack/solid-router"
import { Show, type JSX } from "solid-js"
export function AuthShell(props: { brand: JSX.Element }) {
    const location = useLocation()
    return (
        <section class="relative isolate flex min-h-dvh flex-col items-center justify-center px-4 py-12">
            <div class="flex w-full max-w-[26rem] flex-col items-start gap-6">
                {props.brand}
                <Show when={location().pathname} keyed>
                    {(_pathname) => (
                        <div class="w-full motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-right-4 motion-safe:duration-500">
                            <Outlet />
                        </div>
                    )}
                </Show>
            </div>
        </section>
    )
}
