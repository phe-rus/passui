import { InfoIcon } from "@passui/react/icons";
import { IconButton } from "@passui/react/icon-button";
import { Popover } from "@passui/react/popover";
import { TextField } from "@passui/react/text-field";
import { useState } from "react";

export function PopoverHelp() {
	const [uri, setUri] = useState("https://app.example.com/callback");

	return (
		<div className="flex h-72 w-full max-w-sm flex-col gap-2">
			<TextField
				label="Redirect URI"
				value={uri}
				onChange={(event) => setUri(event.target.value)}
				action={
					<Popover>
						<Popover.Trigger
							render={(props) => (
								<IconButton
									{...props}
									label="What's a redirect URI?"
									size="icon-xs"
									variant="ghost"
								>
									<InfoIcon size={18} />
								</IconButton>
							)}
						/>
						<Popover.Content
							origin="top-right"
							label="Redirect URI"
							className="w-64 p-4"
						>
							<p className="text-footnote text-label">
								Where Pass sends people back after they sign in. It must match
								your app exactly.
							</p>
						</Popover.Content>
					</Popover>
				}
			/>
		</div>
	);
}
