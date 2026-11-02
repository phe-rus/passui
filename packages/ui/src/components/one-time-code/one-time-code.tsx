import { type CSSProperties, type InputHTMLAttributes, useEffect, useId, useRef } from "react"
import { CheckIcon } from "../../icons/icons"
import { cn } from "../../lib/class-names"

export type OneTimeCodeStatus = "idle" | "verifying" | "success" | "error"
export interface OneTimeCodeProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "value" | "defaultValue" | "onChange" | "type" | "maxLength" | "size"
    > {
    label: string
    value: string
    onChange: (value: string) => void
    /** Called when a complete code is entered, including paste and autofill. */
    onComplete?: (value: string) => void
    /** Number of digits, 3–8. @default 6 */
    length?: number
    status?: OneTimeCodeStatus
    /** Localized verification feedback announced without reading decorative cells. */
    statusLabel?: string
}

/** Normalize common numeric keyboards without splitting the browser's input into cells. */
export function normalizeCode(value: string, length: number) {
    return Array.from(value, (digit) => {
        const point = digit.codePointAt(0) ?? 0
        for (const base of [0x30, 0x660, 0x6f0, 0xff10]) {
            if (point >= base && point < base + 10) return String(point - base)
        }
        return ""
    })
        .join("")
        .slice(0, length)
}

/** Six cells, one field: paste, autofill, selection and Backspace stay native. */
export function OneTimeCode({
    label,
    value,
    onChange,
    onComplete,
    length = 6,
    status = "idle",
    statusLabel,
    className,
    disabled,
    id: suppliedId,
    ...props
}: OneTimeCodeProps) {
    const generated = useId()
    const id = suppliedId ?? generated
    const filter = `otp-goo-${generated.replace(/:/g, "")}`
    const input = useRef<HTMLInputElement>(null)
    const count = Number.isFinite(length) ? Math.max(3, Math.min(8, Math.round(length))) : 6
    const code = normalizeCode(value, count)
    const locked = disabled || props.readOnly || status === "verifying" || status === "success"
    useEffect(() => {
        if (status === "error") input.current?.select()
    }, [status])
    const update = (next: string) => {
        const normalized = normalizeCode(next, count)
        onChange(normalized)
        if (normalized.length === count && normalized !== code) onComplete?.(normalized)
    }
    return (
        <div
            className={cn("passui-one-time-code not-typeset", className)}
            data-status={status}
            style={{ "--otp-length": count, "--otp-middle": (count - 1) / 2 } as CSSProperties}
        >
            <svg aria-hidden="true" width="0" height="0" className="absolute">
                <defs>
                    <filter
                        id={filter}
                        x="-20%"
                        y="-50%"
                        width="140%"
                        height="200%"
                        colorInterpolationFilters="sRGB"
                    >
                        <feGaussianBlur stdDeviation="3" result="smear" />
                        <feColorMatrix
                            in="smear"
                            type="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"
                        />
                    </filter>
                </defs>
            </svg>
            <div className="passui-otp-row" dir="ltr">
                {/* A right code fuses: cells converge on one point while a capsule
                grows there. The filter joins the material, never the digits. */}
                <div
                    aria-hidden="true"
                    className="passui-otp-materials"
                    style={{ filter: `url(#${filter})` }}
                >
                    {Array.from({ length: count }, (_, index) => (
                        <span
                            key={index}
                            className="passui-otp-cell"
                            style={{ "--otp-index": index } as CSSProperties}
                        />
                    ))}
                    <span className="passui-otp-capsule" />
                </div>
                <div aria-hidden="true" className="passui-otp-digits">
                    {Array.from({ length: count }, (_, index) => (
                        <span
                            key={index}
                            className="passui-otp-digit"
                            data-active={index === Math.min(code.length, count - 1) || undefined}
                            style={{ "--otp-index": index } as CSSProperties}
                        >
                            {code[index] && (
                                <span key={`${index}-${code[index]}`} className="passui-otp-glyph">
                                    {code[index]}
                                </span>
                            )}
                        </span>
                    ))}
                </div>
                <CheckIcon aria-hidden="true" className="passui-otp-check" size={24} />
                <input
                    {...props}
                    ref={input}
                    id={id}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]*"
                    maxLength={count}
                    aria-label={label}
                    value={code}
                    disabled={disabled}
                    readOnly={locked}
                    aria-busy={status === "verifying" || undefined}
                    aria-invalid={status === "error" || props["aria-invalid"]}
                    aria-describedby={statusLabel ? `${id}-status` : props["aria-describedby"]}
                    onChange={(event) => update(event.target.value)}
                    onPaste={(event) => {
                        props.onPaste?.(event)
                        if (event.defaultPrevented || locked) return
                        const pasted = event.clipboardData.getData("text")
                        const normalized = normalizeCode(pasted, count)
                        if (normalized && normalized !== pasted) {
                            event.preventDefault()
                            update(normalized)
                        }
                    }}
                    className="passui-otp-input"
                />
            </div>
            {statusLabel && (
                <p
                    id={`${id}-status`}
                    role="status"
                    className={cn(
                        "mt-2 text-footnote",
                        status === "error" ? "text-danger" : "text-label-secondary"
                    )}
                >
                    {statusLabel}
                </p>
            )}
        </div>
    )
}
