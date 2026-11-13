import { InputOTP } from "@passui/react/input-otp";

export function InputOtpDisabled() {
	return <InputOTP length={6} disabled aria-label="Verification code" />;
}
