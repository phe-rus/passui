import { Sheet } from "../sheet/sheet"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Button } from "../button/button"
import { cn } from "../../lib/class-names"
import { contentCrossfade, spring, zoomReveal } from "../../motion/transitions"
import { createContext, useContext, useId, type FormEvent, type ReactNode } from "react"

const CloseContext = createContext<() => void>(() => {})
export type DialogPresentation = "drawer" | "center" | "inline"
export type DialogTone = "default" | "destructive"

export type DialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: ReactNode
    description?: ReactNode
    children?: ReactNode
    footer?: ReactNode
    /** `drawer` (responsive sheet), `center` (floating panel), or `inline`. @default "drawer" */
    presentation?: DialogPresentation
    className?: string
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void
}
type ActionsProps = {
    submitLabel: ReactNode
    cancelLabel: ReactNode
    pending?: boolean
    disabled?: boolean
    tone?: DialogTone
    onConfirm?: () => void
}

export function Dialog({
    open,
    onOpenChange,
    title,
    description,
    children,
    footer,
    presentation = "drawer",
    className,
    onSubmit,
}: DialogProps) {
    const titleId = useId()
    const reducedMotion = useReducedMotion()
    const close = () => onOpenChange(false)
    const content = (
        <>
            {presentation !== "inline" && (
                <h2 id={titleId} className="text-title3 font-semibold">
                    {title}
                </h2>
            )}
            {description && <div className="text-footnote text-label-secondary">{description}</div>}
            {children && <div className="flex flex-col gap-4">{children}</div>}
            {footer && <div className="flex flex-wrap justify-end gap-2 pt-3">{footer}</div>}
        </>
    )
    const body = (
        <CloseContext value={close}>
            {onSubmit ? (
                <form
                    onSubmit={onSubmit}
                    className={cn("flex min-h-0 flex-col gap-4 overflow-y-auto p-5", className)}
                >
                    {content}
                </form>
            ) : (
                <div className={cn("flex min-h-0 flex-col gap-4 overflow-y-auto p-5", className)}>
                    {content}
                </div>
            )}
        </CloseContext>
    )
    if (presentation === "inline")
        return (
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key={titleId}
                        initial={{
                            height: reducedMotion ? "auto" : 0,
                            opacity: 0,
                            scale: reducedMotion ? 1 : 0.97,
                        }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            height: reducedMotion ? "auto" : 0,
                            opacity: 0,
                            scale: reducedMotion ? 1 : 0.98,
                        }}
                        transition={reducedMotion ? { duration: 0 } : spring.bouncy}
                        className="overflow-hidden"
                        style={{ transformOrigin: "top center" }}
                    >
                        <motion.div
                            initial={reducedMotion ? false : contentCrossfade.initial}
                            animate={reducedMotion ? undefined : contentCrossfade.animate}
                            transition={
                                reducedMotion ? { duration: 0 } : contentCrossfade.transition
                            }
                        >
                            {body}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        )
    return (
        <Sheet
            open={open}
            onClose={close}
            label=""
            labelledBy={titleId}
            placement={presentation === "center" ? "center" : "adaptive"}
        >
            {body}
        </Sheet>
    )
}

/** The standard footer: a primary action and a cancel that closes the dialog. */
function Actions({
    submitLabel,
    cancelLabel,
    pending = false,
    disabled = false,
    tone = "default",
    onConfirm,
}: ActionsProps) {
    const close = useContext(CloseContext)
    return (
        <>
            <Button
                type={onConfirm ? "button" : "submit"}
                variant={tone === "destructive" ? "ghost" : "default"}
                className={tone === "destructive" ? "bg-danger/10 text-danger" : undefined}
                isPending={pending}
                disabled={disabled}
                onClick={onConfirm}
            >
                {submitLabel}
            </Button>
            <Button type="button" variant="secondary" onClick={close}>
                {cancelLabel}
            </Button>
        </>
    )
}

Dialog.Actions = Actions
