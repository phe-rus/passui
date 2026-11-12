import { OneTimeCode } from "@passui/react/one-time-code";
import { useState } from "react";

export function OneTimeCodeFourDigits() {
	const [value, setValue] = useState("");
	return (
		<div className="w-full max-w-xs">
			<OneTimeCode
				value={value}
				onChange={setValue}
				label="Four-digit code"
				length={4}
			/>
		</div>
	);
}
