import { Card, CardContent, CardHeader, CardTitle } from "@passui/react/card";
import { Input } from "@passui/react/input";
import { LabeledContent } from "@passui/react/labeled-content";
import { SegmentedControl } from "@passui/react/segmented-control";
import { useState } from "react";

export function LabeledContentWide() {
	const [theme, setTheme] = useState("system");
	const [nickname, setNickname] = useState("Aiko");

	return (
		<div className="w-full max-w-md">
			<Card className="w-full overflow-hidden">
				<CardHeader>
					<CardTitle>Profile</CardTitle>
				</CardHeader>
				<CardContent className="px-0">
					<LabeledContent label="Appearance" wide>
						<SegmentedControl
							aria-label="Appearance"
							value={theme}
							onValueChange={setTheme}
							options={[
								{
									value: "system",
									label: "System",
								},
								{
									value: "light",
									label: "Light",
								},
								{ value: "dark", label: "Dark" },
							]}
						/>
					</LabeledContent>
					<LabeledContent label="Nickname" stacked>
						<Input
							aria-label="Nickname"
							value={nickname}
							onChange={(event) => setNickname(event.target.value)}
						/>
					</LabeledContent>
				</CardContent>
			</Card>
		</div>
	);
}
