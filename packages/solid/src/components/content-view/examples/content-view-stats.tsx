import { ContentView } from "@passui/solid/content-view"

export function ContentViewStats() {
    return (
        <ContentView class="w-full max-w-sm p-5">
            <ContentView.Header
                heading="Activity"
                p="Your week at a glance"
            />
            <ContentView.Row class="mt-5 justify-between">
                <ContentView.P>32 tasks</ContentView.P>
                <ContentView.Span>+12%</ContentView.Span>
            </ContentView.Row>
            <ContentView.Row class="mt-2 justify-between">
                <ContentView.P>8 projects</ContentView.P>
                <ContentView.Span>+2</ContentView.Span>
            </ContentView.Row>
        </ContentView>
    )
}
