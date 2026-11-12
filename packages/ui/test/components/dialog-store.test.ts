import { expect, test } from "vitest";
import {
	advanceDialogQueue,
	confirmDialog,
	getDialog,
	settleDialog,
} from "../../src/components/dialog/dialog-store";

test("a repeated dismissal cannot settle the next queued dialog", async () => {
	const firstResult = confirmDialog({ title: "First" });
	const first = getDialog();
	if (!first) throw new Error("no dialog");
	const secondResult = confirmDialog({ title: "Second" });

	settleDialog(false, first.id);
	expect(await firstResult).toBe(false);
	expect(getDialog()).toBeNull();

	settleDialog(false, first.id);
	advanceDialogQueue();
	const second = getDialog();
	if (!second) throw new Error("no second dialog");
	expect(second.title).toBe("Second");

	settleDialog(false, first.id);
	expect(getDialog()?.id).toBe(second.id);
	settleDialog(true, second.id);
	advanceDialogQueue();
	expect(await secondResult).toBe(true);
	expect(getDialog()).toBeNull();
});
