import { Questionnaire } from "@passui/react/questionnaire";
import { useState } from "react";

const labels = {
	next: "Next",
	back: "Back",
	skip: "Skip",
	finish: "Finish",
	step: (current: number, total: number) => `Question ${current} of ${total}`,
};

export function QuestionnaireUsage() {
	const [result, setResult] = useState<string | null>(null);
	if (result)
		return <pre className="text-footnote text-label m-0">{result}</pre>;
	return (
		<Questionnaire
			labels={labels}
			onComplete={(answers) => setResult(JSON.stringify(answers, null, 2))}
			questions={[
				{
					id: "role",
					type: "single",
					title: "What do you do?",
					options: [
						{ value: "design", label: "Design" },
						{ value: "engineering", label: "Engineering" },
						{ value: "product", label: "Product" },
					],
				},
				{
					id: "tools",
					type: "multiple",
					title: "What do you use?",
					description: "Pick everything that applies.",
					options: [
						{ value: "react", label: "React" },
						{ value: "tailwind", label: "Tailwind CSS" },
						{ value: "tanstack", label: "TanStack" },
					],
				},
				{
					id: "notes",
					type: "text",
					title: "Anything else?",
					placeholder: "Optional notes",
					optional: true,
				},
			]}
		/>
	);
}
