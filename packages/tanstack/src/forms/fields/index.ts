import {
    FieldInput,
    FieldCheckbox,
    FieldTextarea,
    FieldSwitch,
    FieldOtp,
} from "../../form-fields/fields"
import { FieldRadioCard, FieldMultiselect } from "../../form-fields/selection"
import { FieldAvatar } from "./avatar"

export const fields = {
    input: FieldInput,
    checkbox: FieldCheckbox,
    textarea: FieldTextarea,
    switch: FieldSwitch,
    radioCard: FieldRadioCard,
    multiselect: FieldMultiselect,
    avatar: FieldAvatar,
    otp: FieldOtp,
}

export * from "./input"
export * from "./checkbox"
export * from "./textarea"
export * from "./switch"
export * from "./radio-card"
export * from "./multiselect"
export * from "./avatar"
export * from "./otp"
