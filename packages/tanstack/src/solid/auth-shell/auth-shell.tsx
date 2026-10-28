/** @jsxImportSource solid-js */
import { Outlet } from "@tanstack/solid-router"
import type { JSX } from "solid-js"

export function AuthShell(props: { brand: JSX.Element }) {
    return (
        <section class="relative isolate flex min-h-dvh flex-col items-center justify-center-safe px-4 py-12">
            <div class="flex w-full max-w-[26rem] flex-col items-start gap-6">
                {props.brand}
                <div class="w-full">
                    <Outlet />
                </div>
            </div>
        </section>
    )
}
