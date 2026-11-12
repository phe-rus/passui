// @vitest-environment jsdom
import { createRoot, type Root } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";
import { Checkbox } from "../../src/components/checkbox";
import { Combobox } from "../../src/components/combobox";
import {
	Field,
	FieldDescription,
	FieldLabel,
} from "../../src/components/field";
import { Input } from "../../src/components/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "../../src/components/input-group";
import { InputOTP } from "../../src/components/input-otp";
import { RadioGroup, RadioGroupItem } from "../../src/components/radio-group";
import { SegmentedControl } from "../../src/components/segmented-control";
import { Select } from "../../src/components/select";
import { Slider } from "../../src/components/slider";
import { Switch } from "../../src/components/switch";
import { Textarea } from "../../src/components/textarea";
import { Toggle } from "../../src/components/toggle";
import {
	ToggleGroup,
	ToggleGroupItem,
} from "../../src/components/toggle-group";
import { act, expectNoA11yViolations, settle } from "../helpers/axe";

let root: Root | undefined;
let host: HTMLElement | undefined;
afterEach(async () => {
	if (root) await act(async () => root?.unmount());
	host?.remove();
	document.body.innerHTML = "";
	root = host = undefined;
});
async function mount(ui: React.ReactElement) {
	host = document.createElement("div");
	document.body.append(host);
	root = createRoot(host);
	await act(async () => root?.render(ui));
	await settle();
}

const items = [
	{ value: "a", label: "Alpha" },
	{ value: "b", label: "Beta" },
];

it("form controls have no axe violations", async () => {
	await expectNoA11yViolations(
		<form>
			<Field>
				<FieldLabel htmlFor="n">Name</FieldLabel>
				<Input id="n" />
				<FieldDescription>Public</FieldDescription>
			</Field>
			<Textarea aria-label="Bio" />
			<InputGroup>
				<InputGroupAddon>@</InputGroupAddon>
				<InputGroupInput aria-label="Handle" />
			</InputGroup>
			<Checkbox aria-label="Agree" />
			<Switch>Notifications</Switch>
			<RadioGroup defaultValue="a" aria-label="Pick">
				<RadioGroupItem value="a">A</RadioGroupItem>
				<RadioGroupItem value="b">B</RadioGroupItem>
			</RadioGroup>
			<Toggle aria-label="Bold">B</Toggle>
			<ToggleGroup aria-label="Align">
				<ToggleGroupItem value="l">L</ToggleGroupItem>
				<ToggleGroupItem value="r">R</ToggleGroupItem>
			</ToggleGroup>
			<Slider defaultValue={30} aria-label={["Volume"]} />
			<InputOTP length={4} aria-label="Code" />
			<Select items={items} aria-label="Letter" />
			<Combobox items={items} aria-label="Letter search" />
			<SegmentedControl
				aria-label="View"
				options={[
					{ value: "x", label: "X" },
					{ value: "y", label: "Y" },
				]}
				defaultValue="x"
			/>
		</form>,
	);
});

it("Checkbox toggles through its native input and reports the change", async () => {
	const onChange = vi.fn();
	await mount(<Checkbox onCheckedChange={onChange}>Agree</Checkbox>);
	const input = document.querySelector("input") as HTMLInputElement;
	await act(async () => input.click());
	expect(onChange).toHaveBeenCalledWith(true);
	expect(input.checked).toBe(true);
});

it("Switch exposes role switch and flips on click", async () => {
	await mount(<Switch>Wi-Fi</Switch>);
	const input = document.querySelector("input") as HTMLInputElement;
	expect(input.getAttribute("role")).toBe("switch");
	await act(async () => input.click());
	expect(input.checked).toBe(true);
});

it("RadioGroup selects one value", async () => {
	const onChange = vi.fn();
	await mount(
		<RadioGroup onValueChange={onChange} aria-label="x">
			<RadioGroupItem value="a">A</RadioGroupItem>
			<RadioGroupItem value="b">B</RadioGroupItem>
		</RadioGroup>,
	);
	const inputs =
		document.querySelectorAll<HTMLInputElement>("input[type=radio]");
	await act(async () => inputs[1]?.click());
	expect(onChange).toHaveBeenCalledWith("b");
});

it("Toggle is uncontrolled and keeps aria-pressed in sync", async () => {
	await mount(<Toggle>Bold</Toggle>);
	const button = document.querySelector("button") as HTMLButtonElement;
	expect(button.getAttribute("aria-pressed")).toBe("false");
	await act(async () => button.click());
	expect(button.getAttribute("aria-pressed")).toBe("true");
});

it("Select opens a listbox and chooses an item", async () => {
	const onChange = vi.fn();
	await mount(<Select items={items} onValueChange={onChange} aria-label="L" />);
	const trigger = document.querySelector(
		"[data-slot=select-trigger]",
	) as HTMLElement;
	await act(async () => trigger.click());
	await settle();
	const options = document.querySelectorAll<HTMLElement>(
		"[data-slot=select-item]",
	);
	expect(options).toHaveLength(2);
	await act(async () => options[1]?.click());
	expect(onChange).toHaveBeenCalledWith("b");
});

it("Combobox filters its list by the typed query", async () => {
	await mount(<Combobox items={items} aria-label="L" />);
	const input = document.querySelector(
		"input[data-slot=combobox-input]",
	) as HTMLInputElement;
	await act(async () => {
		input.focus();
		const set = Object.getOwnPropertyDescriptor(
			HTMLInputElement.prototype,
			"value",
		)?.set;
		set?.call(input, "be");
		input.dispatchEvent(new Event("input", { bubbles: true }));
	});
	await settle();
	const options = document.querySelectorAll("[data-slot=combobox-item]");
	expect(options).toHaveLength(1);
	expect(options[0]?.textContent).toContain("Beta");
});

it("InputOTP renders one box per slot", async () => {
	await mount(<InputOTP length={5} />);
	expect(
		document.querySelectorAll("input:not([hidden]):not([type=hidden])").length,
	).toBeGreaterThanOrEqual(5);
});
