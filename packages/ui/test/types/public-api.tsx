import { createRef } from "react"
import {
    Button,
    type ButtonVariant,
} from "@passui/react/button"
import { IconButton } from "@passui/react/icon-button"
import { SettingsIcon } from "@passui/react/icons"
import {
    Picker,
    type PickerProps,
} from "@passui/react/picker"
import {
    SegmentedControl,
    type SegmentedControlProps,
} from "@passui/react/segmented-control"

/** Compiled by the package typecheck through consumer-facing export paths. */
export function publicApiTypes() {
    const ref = createRef<HTMLButtonElement>()
    const variant: ButtonVariant = "accent"
    const button = (
        <Button
            ref={ref}
            variant={variant}
            size="sm"
            onClick={(event) => event.currentTarget.focus()}
        >
            Save
        </Button>
    )
    const icon = (
        <IconButton ref={ref} label="Settings">
            <SettingsIcon size={18} />
        </IconButton>
    )
    // @ts-expect-error fixed options must not widen to string
    const invalid = <Button variant="unknown" />
    const unnamed = (
        // @ts-expect-error icon actions require an accessible label
        <IconButton>
            <SettingsIcon />
        </IconButton>
    )
    const wrongRef = (
        // @ts-expect-error button refs must target the native element
        <Button ref={createRef<HTMLAnchorElement>()} />
    )
    type Choice = "personal" | "team"
    const props: PickerProps<Choice> = {
        label: "Workspace",
        value: "personal",
        options: [
            { value: "personal", label: "Personal" },
            { value: "team", label: "Team" },
        ],
        onChange(value) {
            const choice: Choice = value
            void choice
        },
    }
    const segments: SegmentedControlProps<Choice> = props
    const picker = <Picker {...props} />
    const segmented = <SegmentedControl {...segments} />
    const choices = [
        { value: "personal", label: "Personal" },
        { value: "team", label: "Team" },
    ] as const
    const inferred = (
        <Picker
            label="Workspace"
            options={choices}
            value="team"
            onChange={(value) => {
                const choice: Choice = value
                void choice
            }}
        />
    )
    const outsideOptions = (
        <Picker<Choice>
            label="Workspace"
            options={choices}
            // @ts-expect-error values outside an explicitly bounded choice are rejected
            value="other"
            onChange={() => {}}
        />
    )
    return {
        button,
        icon,
        invalid,
        unnamed,
        wrongRef,
        picker,
        segmented,
        inferred,
        outsideOptions,
    }
}
