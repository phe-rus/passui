import { Combobox } from "@passui/react/combobox";

const countries = [
	"Argentina",
	"Brazil",
	"Canada",
	"Denmark",
	"Egypt",
	"Finland",
	"Ghana",
	"Hungary",
	"Iceland",
	"Japan",
	"Kenya",
	"Lebanon",
].map((name) => ({ value: name.toLowerCase(), label: name }));

export function ComboboxMany() {
	return (
		<Combobox
			aria-label="Country"
			placeholder="Search countries"
			items={countries}
		/>
	);
}
