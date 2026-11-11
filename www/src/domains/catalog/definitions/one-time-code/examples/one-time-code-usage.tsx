import { OneTimeCode } from "@passui/react/one-time-code";
import { useState } from "react";

export function OneTimeCodeUsage() {
	const [value, setValue] = useState("");
	return (
		<div className="w-full max-w-xs">
			<OneTimeCode
				value={value}
				onChange={setValue}
				label="Verification code"
			/>
		</div>
	);
}
