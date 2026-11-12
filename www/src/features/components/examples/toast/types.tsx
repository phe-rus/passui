import { Button } from "@passui/react/button";
import { Toaster, toast } from "@passui/react/toast";

export function ToastTypes() {
	return (
		<>
			<div className="flex flex-wrap gap-2">
				<Button
					variant="outline"
					onClick={() => toast.error({ title: "Couldn't save" })}
				>
					Error
				</Button>
				<Button
					variant="outline"
					onClick={() => toast.warning({ title: "Storage almost full" })}
				>
					Warning
				</Button>
				<Button
					variant="outline"
					onClick={() => toast.info({ title: "Update available" })}
				>
					Info
				</Button>
			</div>
			<Toaster />
		</>
	);
}
