import { copyText } from "@passui/react/clipboard";
import { toast } from "@passui/react/toast";

/** Copies text and reports honestly: success only after a confirmed write. */
export function useCopyText() {
	return async function copy(text: string, message = "Copied") {
		if (await copyText(text)) {
			toast.success({ title: message });
			return true;
		}
		toast.error({
			title: "Couldn't copy",
			description: "Select the text and use your device's Copy command.",
		});
		return false;
	};
}
