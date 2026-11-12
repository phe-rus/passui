import { LabeledContent } from "@passui/react/labeled-content";
import { Switch } from "@passui/react/switch";
import { useState } from "react";

export function LabeledContentUsage() {
	const [previews, setPreviews] = useState(true);
	return (
		<div className="border-separator/60 bg-elevated w-full max-w-sm rounded-3xl border">
			<LabeledContent
				label="Show previews"
				description="Shows the first lines of each note."
			>
				<Switch
					aria-label="Show previews"
					checked={previews}
					onCheckedChange={setPreviews}
				/>
			</LabeledContent>
		</div>
	);
}
