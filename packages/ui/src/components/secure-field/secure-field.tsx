import {
    TextField,
    type TextFieldProps,
} from "../text-field/text-field"

/** TextField's native input props, with the password type managed by SecureField. */
export type SecureFieldProps = Omit<TextFieldProps, "type">

export function SecureField(props: SecureFieldProps) {
    return <TextField {...props} type="password" />
}
