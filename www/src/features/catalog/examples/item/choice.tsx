import { CheckIcon } from "@passui/icons/check";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemGroup,
	ItemTitle,
} from "@passui/react/item";
import { useState } from "react";

const qualities = ["Standard", "High", "Original"];

export function ItemChoice() {
	const [chosen, setChosen] = useState("High");

	return (
		<ItemGroup
			title="Photo quality"
			footer={`${chosen} is used for new uploads.`}
			className="w-full max-w-sm"
		>
			{qualities.map((quality) => (
				<Item
					key={quality}
					render={
						<button
							type="button"
							aria-pressed={chosen === quality}
							onClick={() => setChosen(quality)}
						/>
					}
				>
					<ItemContent>
						<ItemTitle>{quality}</ItemTitle>
					</ItemContent>
					<ItemActions className="text-accent-text">
						{chosen === quality ? <CheckIcon size={18} /> : null}
					</ItemActions>
				</Item>
			))}
		</ItemGroup>
	);
}
