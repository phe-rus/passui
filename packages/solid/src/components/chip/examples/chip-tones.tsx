import { Chip } from "@passui/solid/chip"

export function ChipTones() {
    return (
        <div class="flex flex-wrap items-center justify-center gap-2">
            <Chip tone="neutral">Draft</Chip>
            <Chip tone="accent">Featured</Chip>
            <Chip tone="public">Public</Chip>
            <Chip tone="family">Family</Chip>
            <Chip tone="friends">Friends</Chip>
        </div>
    )
}
