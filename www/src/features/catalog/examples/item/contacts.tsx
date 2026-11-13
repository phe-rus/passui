import { Avatar, AvatarFallback, AvatarImage } from "@passui/react/avatar";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemTitle,
} from "@passui/react/item";

const people = [
	{ name: "Aiko Kamado", note: "Owner", src: "/avatars/aiko.svg", at: "9:41" },
	{
		name: "Kenji Mori",
		note: "Can edit",
		src: "/avatars/kenji.svg",
		at: "Mon",
	},
	{ name: "Mira Sato", note: "Can view", src: "/avatars/mira.svg", at: "Sun" },
];

export function ItemContacts() {
	return (
		<ItemGroup title="Shared with" className="w-full max-w-sm">
			{people.map((person) => (
				<Item key={person.name} chevron render={<button type="button" />}>
					<ItemMedia variant="image">
						<Avatar className="size-full">
							<AvatarImage src={person.src} alt="" />
							<AvatarFallback>{person.name.slice(0, 2)}</AvatarFallback>
						</Avatar>
					</ItemMedia>
					<ItemContent>
						<ItemTitle>{person.name}</ItemTitle>
						<ItemDescription>{person.note}</ItemDescription>
					</ItemContent>
					<ItemActions className="text-footnote">{person.at}</ItemActions>
				</Item>
			))}
		</ItemGroup>
	);
}
