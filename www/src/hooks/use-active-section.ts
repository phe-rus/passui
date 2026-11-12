import { useEffect, useState } from "react";

/**
 * The id of the section being read: the last one whose top has passed under the
 * sticky header, so a nested example wins over the section that holds it.
 */
export function useActiveSection(ids: string[]) {
	const [active, setActive] = useState(ids[0]);
	const key = ids.join();
	useEffect(() => {
		const headerOffset = 120;
		const sections = key.split(",");
		function update() {
			let current = sections[0];
			for (const id of sections) {
				const top = document.getElementById(id)?.getBoundingClientRect().top;
				if (top !== undefined && top <= headerOffset) current = id;
			}
			setActive(current);
		}
		update();
		// The page scrolls inside <main>, so listen in the capture phase.
		document.addEventListener("scroll", update, {
			capture: true,
			passive: true,
		});
		return () =>
			document.removeEventListener("scroll", update, { capture: true });
	}, [key]);
	return active;
}
