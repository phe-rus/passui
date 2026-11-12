import { SettingsIcon } from "@passui/icons/settings";
import { Badge } from "@passui/react/badge";
import { Button, type ButtonVariant } from "@passui/react/button";
import {
	SegmentedControl,
	type SegmentedControlProps,
} from "@passui/react/segmented-control";
import { Select, type SelectProps } from "@passui/react/select";
import { createRef } from "react";

/** Compiled by the package typecheck through consumer-facing export paths. */
export function publicApiTypes() {
	const ref = createRef<HTMLButtonElement>();
	const variant: ButtonVariant = "destructive";
	const button = (
		<Button
			ref={ref}
			variant={variant}
			size="icon"
			aria-label="Settings"
			onClick={(event) => event.currentTarget.focus()}
		>
			<SettingsIcon size={18} />
		</Button>
	);
	// @ts-expect-error fixed options must not widen to string
	const invalid = <Button variant="unknown" />;
	// @ts-expect-error badge variants are a closed set
	const badBadge = <Badge variant="loud" />;
	const wrongRef = (
		// @ts-expect-error button refs must target the native element
		<Button ref={createRef<HTMLAnchorElement>()} />
	);
	const props: SelectProps = {
		items: [
			{ value: "personal", label: "Personal" },
			{ value: "team", label: "Team" },
		],
		onValueChange(value) {
			const choice: string | null = value;
			void choice;
		},
	};
	const select = <Select {...props} />;
	const segments: SegmentedControlProps = {
		options: [{ value: "a", label: "A" }],
	};
	const segmented = <SegmentedControl {...segments} />;
	return { button, invalid, badBadge, wrongRef, select, segmented };
}
