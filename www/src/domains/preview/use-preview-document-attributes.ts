import { useMatch } from "@tanstack/react-router";
import {
	type DocumentAttributes,
	getDocumentAttributes,
} from "./get-document-attributes";

/**
 * For `__root`: on the preview page, its settings go on `<html>` in the
 * server rendered HTML, so the first paint is already right (AC-7).
 */
export function usePreviewDocumentAttributes(): DocumentAttributes {
	const match = useMatch({
		from: "/preview/$slug",
		shouldThrow: false,
	});
	return match ? getDocumentAttributes(match.search) : {};
}
