import { ContentView } from "@passui/react/content-view"

export function ContentViewStats() {
    return (
        <ContentView className="w-full max-w-sm p-5">
            <ContentView.Section>
                <ContentView.P className="text-footnote text-label-secondary">
                    This month
                </ContentView.P>
                <ContentView.Row className="justify-between gap-4">
                    <div className="flex flex-col">
                        <ContentView.H1 className="text-title font-bold tabular-nums">
                            1,284
                        </ContentView.H1>
                        <ContentView.Span>
                            sign ins
                        </ContentView.Span>
                    </div>
                    <ContentView.Divider />
                    <div className="flex flex-col">
                        <ContentView.H2 className="text-title font-bold tabular-nums">
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
