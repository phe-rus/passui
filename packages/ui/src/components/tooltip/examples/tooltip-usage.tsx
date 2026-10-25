import { Button } from "@passui/react/button"

export function TooltipUsage() {
    // render one <TooltipHost /> near the root of your app
    return (
        <Button
            variant="secondary"
            data-tooltip="Saves a copy to your downloads"
        >
            Download
        </Button>
    )
}
