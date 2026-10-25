import { ContentView } from "@passui/react/content-view"

export function ContentViewUsage() {
    return (
        <ContentView className="w-72 p-5">
            <ContentView.Header
                heading="Passkeys"
                p="Sign in with your face or fingerprint."
                className="flex flex-col gap-1"
                pClassName="text-footnote text-label-secondary"
            />
        </ContentView>
    )
}
