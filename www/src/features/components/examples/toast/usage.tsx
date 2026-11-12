import { Button } from "@passui/react/button";
import { Toaster, toast } from "@passui/react/toast";

export function ToastUsage() {
	return (
		<>
			<Button
				onClick={() =>
					toast.success({
						title: "Saved",
						description: "Your changes are live.",
					})
				}
			>
				Show toast
			</Button>
			<Toaster />
		</>
	);
}
