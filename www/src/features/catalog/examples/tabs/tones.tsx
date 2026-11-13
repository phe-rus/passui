import { Tabs, TabsList, TabsTrigger } from "@passui/react/tabs";

export function TabsTones() {
	return (
		<div className="flex flex-col items-start gap-4">
			{(["neutral", "accent", "primary"] as const).map((tone) => (
				<Tabs key={tone} defaultValue="day" variant="solid" tone={tone}>
					<TabsList>
						<TabsTrigger value="day">Day</TabsTrigger>
						<TabsTrigger value="week">Week</TabsTrigger>
						<TabsTrigger value="month">Month</TabsTrigger>
					</TabsList>
				</Tabs>
			))}
		</div>
	);
}
