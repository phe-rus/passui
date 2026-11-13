import { Progress } from "@passui/react/progress";
import { Text } from "@passui/react/text";

export function ProgressSizes() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-4">
			{(["sm", "md", "lg"] as const).map((size) => (
				<div key={size} className="flex items-center gap-3">
					<Text size="footnote" tone="secondary" className="w-6">
						{size}
					</Text>
					<Progress size={size} value={62} aria-label={`Upload, ${size}`} />
				</div>
			))}
		</div>
	);
}
