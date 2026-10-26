import { createFormHook } from "@tanstack/solid-form"
import { fieldContext, formContext } from "./contexts"
import {
    FieldInput,
    FieldCheckbox,
    FieldTextarea,
    FieldSwitch,
    FieldOtp,
    FieldRadioCard,
    FieldMultiselect,
} from "../form-fields/fields"
import { FieldAvatar } from "../form-fields/avatar"
import { Submit } from "../form-fields/submit"
export const { useAppForm, withForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        input: FieldInput,
        avatar: FieldAvatar,
        checkbox: FieldCheckbox,
        textarea: FieldTextarea,
        switch: FieldSwitch,
        otp: FieldOtp,
        radioCard: FieldRadioCard,
        multiselect: FieldMultiselect,
    },
    formComponents: { submit: Submit },
})
export { useAppForm as createAppForm }
export { useStore, useSelector } from "@tanstack/solid-form"
export * from "../form-fields"
export * from "./form-alert"
