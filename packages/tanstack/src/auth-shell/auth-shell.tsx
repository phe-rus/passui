import { Outlet } from "@tanstack/react-router"
import type { ReactNode } from "react"

/** Auth routes share a stable frame; pages own their transitions. */
export function AuthShell({ brand }: { brand: ReactNode }) {
    return (
        <section className="relative isolate flex min-h-dvh flex-col items-center justify-center px-4 py-12">
            <div className="flex w-full max-w-[26rem] flex-col items-start gap-6">
                {brand}
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </section>
    )
}
