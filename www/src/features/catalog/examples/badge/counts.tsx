import { Badge } from "@passui/react/badge";
import { Text } from "@passui/react/text";

export function BadgeCounts() {
	return (
		<div className="flex flex-col gap-3">
			{[
				["Inbox", "12"],
				["Drafts", "3"],
				["Spam", "99+"],
			].map(([label, count]) => (
				<div key={label} className="flex w-48 items-center justify-between">
					<Text as="span">{label}</Text>
					<Badge variant="secondary">{count}</Badge>
				</div>
			))}
		</div>
	);
}
