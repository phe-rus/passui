import { ViewController } from "@passui/react/view-controller"

export function ViewControllerUsage() {
    return (
        <ViewController
            className="py-6"
            heading={
                <ViewController.Heading
                    title="Devices"
                    description="Where you're signed in right now."
                />
            }
        >
            <p className="text-callout text-label-secondary">
                The screen's content goes here.
            </p>
        </ViewController>
    )
}
