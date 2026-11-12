import { Chart } from "@passui/react/chart";

const data = [
	{ month: "Jan", visits: 1200, signups: 180 },
	{ month: "Feb", visits: 1900, signups: 260 },
	{ month: "Mar", visits: 1600, signups: 240 },
	{ month: "Apr", visits: 2400, signups: 390 },
	{ month: "May", visits: 2100, signups: 330 },
	{ month: "Jun", visits: 3000, signups: 470 },
];

export function ChartUsage() {
	return (
		<Chart
			label="Monthly visits"
			type="line"
			data={data}
			xKey="month"
			series={[{ key: "visits", label: "Visits" }]}
		/>
	);
}
