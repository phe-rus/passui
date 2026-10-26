/** @jsxImportSource solid-js */
import {
    children,
    Show,
    splitProps,
    type JSX,
} from "solid-js"
import { Dynamic } from "solid-js/web"
import { cn } from "../../lib/class-names"
export type ContentViewVariant = "elevated"
export type ContentViewHeadingLevel = "h1" | "h2" | "h3"
function Header(props: {
    heading: string
    p?: string
    pClassName?: string
    icon?: JSX.Element
    action?: JSX.Element
    actionClassName?: string
    as?: ContentViewHeadingLevel
    className?: string
    children?: JSX.Element
}) {
    const icon = children(() => props.icon)
    const action = children(() => props.action)
    return (
        <div class={props.className}>
            <div
                class={cn(
                    action() && "flex items-center gap-3",
                    props.actionClassName
                )}
            >
                <Dynamic
                    component={props.as ?? "h3"}
                    class={cn(
                        icon() && "flex items-center gap-2"
                    )}
                >
                    {icon()}
                    {props.heading}
                </Dynamic>
                {action()}
            </div>
            <Show when={props.p}>
                <p class={props.pClassName}>{props.p}</p>
            </Show>
            {props.children}
        </div>
    )
}
export const ContentView = Object.assign(
    function ContentView(
        props: JSX.HTMLAttributes<HTMLElement> & {
            variant?: ContentViewVariant
            className?: string
        }
    ) {
        const [local, rest] = splitProps(props, [
            "variant",
            "class",
            "className",
        ])
        return (
            <section
                {...rest}
                class={cn(
                    "rounded-2xl bg-elevated border border-separator/35 shadow hover:shadow-md cursor-pointer group",
                    local.class,
                    local.className
                )}
            />
        )
    },
    {
        Row: (
            props: JSX.IntrinsicElements["div"] & {
                className?: string
            }
        ) => {
            const [local, rest] = splitProps(props, [
                "class",
                "className",
            ])
            return (
                <div
                    {...rest}
                    class={cn(
                        "flex items-center",
                        local.class,
                        local.className
                    )}
                />
            )
        },
        Section: (
            props: JSX.IntrinsicElements["section"] & {
                className?: string
            }
        ) => {
            const [local, rest] = splitProps(props, [
                "class",
                "className",
            ])
            return (
                <section
                    {...rest}
                    class={cn(
                        "flex flex-col gap-3",
                        local.class,
                        local.className
                    )}
                />
            )
        },
        Header,
        Divider: () => (
            <span class="h-16 w-px bg-separator" />
        ),
        H1: (
            props: JSX.IntrinsicElements["h1"] & {
                className?: string
            }
        ) => {
            const [local, rest] = splitProps(props, [
                "class",
                "className",
            ])
            return (
                <h1
                    {...rest}
                    class={cn(
                        "",
                        local.class,
                        local.className
                    )}
                />
            )
        },
        H2: (
            props: JSX.IntrinsicElements["h2"] & {
                className?: string
            }
        ) => {
            const [local, rest] = splitProps(props, [
                "class",
                "className",
            ])
            return (
                <h2
                    {...rest}
                    class={cn(
                        "",
                        local.class,
                        local.className
                    )}
                />
            )
        },
        P: (
            props: JSX.IntrinsicElements["p"] & {
                className?: string
            }
        ) => {
            const [local, rest] = splitProps(props, [
                "class",
                "className",
            ])
            return (
                <p
                    {...rest}
                    class={cn(
                        "leading-tight font-medium",
                        local.class,
                        local.className
                    )}
                />
            )
        },
        Span: (
            props: JSX.IntrinsicElements["span"] & {
                className?: string
            }
        ) => {
            const [local, rest] = splitProps(props, [
                "class",
                "className",
            ])
            return (
                <span
                    {...rest}
                    class={cn(
                        "text-callout tracking-tighter font-light",
                        local.class,
                        local.className
                    )}
                />
            )
        },
        Sub: (
            props: JSX.IntrinsicElements["sub"] & {
                className?: string
            }
        ) => {
            const [local, rest] = splitProps(props, [
                "class",
                "className",
            ])
            return (
                <sub
                    {...rest}
                    class={cn(
                        "text-subheadline text-label",
                        local.class,
                        local.className
                    )}
                />
            )
        },
    }
)
