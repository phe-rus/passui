import { SloshSlider } from "@passui/react/slosh-slider"
import { useState } from "react"

export function SloshSliderRigid() {
    const [value, setValue] = useState(62)
    return (
        <div className="w-full max-w-xs">
            <SloshSlider
                value={value}
                onChange={setValue}
                label="Rigid level"
                viscosity={0}
                momentum={0}
            />
        </div>
    )
}
