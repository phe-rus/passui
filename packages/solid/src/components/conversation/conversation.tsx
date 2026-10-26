/** @jsxImportSource solid-js */
import { createSignal, For, Show, type JSX } from "solid-js"
import { IconButton } from "../button/icon-button"
import { cn } from "../../lib/class-names"
export type ConversationMessage = {
    id: string
    body: string
    mine: boolean
    author?: string
    avatar?: JSX.Element
    createdAt: string
}
function dayLabel(iso: string, locale?: string) {
    const date = new Date(iso),
        today = new Date(),
        yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)
    const offset =
        date.toDateString() === today.toDateString()
            ? 0
            : date.toDateString() === yesterday.toDateString()
              ? -1
              : null
    if (offset === null)
        return date.toLocaleDateString(locale, {
            weekday: "long",
            month: "long",
            day: "numeric",
        })
    const word = new Intl.RelativeTimeFormat(locale, {
        numeric: "auto",
    }).format(offset, "day")
    return (
        word.charAt(0).toLocaleUpperCase(locale) +
        word.slice(1)
    )
}
function Messages(props: {
    messages: ConversationMessage[]
    locale?: string
}) {
    return (
        <ol data-not-typeset class="flex flex-col">
            <For each={props.messages}>
                {(message, index) => {
                    const previous = () =>
                            props.messages[index() - 1],
                        next = () =>
                            props.messages[index() + 1]
                    const newDay = () =>
                        !previous() ||
                        new Date(
                            previous()!.createdAt
                        ).toDateString() !==
                            new Date(
                                message.createdAt
                            ).toDateString()
                    const starts = () =>
                        newDay() ||
                        previous()!.mine !== message.mine ||
                        Date.parse(message.createdAt) -
                            Date.parse(
                                previous()!.createdAt
                            ) >
                            300000
                    const ends = () =>
                        !next() ||
                        next()!.mine !== message.mine ||
                        new Date(
                            next()!.createdAt
                        ).toDateString() !==
                            new Date(
                                message.createdAt
                            ).toDateString() ||
                        Date.parse(next()!.createdAt) -
                            Date.parse(message.createdAt) >
                            300000
                    return (
                        <li class="flex flex-col">
                            <Show when={newDay()}>
                                <span class="my-4 text-center text-caption2 font-medium text-label-secondary">
                                    {dayLabel(
                                        message.createdAt,
                                        props.locale
                                    )}
                                </span>
                            </Show>
                            <div
                                class={cn(
                                    "flex items-end gap-2",
                                    message.mine
                                        ? "justify-end"
                                        : "justify-start",
                                    starts()
                                        ? "mt-3"
                                        : "mt-0.5"
                                )}
                            >
                                <Show when={!message.mine}>
                                    <span class="flex size-7 shrink-0 items-center justify-center">
                                        <Show when={ends()}>
                                            {message.avatar}
                                        </Show>
                                    </span>
                                </Show>
                                <div
                                    class={cn(
                                        "flex max-w-[78%] flex-col gap-1",
                                        message.mine
                                            ? "items-end"
                                            : "items-start"
                                    )}
                                >
                                    <Show
                                        when={
                                            starts() &&
                                            message.author
                                        }
                                    >
                                        <span class="px-3 text-caption2 text-label-secondary">
                                            {message.author}
                                        </span>
                                    </Show>
                                    <p
                                        title={new Date(
                                            message.createdAt
                                        ).toLocaleString(
                                            props.locale
                                        )}
                                        class={cn(
                                            "rounded-4xl px-3.5 py-2 text-subheadline leading-snug whitespace-pre-wrap wrap-break-word",
                                            message.mine
                                                ? "bg-inverse text-on-inverse"
                                                : "bg-fill text-label",
                                            ends() &&
                                                (message.mine
                                                    ? "rounded-br-md"
                                                    : "rounded-bl-md")
                                        )}
                                    >
                                        {message.body}
                                    </p>
                                    <Show when={ends()}>
                                        <time
                                            dateTime={
                                                message.createdAt
                                            }
                                            class="px-3 text-caption2 text-label-secondary tabular-nums"
                                        >
                                            {new Date(
                                                message.createdAt
                                            ).toLocaleTimeString(
                                                props.locale,
                                                {
                                                    hour: "numeric",
                                                    minute: "2-digit",
                                                }
                                            )}
                                        </time>
                                    </Show>
                                </div>
                            </div>
                        </li>
                    )
                }}
            </For>
        </ol>
    )
}
export interface ComposerProps {
    onSend: (body: string) => Promise<unknown>
    pending?: boolean
    maxLength: number
    placeholder: string
    actions?: JSX.Element
    sendLabel: string
    remaining?: (count: number) => string
}
function Composer(props: ComposerProps) {
    const [body, setBody] = createSignal(""),
        [sending, setSending] = createSignal(false)
    const ready = () =>
        body().trim().length > 0 &&
        !props.pending &&
        !sending()
    async function send() {
        if (!ready()) return
        const submitted = body()
        setSending(true)
        try {
            await props.onSend(submitted.trim())
            if (body() === submitted) setBody("")
        } finally {
            setSending(false)
        }
    }
    return (
        <form
            data-not-typeset
            class="flex flex-col gap-2"
            onSubmit={(event) => {
                event.preventDefault()
                void send().catch(() => {})
            }}
        >
            <div class="flex items-end gap-2 rounded-5xl border border-separator bg-elevated py-1.5 pr-1.5 pl-4 transition-colors focus-within:border-accent-text/60">
                <textarea
                    aria-label={props.placeholder}
                    value={body()}
                    onInput={(event) =>
                        setBody(event.currentTarget.value)
                    }
                    onKeyDown={(event) => {
                        if (
                            event.key === "Enter" &&
                            (event.metaKey || event.ctrlKey)
                        ) {
                            event.preventDefault()
                            void send().catch(() => {})
                        }
                    }}
                    maxLength={props.maxLength}
                    placeholder={props.placeholder}
                    rows={1}
                    class="field-sizing-content max-h-48 min-h-9 flex-1 resize-none bg-transparent py-1.5 text-subheadline text-label outline-none placeholder:text-label-secondary"
                />
                <IconButton
                    type="submit"
                    size="icon-xs"
                    disabled={!ready()}
                    label={props.sendLabel}
                    class="size-8 shrink-0 rounded-full"
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        aria-hidden="true"
                    >
                        <path d="m6 10 6-6 6 6M12 4v16" />
                    </svg>
                </IconButton>
            </div>
            <div class="flex min-h-6 items-center gap-2 px-1">
                {props.actions}
                <span class="ml-auto text-caption2 text-label-secondary tabular-nums">
                    <Show
                        when={
                            body().length >
                            props.maxLength * 0.8
                        }
                    >
                        {props.remaining?.(
                            props.maxLength - body().length
                        ) ?? props.maxLength - body().length}
                    </Show>
                </span>
            </div>
        </form>
    )
}
export const Conversation = { Messages, Composer }
