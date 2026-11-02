import { WakeSlider } from "@passui/react/wake-slider"
import { useState } from "react"

export function WakeSliderDisabled() {
    const [value, setValue] = useState(50)
    return (
        <div className="w-full max-w-xs">
            <WakeSlider value={value} onChange={setValue} label="Unavailable seeker" disabled />
        </div>
    )
}
