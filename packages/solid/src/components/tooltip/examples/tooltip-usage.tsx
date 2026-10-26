import { TooltipHost } from "@passui/solid/tooltip"
import { Button } from "@passui/solid/button"
export function TooltipUsage() {
    return (
        <>
            <Button
                variant="secondary"
                data-tooltip="Saves a copy to your downloads"
            >
                Download
            </Button>
            <TooltipHost />
        </>
    )
}
