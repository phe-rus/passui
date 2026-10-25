export type ButtonVariant =
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "accent"

export type ButtonSize =
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg"
    | "icon-full"

export type IconButtonSize =
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg"

export const buttonVariants: Record<ButtonVariant, string> = {
    default:
        "bg-inverse text-on-inverse shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_1px_2px_rgb(0_0_0/0.18),0_6px_16px_-6px_rgb(0_0_0/0.35)] hover:brightness-[1.12]",
    destructive:
        "bg-danger text-background shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_1px_2px_rgb(0_0_0/0.18),0_6px_16px_-6px_rgb(0_0_0/0.35)] hover:brightness-[1.08]",
    outline:
        "border border-separator bg-transparent text-label hover:bg-fill/60",
    secondary:
        "bg-elevated text-label shadow-[inset_0_0_0_0.5px_color-mix(in_srgb,var(--color-separator)_55%,transparent),0_1px_2px_rgb(40_30_0/0.06)] hover:bg-fill/60",
    ghost: "bg-transparent text-label hover:bg-fill/80",
    link: "bg-transparent text-accent-text underline-offset-4 hover:underline",
    accent: "bg-accent text-on-accent ring-1 ring-accent-text/25 shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_1px_2px_rgb(60_40_0/0.16),0_6px_16px_-6px_color-mix(in_srgb,var(--color-accent)_70%,transparent)] hover:brightness-[1.04]",
}

export const buttonSizes: Record<ButtonSize, string> = {
    default: "h-11 px-5 text-subheadline rounded-full",
    xs: "h-8 px-3 text-caption rounded-full",
    sm: "h-9 px-4 text-subheadline rounded-full",
    lg: "h-12 px-6 text-body rounded-full",
    icon: "size-11 p-0 rounded-full",
    "icon-xs": "size-8 p-0 rounded-full",
    "icon-sm": "size-9 p-0 rounded-full",
    "icon-lg": "size-12 p-0 rounded-full",
    "icon-full":
        "h-11 w-full px-5 text-subheadline rounded-full",
}

export const iconButtonSizes: Record<IconButtonSize, string> =
    {
        icon: "size-11",
        "icon-xs": "size-8",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
    }
