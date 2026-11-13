import { Questionnaire } from "@passui/react/questionnaire";
import { Text } from "@passui/react/text";
import { useState } from "react";

const labels = {
	next: "Next",
	back: "Back",
	skip: "Skip",
	finish: "Finish",
	step: (current: number, total: number) => `Question ${current} of ${total}`,
};

export function QuestionnaireDescriptions() {
	const [done, setDone] = useState(false);
	if (done) return <Text size="footnote">Thanks, plan chosen.</Text>;
	return (
		<Questionnaire
			labels={labels}
			onComplete={() => setDone(true)}
			questions={[
				{
					id: "plan",
					type: "single",
					title: "Choose a plan",
					options: [
						{
							value: "free",
							label: "Free",
							description: "For trying things out. One project.",
						},
						{
							value: "team",
							label: "Team",
							description: "Unlimited projects and shared themes.",
						},
					],
				},
			]}
		/>
	);
}
