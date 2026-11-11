import { Picker, type PickerOption, type PickerProps } from "../picker/picker";

export interface ComboBoxOption<T extends string> extends PickerOption<T> {}
export interface ComboBoxProps<T extends string>
	extends Omit<PickerProps<T>, "searchable" | "options"> {
	options: readonly ComboBoxOption<T>[];
	emptyLabel: string;
}

/** A searchable Picker, with optional creation from the person's typed query. */
export function ComboBox<T extends string>(props: ComboBoxProps<T>) {
	return <Picker {...props} searchable />;
}
