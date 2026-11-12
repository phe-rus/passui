import { toast } from "@passui/react";
import { Button } from "@passui/react/legacy/button";
import { TextField } from "@passui/react/text-field";
import { useState } from "react";

export function TextFieldShowcase() {
	const [name, setName] = useState("Aiko Kamado");
	const [role, setRole] = useState("Product designer");
	const [site, setSite] = useState("");

	return (
		<form
			className="bg-elevated ring-separator/60 flex w-full max-w-sm flex-col gap-4 rounded-4xl p-6 shadow-sm ring-1"
			onSubmit={(event) => {
				event.preventDefault();
				toast.success("Profile updated");
			}}
		>
			<h2 className="text-headline text-label font-semibold">Edit profile</h2>
			<TextField
				labelPlacement="floating"
				placeholder="Your name"
				label="Name"
				value={name}
				onChange={(event) => setName(event.target.value)}
			/>
			<TextField
				labelPlacement="floating"
				placeholder="Your role"
				label="Role"
				value={role}
				onChange={(event) => setRole(event.target.value)}
			/>
			<TextField
				labelPlacement="floating"
				label="Website"
				placeholder="example.com"
				description="Shown on your public profile."
				value={site}
				onChange={(event) => setSite(event.target.value)}
			/>
			<Button type="submit" variant="accent">
				Save profile
			</Button>
		</form>
	);
}
