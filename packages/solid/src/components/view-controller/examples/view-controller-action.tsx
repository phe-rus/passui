import { Button } from "@passui/solid/button"
import { ViewController } from "@passui/solid/view-controller"

export function ViewControllerAction() {
    return (
        <ViewController
            class="w-full max-w-lg py-6"
            heading={
                <ViewController.Heading
                    title="Applications"
                    description="Apps that sign people in with Pass."
                    action={
                        <Button
                            variant="accent"
                            size="sm"
                            class="ms-auto"
                        >
                            New application
                        </Button>
                    }
                />
            }
        >
            <div class="h-24 rounded-3xl bg-fill/60" />
        </ViewController>
    )
}
