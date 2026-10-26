import type {
    ViewportBaseline,
    ViewportInput,
    ViewportMetrics,
} from "./types"

/** A resized WebView and Safari's overlaid keyboard share one visible rectangle. */
export function viewportMetrics(
    input: ViewportInput,
    baseline: ViewportBaseline
): ViewportMetrics {
    const visibleHeight = Math.min(
        input.height,
        Math.max(0, input.layoutHeight - input.top)
    )
    return {
        width: input.width,
        height: visibleHeight,
        top: input.top,
        left: input.left,
        keyboardOpen:
            input.editing &&
            baseline.height - visibleHeight > 120,
    }
}
