/** A language's name in itself, capitalized: "Français", "中文". */
export function getNativeLanguageName(tag: string) {
    const name = new Intl.DisplayNames([tag], {
        type: "language",
    }).of(tag)
    return name
        ? name.charAt(0).toUpperCase() + name.slice(1)
        : tag
}

/** A language's name as read in `displayLocale`: "French" in English. */
export function getLocalizedLanguageName(
    tag: string,
    displayLocale: string
) {
    return (
        new Intl.DisplayNames([displayLocale], {
            type: "language",
        }).of(tag) ?? tag
    )
}
