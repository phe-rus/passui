import { LaptopIcon } from "@passui/icons/laptop";
import { SmartphoneIcon } from "@passui/icons/smartphone";
import { TabletIcon } from "@passui/icons/tablet";
import { Button } from "@passui/react/button";
import { Checkbox } from "@passui/react/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@passui/react/table";
import { useState } from "react";

const devices = [
	{
		id: "mac",
		name: "MacBook Air",
		icon: LaptopIcon,
		seen: "Now",
	},
	{
		id: "phone",
		name: "iPhone 16",
		icon: SmartphoneIcon,
		seen: "2 hours ago",
	},
	{
		id: "tablet",
		name: "iPad mini",
		icon: TabletIcon,
		seen: "3 weeks ago",
	},
];

export function TableSelection() {
	const [selected, setSelected] = useState<string[]>(["tablet"]);
	const all = selected.length === devices.length;

	function toggle(id: string, checked: boolean) {
		setSelected((current) =>
			checked ? [...current, id] : current.filter((item) => item !== id),
		);
	}

	return (
		<div className="bg-elevated ring-separator/60 flex w-full max-w-lg flex-col gap-3 rounded-4xl p-4 shadow-sm ring-1">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-10">
							<Checkbox
								aria-label="Select all devices"
								checked={selected.length > 0 && !all ? "indeterminate" : all}
								onCheckedChange={(checked) =>
									setSelected(
										checked === true ? devices.map((device) => device.id) : [],
									)
								}
							/>
						</TableHead>
						<TableHead>Device</TableHead>
						<TableHead>Last seen</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{devices.map((device) => {
						const isSelected = selected.includes(device.id);
						return (
							<TableRow
								key={device.id}
								data-state={isSelected ? "selected" : undefined}
							>
								<TableCell>
									<Checkbox
										aria-label={`Select ${device.name}`}
										checked={isSelected}
										onCheckedChange={(checked) =>
											toggle(device.id, checked === true)
										}
									/>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-3">
										<span className="bg-fill text-label-secondary flex size-8 items-center justify-center rounded-full">
											<device.icon size={18} />
										</span>
										<span className="text-subheadline text-label font-medium">
											{device.name}
										</span>
									</div>
								</TableCell>
								<TableCell className="text-label-secondary">
									{device.seen}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			<div className="flex items-center justify-between px-2">
				<span className="text-footnote text-label-secondary">
					{selected.length} selected
				</span>
				<Button
					variant="destructive"
					size="sm"
					disabled={selected.length === 0}
				>
					Sign out
				</Button>
			</div>
		</div>
	);
}
