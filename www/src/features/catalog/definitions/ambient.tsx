import { AmbientImages } from "../examples/ambient/images";
import { AmbientNowPlaying } from "../examples/ambient/now-playing";
import { AmbientShowcase } from "../examples/ambient/showcase";
import { AmbientUsage } from "../examples/ambient/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "images",
			title: "One glow per image",
			description:
				"Each picture lights its own space. The glow is smaller and dimmer in dark mode.",
			Demo: AmbientImages,
		},
		{
			id: "now-playing",
			title: "Now playing",
			description:
				"Album art lighting the player around it, the way Music does.",
			Demo: AmbientNowPlaying,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: AmbientShowcase,
		},
		{ id: "usage", title: "Usage", description: "", Demo: AmbientUsage },
	],
	accessibility: [
		"Pass the same image you show, so the glow matches it.",
		"Leave room around the content. The glow needs space to fade out.",
	],
};
