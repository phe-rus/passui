import { Button } from "@passui/react/button";
import { Toaster, toast } from "@passui/react/toast";

export function ToastPromise() {
	return (
		<>
			<Button
				onClick={() =>
					toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
						loading: { title: "Uploading…" },
						success: { title: "Uploaded" },
						error: { title: "Upload failed" },
					})
				}
			>
				Upload
			</Button>
			<Toaster />
		</>
	);
}
