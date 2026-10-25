import { Key01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@passui/react/button"
import { ContentView } from "@passui/react/content-view"

export function ContentViewHeaderAction() {
    return (
        <ContentView className="w-full max-w-sm cursor-default p-5">
            <ContentView.Header
                heading="Passkeys"
                p="2 passkeys on your devices. Sign in with your face or fingerprint."
                icon={
                    <HugeiconsIcon
                        icon={Key01Icon}
                        size={20}
                        className="text-accent-text"
                    />
                }
                action={
                    <Button
                        variant="secondary"
                        size="xs"
                        className="ms-auto"
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
