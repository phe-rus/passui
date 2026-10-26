/** @jsxImportSource solid-js */
import {
    TextField,
    type TextFieldProps,
} from "../text-field/text-field"
export function SecureField(
    props: Omit<TextFieldProps, "type">
) {
    return <TextField {...props} type="password" />
}
