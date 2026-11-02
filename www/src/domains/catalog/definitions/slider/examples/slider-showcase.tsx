import { useState } from "react"
import { Slider } from "@passui/react/slider"

export function SliderShowcase() {
    const [brightness, setBrightness] = useState(65)
    const [balance, setBalance] = useState(0)
    return (
        <section className="flex w-full max-w-sm flex-col gap-5 rounded-3xl bg-surface p-5">
            <Slider label="Brightness" value={brightness} onChange={setBrightness} />
            <Slider label="Balance" value={balance} onChange={setBalance} min={-50} max={50} />
        </section>
    )
}
