import { IconButton } from "@passui/react/icon-button"
import { ArrowUp02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ReactNode } from "react"
import { useState } from "react"
import { formatTime } from "../../lib/date"
import { cn } from "../../lib/class-names"

export type ConversationMessage = {
    id: string
    body: string
    /** Written by whoever is looking: drawn on the right. */
    mine: boolean
    author?: string
    /** Shown beside the other side's messages, like their avatar. */
    avatar?: ReactNode
    createdAt: string
}

const GROUP_GAP_MS = 5 * 60 * 1000

/**
 * The day line: today and yesterday in the reader's own words, from
 * Intl rather than built-in English, else the full date.
 */
function dayLabel(iso: string, locale?: string) {
    const date = new Date(iso)
    const today = new Date()
    const yesterday = new Date()
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

const clock = (iso: string, locale?: string) =>
    new Date(iso).toLocaleTimeString(locale, {
        hour: "numeric",
        minute: "2-digit",
    })

/**
 * A thread of plain-text messages like Messages on iPhone: a day line when
 * the date changes, back-to-back messages from one side grouped under one
 * name, theirs on the left with an avatar, yours on the right.
 */
function Messages({
    messages,
    locale,
}: {
    messages: ConversationMessage[]
    /** For day names and times; the reader's own by default. */
    locale?: string
}) {
    return (
        <ol data-not-typeset className="flex flex-col">
            {messages.map((message, index) => {
                const prev = messages[index - 1]
                const next = messages[index + 1]
                const newDay =
                    !prev ||
                    new Date(
                        prev.createdAt
                    ).toDateString() !==
                        new Date(
                            message.createdAt
                        ).toDateString()
                const startsGroup =
                    newDay ||
                    prev.mine !== message.mine ||
                    new Date(message.createdAt).getTime() -
                        new Date(prev.createdAt).getTime() >
                        GROUP_GAP_MS
                const endsGroup =
                    !next ||
                    next.mine !== message.mine ||
                    new Date(next.createdAt).getTime() -
                        new Date(
                            message.createdAt
                        ).getTime() >
                        GROUP_GAP_MS

                return (
                    <li
                        key={message.id}
                        className="flex flex-col"
                    >
                        {newDay && (
                            // the reader's own day and clock, which a server can't know
                            <span
                                suppressHydrationWarning
                                className="my-4 text-center text-caption2 font-medium text-label-secondary"
                            >
                                {dayLabel(
                                    message.createdAt,
                                    locale
                                )}
                            </span>
                        )}
                        <div
                            className={cn(
                                "flex items-end gap-2",
                                message.mine
                                    ? "justify-end"
                                    : "justify-start",
                                startsGroup
                                    ? "mt-3"
                                    : "mt-0.5"
                            )}
                        >
                            {!message.mine && (
                                <span className="flex size-7 shrink-0 items-center justify-center">
                                    {endsGroup &&
                                        message.avatar}
                                </span>
                            )}
                            <div
                                className={cn(
                                    "flex max-w-[78%] flex-col gap-1",
                                    message.mine
                                        ? "items-end"
                                        : "items-start"
                                )}
                            >
                                {startsGroup &&
                                    message.author && (
                                        <span className="px-3 text-caption2 text-label-secondary">
                                            {message.author}
                                        </span>
                                    )}
                                {/* text only: a message can never become markup */}
                                <p
                                    suppressHydrationWarning
                                    title={formatTime(
                                        message.createdAt
                                    )}
                                    className={cn(
                                        "rounded-4xl px-3.5 py-2 text-subheadline leading-snug whitespace-pre-wrap wrap-break-word",
                                        message.mine
                                            ? "bg-inverse text-on-inverse"
                                            : "bg-fill text-label",
                                        endsGroup &&
                                            (message.mine
                                                ? "rounded-br-md"
                                                : "rounded-bl-md")
                                    )}
                                >
                                    {message.body}
                                </p>
                                {endsGroup && (
                                    <time
                                        suppressHydrationWarning
                                        dateTime={
                                            message.createdAt
                                        }
                                        className="px-3 text-caption2 text-label-secondary tabular-nums"
                                    >
                                        {clock(
                                            message.createdAt,
                                            locale
                                        )}
                                    </time>
                                )}
                            </div>
                        </div>
                    </li>
                )
            })}
        </ol>
    )
}

type ComposerProps = {
    onSend: (body: string) => Promise<unknown>
    pending?: boolean
    maxLength: number
    placeholder: string
    /** Extra controls under the field, like a status picker. */
    actions?: ReactNode
    /** Names the round Send button for screen readers. */
    sendLabel: string
    /**
     * Words for the characters left, shown near the limit, such as
     * (count) => `${count} left`. Without it, just the number shows.
     */
    remaining?: (count: number) => string
}

/** A reply field with a round send button; Ctrl/Cmd+Enter sends, and it clears only once the send worked. */
function Composer({
    onSend,
    pending = false,
    maxLength,
    placeholder,
    actions,
    sendLabel,
    remaining,
}: ComposerProps) {
    const [body, setBody] = useState("")
    const ready = body.trim().length > 0 && !pending
    const send = async () => {
        if (!ready) return
        await onSend(body.trim())
        setBody("")
    }

    return (
        <form
            data-not-typeset
            className="flex flex-col gap-2"
            onSubmit={(event) => {
                event.preventDefault()
                void send()
            }}
        >
            <div className="flex items-end gap-2 rounded-5xl border border-separator bg-elevated py-1.5 pr-1.5 pl-4 transition-colors focus-within:border-accent-text/60">
                <textarea
                    value={body}
                    onChange={(event) =>
                        setBody(event.target.value)
                    }
                    onKeyDown={(event) => {
                        if (
                            event.key === "Enter" &&
                            (event.metaKey || event.ctrlKey)
                        ) {
                            event.preventDefault()
                            void send()
                        }
                    }}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    rows={1}
                    className="field-sizing-content max-h-48 min-h-9 flex-1 resize-none bg-transparent py-1.5 text-subheadline text-label outline-none placeholder:text-label-secondary"
                />
                <IconButton
                    type="submit"
                    size="icon-xs"
                    disabled={!ready}
                    label={sendLabel}
                    className="size-8 shrink-0 rounded-full"
                >
                    <HugeiconsIcon
                        icon={ArrowUp02Icon}
                        strokeWidth={2.5}
                    />
                </IconButton>
            </div>
            <div className="flex min-h-6 items-center gap-2 px-1">
                {actions}
                <span className="ml-auto text-caption2 text-label-secondary tabular-nums">
                    {body.length > maxLength * 0.8 &&
                        (remaining?.(
                            maxLength - body.length
                        ) ??
                            maxLength - body.length)}
                </span>
            </div>
        </form>
    )
}

export const Conversation = { Messages, Composer }
