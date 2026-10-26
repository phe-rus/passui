import { ViewController } from "@passui/solid/view-controller"
export function ViewControllerUsage() {
    return (
        <ViewController
            class="py-6"
            heading={
                <ViewController.Heading
                    title="Settings"
                    description="Make this space yours."
                />
            }
        >
            <p>Your preferences live here.</p>
        </ViewController>
    )
}
