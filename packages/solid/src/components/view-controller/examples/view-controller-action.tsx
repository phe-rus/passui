import { createSignal } from "solid-js"
import { Button } from "@passui/solid/button"
import { ViewController } from "@passui/solid/view-controller"

export function ViewControllerAction() {
    const [saved, setSaved] = createSignal(false)
    return (
        <ViewController
            class="w-full max-w-lg py-4"
            heading={
                <ViewController.Heading
                    title="Workspace"
                    description="Manage team preferences."
                />
            }
        >
            <div class="flex items-center justify-between gap-3">
                <p class="text-footnote">
                    {saved()
                        ? "All changes saved"
                        : "Some changes are pending"}
                </p>
                <Button
                    size="sm"
                    onClick={() => setSaved(true)}
                >
                    Save
                </Button>
            </div>
        </ViewController>
    )
}
