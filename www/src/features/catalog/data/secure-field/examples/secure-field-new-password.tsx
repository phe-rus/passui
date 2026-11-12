import { toast } from "@passui/react";
import { Button } from "@passui/react/button";
import { SecureField } from "@passui/react/secure-field";
import { useState } from "react";

export function SecureFieldNewPassword() {
	const [next, setNext] = useState("");
	const [again, setAgain] = useState("");
	const short = next.length > 0 && next.length < 12;
	const differs = again.length > 0 && again !== next;

	return (
		<form
			className="bg-elevated ring-separator/60 flex w-full max-w-sm flex-col gap-4 rounded-4xl p-6 shadow-sm ring-1"
			onSubmit={(event) => {
				event.preventDefault();
				toast.success("Password changed");
			}}
		>
			<SecureField
				label="New password"
				autoComplete="new-password"
				description="At least 12 characters."
				errors={short ? ["Use at least 12 characters."] : []}
				value={next}
				onChange={(event) => setNext(event.target.value)}
			/>
			<SecureField
				label="Confirm password"
				autoComplete="new-password"
				errors={differs ? ["The passwords don't match."] : []}
				value={again}
				onChange={(event) => setAgain(event.target.value)}
			/>
			<Button
				type="submit"
				variant="accent"
				disabled={!next || short || differs || !again}
			>
				Change password
			</Button>
		</form>
	);
}
