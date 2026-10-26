import { ContentView } from "@passui/solid/content-view"

export function ContentViewStats() {
    return (
        <ContentView class="w-full max-w-sm p-5">
            <ContentView.Section>
                <ContentView.P class="text-footnote text-label-secondary">
                    This month
                </ContentView.P>
                <ContentView.Row class="justify-between gap-4">
                    <div class="flex flex-col">
                        <ContentView.H1 class="text-title font-bold tabular-nums">
                            1,284
                        </ContentView.H1>
                        <ContentView.Span>
                            sign ins
                        </ContentView.Span>
                    </div>
                    <ContentView.Divider />
                    <div class="flex flex-col">
                        <ContentView.H2 class="text-title font-bold tabular-nums">
                            12
                            <ContentView.Sub>
                                %
                            </ContentView.Sub>
                        </ContentView.H2>
                        <ContentView.Span>
                            with passkeys
                        </ContentView.Span>
                    </div>
                </ContentView.Row>
            </ContentView.Section>
        </ContentView>
    )
}
