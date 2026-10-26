import { Chip } from "@passui/solid/chip"

export function ChipInRows() {
    return (
        <div class="flex w-full max-w-sm flex-col divide-y divide-separator/60">
            <div class="flex items-center justify-between py-3">
                <span>Project access</span>
                <Chip tone="public">Public</Chip>
            </div>
            <div class="flex items-center justify-between py-3">
                <span>Family album</span>
                <Chip tone="family">Family</Chip>
            </div>
            <div class="flex items-center justify-between py-3">
                <span>Private notes</span>
                <Chip>Personal</Chip>
            </div>
        </div>
    )
}
