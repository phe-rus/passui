import { Button } from "@passui/react/button";
import { Toaster, toast } from "@passui/react/toast";

const sizes = ["sm", "md", "lg"] as const;

/** `size` scales the pill, its padding and its text together. */
export function ToastSizes() {
	return (
		<>
			<div className="flex flex-wrap gap-3">
				{sizes.map((size) => (
					<Button
						key={size}
						variant="outline"
						onClick={() =>
							toast.success(`Saved (${size})`, {
								description: "Your changes are live.",
								size,
							})
						}
					>
						{size}
					</Button>
				))}
			</div>
			<Toaster />
		</>
	);
}
