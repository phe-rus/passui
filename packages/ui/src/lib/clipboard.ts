/**
 * Copies text after a user action. Returns true only after the browser confirms
 * the write. Returns false when unavailable or denied, so the app can offer
 * manual copying. This helper never reads the clipboard or adds feedback.
 */
export async function copyText(
    text: string
): Promise<boolean> {
    try {
        if (
            typeof navigator === "undefined" ||
            !navigator.clipboard?.writeText
        )
            return false
        await navigator.clipboard.writeText(text)
        return true
    } catch {
        return false
    }
}
