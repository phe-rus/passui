import { MailIcon } from "@passui/icons/mail";
import { SearchIcon } from "@passui/icons/search";
import { Input } from "@passui/react/input";

export function InputFloatingIcon() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-4">
			<Input
				variant="floating"
				label="Email"
				type="email"
				leading={<MailIcon size={16} />}
			/>
			<Input
				variant="floating"
				label="Search people"
				size="lg"
				leading={<SearchIcon size={18} />}
			/>
		</div>
	);
}
