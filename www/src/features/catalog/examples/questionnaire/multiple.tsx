import { Questionnaire } from "@passui/react/questionnaire";
import { useState } from "react";

const labels = {
	next: "Next",
	back: "Back",
	skip: "Skip",
	finish: "Finish",
	step: (current: number, total: number) => `Question ${current} of ${total}`,
};

export function QuestionnaireMultiple() {
	const [done, setDone] = useState(false);
	if (done) return <p>Saved.</p>;
	return (
		<Questionnaire
			labels={labels}
			onComplete={() => setDone(true)}
			questions={[
				{
					id: "topics",
					type: "multiple",
					title: "What interests you?",
					description: "Pick everything that applies.",
					options: [
						{ value: "design", label: "Design" },
						{ value: "code", label: "Code" },
						{ value: "writing", label: "Writing" },
					],
				},
			]}
		/>
	);
}
