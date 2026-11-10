import {
    createContext,
    useContext,
    type ComponentPropsWithoutRef,
    type PropsWithChildren,
    type ReactNode,
} from "react"
import { cn } from "../../lib/class-names"

export type ContentViewVariant = keyof typeof variants
export type ContentViewHeadingLevel = "h1" | "h2" | "h3"
export type ContentViewSize = "sm" | "md" | "lg"

const containerRadius: Record<ContentViewSize, string> = {
    sm: "rounded-xl",
    md: "rounded-2xl",
    lg: "rounded-3xl",
}
const sectionGaps: Record<ContentViewSize, string> = {
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
}
const spanText: Record<ContentViewSize, string> = {
    sm: "text-footnote tracking-tighter font-light",
    md: "text-callout tracking-tighter font-light",
    lg: "text-subheadline tracking-tighter font-light",
}
const subText: Record<ContentViewSize, string> = {
    sm: "text-footnote text-label",
    md: "text-subheadline text-label",
    lg: "text-body text-label",
}
const headerActionGaps: Record<ContentViewSize, string> = {
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
}

const ContentViewSizeContext = createContext<ContentViewSize>("md")
const useContentViewSize = () => useContext(ContentViewSizeContext)

type ContentViewProps = ComponentPropsWithoutRef<"section"> & {
    variant?: ContentViewVariant
    /** Container radius, section gap and text scale. @default "md" */
    size?: ContentViewSize
}

type RowProps = ComponentPropsWithoutRef<"div">

type SectionProps = ComponentPropsWithoutRef<"section">

type HeaderProps = PropsWithChildren<{
    heading: string
    p?: string
    pClassName?: string
    icon?: ReactNode
    action?: ReactNode
    actionClassName?: string
    as?: ContentViewHeadingLevel
    className?: string
}>

type H1Props = ComponentPropsWithoutRef<"h1">
type H2Props = ComponentPropsWithoutRef<"h2">
type PProps = ComponentPropsWithoutRef<"p">
type SpanProps = ComponentPropsWithoutRef<"span">
type SubProps = ComponentPropsWithoutRef<"sub">

const variants = {
    elevated: cn(
        "rounded-2xl bg-elevated border border-separator/35",
        "shadow hover:shadow-md cursor-pointer group"
    ),
} as const

export function ContentView({
    variant = "elevated",
    size = "md",
    className,
    children,
    ...props
}: ContentViewProps) {
    return (
        <ContentViewSizeContext value={size}>
            <section
                className={cn(
                    variants[variant],
                    variant === "elevated" && containerRadius[size],
                    className
                )}
                {...props}
            >
                {children}
            </section>
        </ContentViewSizeContext>
    )
}

function Row({ className, children, ...props }: RowProps) {
    return (
        <div className={cn("flex items-center", className)} {...props}>
            {children}
        </div>
    )
}

function Section({ className, children, ...props }: SectionProps) {
    const size = useContentViewSize()
    return (
        <section className={cn("flex flex-col", sectionGaps[size], className)} {...props}>
            {children}
        </section>
    )
}

function Header({
    heading,
    p,
    pClassName,
    icon,
    action,
    actionClassName,
    as: Tag = "h3",
    className,
    children,
}: HeaderProps) {
    const title = (
        <Tag className={cn(icon && "flex items-center gap-2")}>
            {icon}
            {heading}
        </Tag>
    )

    const size = useContentViewSize()
    return (
        <div className={className}>
            {action ? (
                <div className={cn("flex items-center", headerActionGaps[size], actionClassName)}>
                    {title}
                    {action}
                </div>
            ) : (
                title
            )}
            {p && <p className={pClassName}>{p}</p>}
            {children}
        </div>
    )
}

function Divider() {
    return <span className="h-16 w-px bg-separator" />
}

function H1({ className, children, ...props }: H1Props) {
    return (
        <h1 className={className} {...props}>
            {children}
        </h1>
    )
}

function H2({ className, children, ...props }: H2Props) {
    return (
        <h2 className={className} {...props}>
            {children}
        </h2>
    )
}

function P({ className, children, ...props }: PProps) {
    return (
        <p className={cn("leading-tight font-medium", className)} {...props}>
            {children}
        </p>
    )
}

function Span({ className, children, ...props }: SpanProps) {
    const size = useContentViewSize()
    return (
        <span className={cn(spanText[size], className)} {...props}>
            {children}
        </span>
    )
}

function Sub({ className, children, ...props }: SubProps) {
    const size = useContentViewSize()
    return (
        <sub className={cn(subText[size], className)} {...props}>
            {children}
        </sub>
    )
}

ContentView.Row = Row
ContentView.Section = Section
ContentView.Header = Header
ContentView.Divider = Divider
ContentView.H1 = H1
ContentView.H2 = H2
ContentView.P = P
ContentView.Span = Span
ContentView.Sub = Sub
