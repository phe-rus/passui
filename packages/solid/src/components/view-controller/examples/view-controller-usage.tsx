import { ViewController } from "@passui/solid/view-controller"
export function ViewControllerUsage() {
    return (
        <ViewController
            class="py-6"
            heading={
                <ViewController.Heading
                    title="Devices"
                    description="Where you're signed in right now."
                />
            }
        >
            <p class="text-callout text-label-secondary">
                The screen's content goes here.
            </p>
        </ViewController>
    )
}
