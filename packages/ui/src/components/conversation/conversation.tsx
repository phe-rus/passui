import { IconButton } from "../button/icon-button"
import { SendIcon } from "../../icons/icons"
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

export type ConversationSize = "sm" | "md" | "lg"

const avatarSizes: Record<ConversationSize, string> = {
    sm: "size-6",
    md: "size-7",
    lg: "size-8",
}
const bubbleClasses: Record<ConversationSize, string> = {
    sm: "rounded-3xl px-3 py-1.5 text-footnote leading-snug",
    md: "rounded-4xl px-3.5 py-2 text-subheadline leading-snug",
    lg: "rounded-5xl px-4 py-2.5 text-body leading-snug",
}
const bubbleTails: Record<ConversationSize, string> = {
    sm: "rounded-br-sm",
    md: "rounded-br-md",
    lg: "rounded-br-lg",
}
const bubbleTailsOther: Record<ConversationSize, string> = {
    sm: "rounded-bl-sm",
    md: "rounded-bl-md",
    lg: "rounded-bl-lg",
}
const authorText: Record<ConversationSize, string> = {
    sm: "px-3 text-caption2 text-label-secondary",
    md: "px-3 text-caption2 text-label-secondary",
    lg: "px-3.5 text-caption text-label-secondary",
}
const timeText: Record<ConversationSize, string> = {
    sm: "px-3 text-caption2 text-label-secondary tabular-nums",
    md: "px-3 text-caption2 text-label-secondary tabular-nums",
    lg: "px-3.5 text-caption text-label-secondary tabular-nums",
}
const dayMargins: Record<ConversationSize, string> = {
    sm: "my-3",
    md: "my-4",
    lg: "my-5",
}

// Composer size records
const composerSurfaces: Record<ConversationSize, string> = {
    sm: "flex items-end gap-2 rounded-4xl border border-separator bg-elevated py-1 pr-1 pl-3 transition-colors focus-within:border-accent-text/60",
    md: "flex items-end gap-2 rounded-5xl border border-separator bg-elevated py-1.5 pr-1.5 pl-4 transition-colors focus-within:border-accent-text/60",
    lg: "flex items-end gap-2 rounded-5xl border border-separator bg-elevated py-2 pr-2 pl-5 transition-colors focus-within:border-accent-text/60",
}
const textareaClasses: Record<ConversationSize, string> = {
    sm: "field-sizing-content max-h-48 min-h-8 flex-1 resize-none bg-transparent py-1 text-footnote text-label outline-none placeholder:text-label-secondary",
    md: "field-sizing-content max-h-48 min-h-9 flex-1 resize-none bg-transparent py-1.5 text-subheadline text-label outline-none placeholder:text-label-secondary",
    lg: "field-sizing-content max-h-48 min-h-10 flex-1 resize-none bg-transparent py-2 text-body text-label outline-none placeholder:text-label-secondary",
}
const sendButtonClasses: Record<ConversationSize, string> = {
    sm: "size-7 shrink-0 rounded-full",
    md: "size-8 shrink-0 rounded-full",
    lg: "size-9 shrink-0 rounded-full",
}
const sendIconSizes: Record<ConversationSize, number> = {
    sm: 16,
    md: 18,
    lg: 20,
}
const counterText: Record<ConversationSize, string> = {
    sm: "text-caption2 text-label-secondary tabular-nums",
    md: "text-caption2 text-label-secondary tabular-nums",
    lg: "text-caption text-label-secondary tabular-nums",
}

const GROUP_GAP_MS = 5 * 60 * 1000

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
    return word.charAt(0).toLocaleUpperCase(locale) + word.slice(1)
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
    size = "md",
}: {
    messages: ConversationMessage[]
    /** For day names and times; the reader's own by default. */
    locale?: string
    /** Bubble, avatar, author and time scale. @default "md" */
    size?: ConversationSize
}) {
    return (
        <ol data-not-typeset className="flex flex-col">
            {messages.map((message, index) => {
                const prev = messages[index - 1]
                const next = messages[index + 1]
                const newDay =
                    !prev ||
                    new Date(prev.createdAt).toDateString() !==
                        new Date(message.createdAt).toDateString()
                const startsGroup =
                    newDay ||
                    prev.mine !== message.mine ||
                    new Date(message.createdAt).getTime() - new Date(prev.createdAt).getTime() >
                        GROUP_GAP_MS
                const endsGroup =
                    !next ||
                    next.mine !== message.mine ||
                    new Date(next.createdAt).getTime() - new Date(message.createdAt).getTime() >
                        GROUP_GAP_MS

                return (
                    <li key={message.id} className="flex flex-col">
                        {newDay && (
                            <span
                                suppressHydrationWarning
                                className={cn(
                                    dayMargins[size],
                                    "text-center text-caption2 font-medium text-label-secondary"
                                )}
                            >
                                {dayLabel(message.createdAt, locale)}
                            </span>
                        )}
                        <div
                            className={cn(
                                "flex items-end gap-2",
                                message.mine ? "justify-end" : "justify-start",
                                startsGroup ? "mt-3" : "mt-0.5"
                            )}
                        >
                            {!message.mine && (
                                <span
                                    className={cn(
                                        "flex shrink-0 items-center justify-center",
                                        avatarSizes[size]
                                    )}
                                >
                                    {endsGroup && message.avatar}
                                </span>
                            )}
                            <div
                                className={cn(
                                    "flex max-w-[78%] flex-col gap-1",
                                    message.mine ? "items-end" : "items-start"
                                )}
                            >
                                {startsGroup && message.author && (
                                    <span className={authorText[size]}>{message.author}</span>
                                )}
                                <p
                                    suppressHydrationWarning
                                    title={formatTime(message.createdAt)}
                                    className={cn(
                                        bubbleClasses[size],
                                        "whitespace-pre-wrap wrap-break-word",
                                        message.mine
                                            ? "bg-inverse text-on-inverse"
                                            : "bg-fill text-label",
                                        endsGroup &&
                                            (message.mine
                                                ? bubbleTails[size]
                                                : bubbleTailsOther[size])
                                    )}
                                >
                                    {message.body}
                                </p>
                                {endsGroup && (
                                    <time
                                        suppressHydrationWarning
                                        dateTime={message.createdAt}
                                        className={timeText[size]}
                                    >
                                        {clock(message.createdAt, locale)}
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
    /** Surface, textarea, send button and counter scale. @default "md" */
    size?: ConversationSize
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
    size = "md",
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
            <div className={composerSurfaces[size]}>
                <textarea
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                            event.preventDefault()
                            void send()
                        }
                    }}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    rows={1}
                    className={textareaClasses[size]}
                />
                <IconButton
                    type="submit"
                    size="icon-xs"
                    disabled={!ready}
                    label={sendLabel}
                    className={sendButtonClasses[size]}
                >
                    <SendIcon size={sendIconSizes[size]} strokeWidth={2.5} />
                </IconButton>
            </div>
            <div className="flex min-h-6 items-center gap-2 px-1">
                {actions}
                <span className={cn("ml-auto", counterText[size])}>
                    {body.length > maxLength * 0.8 &&
                        (remaining?.(maxLength - body.length) ?? maxLength - body.length)}
                </span>
            </div>
        </form>
    )
}

export const Conversation = { Messages, Composer }
