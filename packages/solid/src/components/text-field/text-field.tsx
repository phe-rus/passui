import {
    children,
    createMemo,
    createSignal,
    createUniqueId,
    mergeProps,
    Show,
    splitProps,
    type JSX,
} from "solid-js"
import { Button } from "../button/button"
import { cn } from "../../lib/class-names"

export const textControlClasses = cn(
    "w-full min-w-0 rounded-xl border border-separator bg-elevated",
    "px-3 py-2 text-body text-label placeholder:text-label-tertiary",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text",
    "disabled:cursor-not-allowed disabled:opacity-40 aria-invalid:border-danger"
)
export interface TextFieldProps
    extends JSX.InputHTMLAttributes<HTMLInputElement> {
    label: string
    description?: JSX.Element
    errors?: string[]
    icon?: JSX.Element
    trailingIcon?: JSX.Element
    action?: JSX.Element
    revealLabels?: { show: string; hide: string }
    className?: string
}
export function TextField(props: TextFieldProps) {
    const [local, rest] = splitProps(
        mergeProps({ type: "text" }, props),
        [
            "label",
            "description",
            "errors",
            "icon",
            "trailingIcon",
            "action",
            "revealLabels",
            "type",
            "id",
            "class",
            "className",
            "aria-describedby",
            "aria-invalid",
        ]
    )
    const generatedId = createUniqueId()
    const id = () => local.id ?? generatedId
    const [revealed, setRevealed] = createSignal(false)
    const messages = createMemo(() =>
        Array.from(new Set(local.errors ?? []))
    )
    const reveal = () =>
        local.type === "password" && local.revealLabels
    const icon = children(() => local.icon)
    const trailing = children(() => local.trailingIcon)
    const description = children(() => local.description)
    return (
        <div class="flex flex-col gap-2">
            <label
                for={id()}
                class="text-subheadline font-semibold"
            >
                {local.label}
            </label>
            <div class="flex items-center gap-2 rounded-xl border border-separator bg-elevated px-3 focus-within:ring-1 focus-within:ring-accent/40 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent-text/70">
                <Show when={icon()}>
                    <span
                        aria-hidden="true"
                        class="flex shrink-0 items-center text-label-secondary"
                    >
                        {icon()}
                    </span>
                </Show>
                <input
                    {...rest}
                    id={id()}
                    type={
                        reveal() && revealed()
                            ? "text"
                            : local.type
                    }
                    aria-invalid={
                        messages().length > 0 ||
                        local["aria-invalid"]
                    }
                    aria-describedby={
                        [
                            local["aria-describedby"],
                            messages().length || description()
                                ? `${id()}-description`
                                : undefined,
                        ]
                            .filter(Boolean)
                            .join(" ") || undefined
                    }
                    class={cn(
                        "h-11 w-full min-w-0 bg-transparent text-body text-label outline-none",
                        "placeholder:text-label-tertiary disabled:opacity-40",
                        local.class,
                        local.className
                    )}
                />
                <Show when={trailing()}>
                    <span
                        aria-hidden="true"
                        class="flex shrink-0 items-center text-label-secondary"
                    >
                        {trailing()}
                    </span>
                </Show>
                <Show when={reveal()}>
                    {(labels) => (
                        <Button
                            variant="ghost"
                            size="xs"
                            class="-mr-1.5 shrink-0 whitespace-nowrap [@media(pointer:coarse)]:before:absolute [@media(pointer:coarse)]:before:-inset-1.5 [@media(pointer:coarse)]:before:content-['']"
                            aria-controls={id()}
                            aria-label={
                                revealed()
                                    ? labels().hide
                                    : labels().show
                            }
                            aria-pressed={revealed()}
                            onClick={() =>
                                setRevealed((value) => !value)
                            }
                        >
                            {revealed()
                                ? labels().hide
                                : labels().show}
                        </Button>
                    )}
                </Show>
                {local.action}
            </div>
            <Show
                when={messages().length > 0 || description()}
            >
                <div
                    id={`${id()}-description`}
                    role={
                        messages().length
                            ? "alert"
                            : undefined
                    }
                    class={cn(
                        "text-footnote",
                        messages().length
                            ? "text-danger"
                            : "text-label-secondary"
                    )}
                >
                    {messages().length
                        ? messages().join(". ")
                        : description()}
                </div>
            </Show>
        </div>
    )
}
