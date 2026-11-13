import { Button } from "@passui/react/button";
import { Input } from "@passui/react/input";
import { Layout } from "@passui/react/layout";
import { toast } from "@passui/react/toast";
import { useState } from "react";

export function LayoutShowcase() {
	const [email, setEmail] = useState("");

	return (
		<div className="bg-elevated ring-separator/60 w-full max-w-sm rounded-4xl px-6 shadow-sm ring-1">
			<Layout
				className="gap-6 py-8"
				heading={
					<Layout.Heading
						size="compact"
						title="Sign in"
						description="Use your Pass account."
					/>
				}
			>
				<form
					className="flex flex-col gap-4"
					onSubmit={(event) => {
						event.preventDefault();
						toast.success({ title: "Check your email" });
					}}
				>
					<Input
						aria-label="Email"
						type="email"
						placeholder="you@example.com"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<Button type="submit">Continue</Button>
				</form>
			</Layout>
		</div>
	);
}
