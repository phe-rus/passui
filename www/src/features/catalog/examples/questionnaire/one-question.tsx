import { Questionnaire } from "@passui/react/questionnaire";
import { useState } from "react";

const labels = {
	next: "Next",
	back: "Back",
	skip: "Skip",
	finish: "Finish",
	step: (current: number, total: number) => `Question ${current} of ${total}`,
};

export function QuestionnaireOneQuestion() {
	const [done, setDone] = useState(false);
	if (done) return <p>Thanks.</p>;
	return (
		<Questionnaire
			labels={labels}
			onComplete={() => setDone(true)}
			questions={[
				{
					id: "plan",
					type: "single",
					title: "Which plan fits?",
					options: [
						{ value: "free", label: "Free" },
						{ value: "pro", label: "Pro" },
					],
				},
			]}
		/>
	);
}
