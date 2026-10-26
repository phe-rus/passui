import { ContentView } from "@passui/solid/content-view"
export function ContentViewUsage() {
    return (
        <ContentView class="w-full max-w-sm p-5">
            <ContentView.Header
                heading="This week"
                p="Your activity at a glance"
            />
            <ContentView.Row class="mt-4 gap-4">
                <ContentView.P>24</ContentView.P>
                <ContentView.Span>
                    tasks completed
                </ContentView.Span>
            </ContentView.Row>
        </ContentView>
    )
}
