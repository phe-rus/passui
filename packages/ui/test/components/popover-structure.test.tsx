import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { Popover } from "../../src/components/popover";
import { popoverMachine } from "../../src/machines/popover.machine";

test("the compound Popover exports Root, Trigger and Content parts", () => {
	expect(typeof Popover).toBe("function");
	expect(typeof Popover.Trigger).toBe("function");
	expect(typeof Popover.Content).toBe("function");
});

test("Popover.Trigger clones a single child with aria + toggle wiring", () => {
	const html = renderToStaticMarkup(
		<Popover>
			<Popover.Trigger>
				<button type="button">Open</button>
			</Popover.Trigger>
		</Popover>,
	);
	// The trigger keeps the caller's label and gains aria-haspopup + controls.
	expect(html).toContain(">Open</button>");
	expect(html).toContain('aria-haspopup="dialog"');
	expect(html).toContain("aria-expanded");
});

test("the machine cycles closed → opening → open → closing → closed", () => {
	expect(popoverMachine("closed", "TOGGLE")).toBe("opening");
	expect(popoverMachine("opening", "OPENED")).toBe("open");
	expect(popoverMachine("open", "TOGGLE")).toBe("closing");
	expect(popoverMachine("closing", "CLOSED")).toBe("closed");
});

test("the machine is interruptible: CLOSE during OPENING goes straight to closing", () => {
	expect(popoverMachine("opening", "CLOSE")).toBe("closing");
	expect(popoverMachine("closing", "OPEN")).toBe("opening");
});

test("ignored events leave the state unchanged", () => {
	expect(popoverMachine("closed", "OPENED")).toBe("closed");
	expect(popoverMachine("closed", "CLOSE")).toBe("closed");
	expect(popoverMachine("open", "OPENED")).toBe("open");
	expect(popoverMachine("open", "OPEN")).toBe("open");
});
