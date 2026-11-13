import { InputOTP } from "@passui/react/input-otp";
import { Text } from "@passui/react/text";
import { useState } from "react";

export function InputOtpComplete() {
	const [code, setCode] = useState("");
	return (
		<div className="flex flex-col gap-3">
			<InputOTP length={4} onComplete={setCode} aria-label="PIN" />
			<Text size="footnote" tone="secondary">
				{code ? `Entered ${code}` : "Waiting for four digits"}
			</Text>
		</div>
	);
}
