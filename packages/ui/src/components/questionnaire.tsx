"use client";

import { type FormEvent, useId, useState } from "react";
import { cx } from "../lib/cx";
import { Button } from "./button";

export interface QuestionOption {
	value: string;
	label: string;
	description?: string;
}

interface QuestionBase {
	id: string;
	title: string;
	description?: string;
	/** Lets the person move on without answering. @default false */
	optional?: boolean;
}

export type Question =
	| (QuestionBase & { type: "single"; options: QuestionOption[] })
	| (QuestionBase & { type: "multiple"; options: QuestionOption[] })
	| (QuestionBase & { type: "text"; placeholder?: string });

/** A single choice is a string, many choices an array, freeform text a string. */
export type Answers = Record<string, string | string[]>;

export interface QuestionnaireProps {
	questions: Question[];
	/** Called with every answer after the last step. */
	onComplete: (answers: Answers) => void;
	/** Every string the questionnaire shows, so apps translate them. */
	labels: {
		next: string;
		back: string;
		skip: string;
		finish: string;
		/** Names the step, for example "Question 2 of 5". */
		step: (current: number, total: number) => string;
	};
	className?: string;
}

const card =
	"has-[:checked]:bg-accent-soft has-[:checked]:shadow-[inset_0_0_0_1.5px_var(--color-accent)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/70 flex cursor-pointer items-start gap-3 rounded-2xl bg-fill/60 p-3 text-footnote transition spring-snappy active:scale-[0.99] motion-reduce:transition-none";

/**
 * A multi-step questionnaire: one question at a time, with single choice,
 * multiple choice, freeform and skippable questions, a way back, and a
 * progress bar. Answers are plain values, collected on the last step.
 */
export function Questionnaire({
	questions,
	onComplete,
	labels,
	className,
}: QuestionnaireProps) {
	const [index, setIndex] = useState(0);
	const [answers, setAnswers] = useState<Answers>({});
	const name = useId();
	const question = questions[index];
	if (!question) return null;
	const last = index === questions.length - 1;
	const value = answers[question.id];
	const answered = Array.isArray(value) ? value.length > 0 : !!value?.trim();

	const set = (next: string | string[]) =>
		setAnswers((current) => ({ ...current, [question.id]: next }));
	const advance = (final: Answers) => {
		if (last) onComplete(final);
		else setIndex(index + 1);
	};
	const submit = (event: FormEvent) => {
		event.preventDefault();
		advance(answers);
	};
	const skip = () => {
		const { [question.id]: _skipped, ...rest } = answers;
		setAnswers(rest);
		advance(rest);
	};

	return (
		<form
			onSubmit={submit}
			data-slot="questionnaire"
			className={cx("flex w-full max-w-md flex-col gap-5", className)}
		>
			<div className="flex flex-col gap-2">
				<div
					role="progressbar"
					aria-label={labels.step(index + 1, questions.length)}
					aria-valuemin={1}
					aria-valuemax={questions.length}
					aria-valuenow={index + 1}
					className="bg-fill h-1.5 w-full overflow-hidden rounded-full"
				>
					<div
						className="bg-accent spring-smooth h-full rounded-full transition-[width] motion-reduce:transition-none"
						style={{ width: `${((index + 1) / questions.length) * 100}%` }}
					/>
				</div>
				<p className="text-caption text-label-tertiary m-0">
					{labels.step(index + 1, questions.length)}
				</p>
			</div>
			<fieldset
				key={question.id}
				className="m-0 flex min-w-0 animate-[passui-step-in_var(--spring-smooth-duration)_var(--spring-smooth)] flex-col gap-3 border-0 p-0 motion-reduce:animate-none"
			>
				<legend className="text-headline text-label p-0 font-semibold">
					{question.title}
				</legend>
				{question.description ? (
					<p className="text-footnote text-label-secondary m-0">
						{question.description}
					</p>
				) : null}
				{question.type === "text" ? (
					<textarea
						aria-label={question.title}
						placeholder={question.placeholder}
						value={typeof value === "string" ? value : ""}
						onChange={(event) => set(event.target.value)}
						className="control-field text-footnote text-label field-sizing-content min-h-20 w-full resize-none rounded-xl px-3 py-2 outline-none"
					/>
				) : (
					<div className="flex flex-col gap-2">
						{question.options.map((option) => {
							const multiple = question.type === "multiple";
							const picked = Array.isArray(value) ? value : [];
							return (
								<label key={option.value} className={card}>
									<input
										type={multiple ? "checkbox" : "radio"}
										name={`${name}-${question.id}`}
										value={option.value}
										checked={
											multiple
												? picked.includes(option.value)
												: value === option.value
										}
										onChange={() =>
											set(
												multiple
													? picked.includes(option.value)
														? picked.filter((item) => item !== option.value)
														: [...picked, option.value]
													: option.value,
											)
										}
										className="accent-accent mt-0.5 size-4 shrink-0"
									/>
									<span className="flex min-w-0 flex-col">
										<span className="text-label font-medium">
											{option.label}
										</span>
										{option.description ? (
											<span className="text-caption text-label-secondary">
												{option.description}
											</span>
										) : null}
									</span>
								</label>
							);
						})}
					</div>
				)}
			</fieldset>
			<div className="flex items-center justify-between gap-2">
				<Button
					type="button"
					variant="ghost"
					disabled={index === 0}
					onClick={() => setIndex(index - 1)}
				>
					{labels.back}
				</Button>
				<div className="flex items-center gap-2">
					{question.optional ? (
						<Button type="button" variant="ghost" onClick={skip}>
							{labels.skip}
						</Button>
					) : null}
					<Button type="submit" disabled={!answered && !question.optional}>
						{last ? labels.finish : labels.next}
					</Button>
				</div>
			</div>
		</form>
	);
}
