import { createSignal } from "solid-js"
import { ContentView } from "@passui/solid/content-view"
import { Button } from "@passui/solid/button"

export function ContentViewHeaderAction() {
    const [expanded, setExpanded] = createSignal(false)
    return (
        <ContentView class="w-full max-w-sm p-5">
            <ContentView.Header
                heading="Your projects"
                p="Keep work moving"
            />
            <Button
                size="sm"
                variant="secondary"
                onClick={() => setExpanded(!expanded())}
            >
                {expanded() ? "Show less" : "View all"}
            </Button>
            <ContentView.P class="mt-3">
                {expanded()
                    ? "Website, Dashboard, Identity"
                    : "3 active projects"}
            </ContentView.P>
        </ContentView>
    )
}
