import { LabeledContent, Section } from "@passui/react";
import { Button } from "@passui/react/button";
import { Sheet } from "@passui/react/sheet";
import { CheckIcon } from "@passui/react/icons";
import { haptic } from "@passui/react";
import { useRef, useState } from "react";

const languages = ["English", "Français", "Deutsch", "日本語", "中文"];

export function SheetChoices() {
	const [open, setOpen] = useState(false);
	const [language, setLanguage] = useState("English");
	const triggerRef = useRef<HTMLButtonElement>(null);

	return (
		<div className="w-full max-w-sm">
			<Section>
				<LabeledContent label="Language">
					<Button
						variant="ghost"
						size="sm"
						ref={triggerRef}
						onClick={() => setOpen(true)}
					>
						{language}
					</Button>
				</LabeledContent>
			</Section>
			<Sheet
				open={open}
				onClose={() => setOpen(false)}
				label="Language"
				sourceRef={triggerRef}
			>
				<div className="flex flex-col gap-1 p-4">
					{languages.map((item) => (
						<Button
							key={item}
							type="button"
							variant="ghost"
							aria-pressed={item === language}
							onClick={() => {
								haptic("selection");
								setLanguage(item);
								setOpen(false);
							}}
							className="w-full justify-between"
						>
							{item}
							{item === language && <CheckIcon size={18} />}
						</Button>
					))}
				</div>
			</Sheet>
		</div>
	);
}
