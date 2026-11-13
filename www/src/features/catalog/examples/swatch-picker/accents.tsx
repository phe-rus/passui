import { Button } from "@passui/react/button";
import { Progress } from "@passui/react/progress";
import { AccentPicker } from "@passui/react/swatch-picker";
import { Switch } from "@passui/react/switch";
import { Tabs, TabsList, TabsTrigger } from "@passui/react/tabs";

/** Choosing an accent sets `data-accent` on <html>, so every control below retints, and the page too. */
export function SwatchPickerAccents() {
	return (
		<div className="bg-elevated ring-separator/60 flex w-full max-w-sm flex-col items-center gap-5 rounded-4xl p-6 shadow-sm ring-1">
			<AccentPicker label="Accent color" />
			<div className="flex w-full flex-col gap-4">
				<div className="flex items-center justify-between gap-3">
					<Button>Continue</Button>
					<Switch defaultChecked aria-label="Notifications" />
				</div>
				<Progress value={64} aria-label="Storage used" />
				<Progress variant="slosh" label="Volume" defaultValue={55} />
				<Tabs defaultValue="day" variant="line">
					<TabsList>
						<TabsTrigger value="day">Day</TabsTrigger>
						<TabsTrigger value="week">Week</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
		</div>
	);
}
