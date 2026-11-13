import { Kbd } from "@passui/react/kbd";

export function KbdKeys() {
	return (
		<div className="flex flex-wrap gap-2">
			{["Esc", "Tab", "Enter", "Space", "↑", "↓"].map((key) => (
				<Kbd key={key}>{key}</Kbd>
			))}
		</div>
	);
}
