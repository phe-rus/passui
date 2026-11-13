import { QuestionnaireDescriptions } from "../examples/questionnaire/descriptions";
import { QuestionnaireMultiple } from "../examples/questionnaire/multiple";
import { QuestionnaireOneQuestion } from "../examples/questionnaire/one-question";
import { QuestionnaireUsage } from "../examples/questionnaire/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Multi step",
			description:
				"Single choice, multiple choice and a skippable freeform question. `onComplete` receives every answer.",
			Demo: QuestionnaireUsage,
		},
		{
			id: "descriptions",
			title: "Options with descriptions",
			description: "Give an option a `description` to explain what it means.",
			Demo: QuestionnaireDescriptions,
		},
		{
			id: "one-question",
			title: "A single question",
			description: "One step, no progress needed.",
			Demo: QuestionnaireOneQuestion,
		},
		{
			id: "multiple",
			title: "Pick many",
			description: "A multiple question lets the person tick several.",
			Demo: QuestionnaireMultiple,
		},
	],
	accessibility: [
		"Each question is a `fieldset` with a `legend`, and choices are native radios or checkboxes.",
		"The progress bar is a `progressbar` named by the current step.",
		"Next stays disabled until a required question is answered. Mark a question `optional` to allow Skip.",
		"Pass every string, including the step name, as a prop so it can be translated.",
	],
};
