/** @jsxImportSource solid-js */
import { splitProps, type JSX } from "solid-js"
import { HydrationScript } from "solid-js/web"
import { cn } from "@passui/solid/cn"
function Window(
    props: JSX.HTMLAttributes<HTMLBodyElement> & {
        after?: JSX.Element
        before?: JSX.Element
        className?: string
    }
) {
    const [local, rest] = splitProps(props, [
        "children",
        "after",
        "before",
        "class",
        "className",
    ])
    return (
        <body
            {...rest}
            class={cn(
                "fixed h-svh w-full min-w-full bg-background overflow-x-hidden typeset wrap-anywhere flex flex-col",
                local.class,
                local.className
            )}
        >
            {local.before}
            <main class="flex flex-1 flex-col min-h-svh overflow-auto no-scrollbar">
                {local.children}
            </main>
            {local.after}
        </body>
    )
}
export const ComposeViewport = Object.assign(
    function ComposeViewport(
        props: JSX.IntrinsicElements["html"] & {
            className?: string
            head?: JSX.Element
        }
    ) {
        const [local, rest] = splitProps(props, [
            "class",
            "className",
            "lang",
            "head",
            "children",
        ])
        return (
            <html
                {...rest}
                lang={local.lang ?? "en"}
                class={cn(
                    "antialiased blur-none",
                    local.class,
                    local.className
                )}
            >
                <head>
                    <HydrationScript />
                    {local.head}
                </head>
                {local.children}
            </html>
        )
    },
    { Window }
)
