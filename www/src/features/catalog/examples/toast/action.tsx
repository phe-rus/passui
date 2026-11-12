import { Button } from "@passui/react/button";
import { Toaster, toast } from "@passui/react/toast";

/** An action sits in the toast; choosing it runs your handler and the toast stays until it times out. */
export function ToastAction() {
	return (
		<>
			<Button
				variant="outline"
				onClick={() =>
					toast("Note archived", {
						description: "It stays in Archive for 30 days.",
						action: { label: "Undo", onClick: () => toast.success("Restored") },
					})
				}
			>
				Archive note
			</Button>
			<Toaster />
		</>
	);
}
