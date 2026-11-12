import {
	FieldCheckbox,
	FieldInput,
	FieldOtp,
	FieldSwitch,
	FieldTextarea,
} from "../../form-fields/fields";
import { FieldMultiselect, FieldRadioCard } from "../../form-fields/selection";
import { FieldAvatar } from "./avatar";

export const fields = {
	input: FieldInput,
	checkbox: FieldCheckbox,
	textarea: FieldTextarea,
	switch: FieldSwitch,
	radioCard: FieldRadioCard,
	multiselect: FieldMultiselect,
	avatar: FieldAvatar,
	otp: FieldOtp,
};

export * from "./avatar";
export * from "./checkbox";
export * from "./input";
export * from "./multiselect";
export * from "./otp";
export * from "./radio-card";
export * from "./switch";
export * from "./textarea";
