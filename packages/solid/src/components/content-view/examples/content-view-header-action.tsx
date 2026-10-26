import { ContentView } from "@passui/solid/content-view"
import { Button } from "@passui/solid/button"

export function ContentViewHeaderAction() {
    return (
        <ContentView class="w-full max-w-sm cursor-default p-5">
            <ContentView.Header
                heading="Passkeys"
                p="2 passkeys on your devices. Sign in with your face or fingerprint."
                icon={
                    <span
                        aria-hidden="true"
                        class="text-accent-text"
                    >
                        ⚿
                    </span>
                }
                action={
                    <Button
                        variant="secondary"
                        size="xs"
                        class="ms-auto"
                    >
                        Add
                    </Button>
                }
                className="flex flex-col gap-2"
                pClassName="text-footnote text-label-secondary"
            />
        </ContentView>
    )
}
