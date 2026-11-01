import { Slider } from "@passui/react/slider"

export function SliderDisabled() {
    return (
        <Slider
            label="Managed volume"
            value={30}
            onChange={() => {}}
            disabled
            description="Controlled by your administrator."
        />
    )
}
