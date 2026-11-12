/**
 * App-wide toasts: short messages that confirm, report progress or explain
 * a failure. Call `toast` from anywhere; render one `<Toaster />`.
 */
export type ToastTone = "neutral" | "success" | "error" | "loading";
export type ToastSize = "sm" | "md" | "lg";

export interface ToastAction {
	label: string;
	onClick: () => void;
}

export interface Toast {
	id: number;
	tone: ToastTone;
	title: string;
	description?: string;
	action?: ToastAction;
	/** Milliseconds before it leaves on its own; `null` stays until dismissed. */
	duration: number | null;
	createdAt: number;
	/** Pill size, content padding and title/description text scale. @default "md" */
	size: ToastSize;
}

export interface ToastOptions {
	description?: string;
	action?: ToastAction;
	duration?: number | null;
	/** Pill size, content padding and title/description text scale. @default "md" */
	size?: ToastSize;
}

const DEFAULT_DURATION = 4200;
const MAX_VISIBLE = 3;

let toasts: Toast[] = [];
let nextId = 1;
const listeners = new Set<() => void>();

const emit = () => {
	for (const listener of listeners) listener();
};

function show(
	tone: ToastTone,
	title: string,
	options: ToastOptions = {},
): number {
	const id = nextId++;
	const duration =
		options.duration !== undefined
			? options.duration
			: tone === "loading"
				? null
				: DEFAULT_DURATION;
	toasts = [
		{
			id,
			tone,
			title,
			description: options.description,
			action: options.action,
			duration,
			createdAt: Date.now(),
			size: options.size ?? "md",
		},
		...toasts,
	].slice(0, MAX_VISIBLE + 2);
	emit();
	return id;
}

/** Changes a toast in place; it morphs to its new state. */
function update(
	id: number,
	tone: ToastTone,
	title: string,
	options: ToastOptions = {},
) {
	if (!toasts.some((t) => t.id === id)) return show(tone, title, options);
	toasts = toasts.map((t) =>
		t.id === id
			? {
					...t,
					tone,
					title,
					description: options.description,
					action: options.action,
					duration:
						options.duration !== undefined
							? options.duration
							: tone === "loading"
								? null
								: DEFAULT_DURATION,
					createdAt: Date.now(),
					size: options.size ?? t.size,
				}
			: t,
	);
	emit();
	return id;
}

function dismiss(id: number) {
	toasts = toasts.filter((t) => t.id !== id);
	emit();
}

/** A toast written as one object: `toast.success({ title: "Saved" })`. */
export interface ToastInput extends ToastOptions {
	title: string;
}

/** A promise outcome: a plain title, or a title with its own description. */
type Message = string | { title: string; description?: string };

interface PromiseMessages<T> {
	loading: Message;
	success: Message | ((value: T) => Message);
	error: Message | ((error: unknown) => Message);
}

/** Both call shapes reach `show` the same way: a title and its options. */
function resolve(
	input: string | ToastInput,
	options: ToastOptions = {},
): [string, ToastOptions] {
	if (typeof input === "string") return [input, options];
	const { title, ...rest } = input;
	return [title, { ...rest, ...options }];
}

const open =
	(tone: ToastTone) => (input: string | ToastInput, options?: ToastOptions) => {
		const [title, resolved] = resolve(input, options);
		return show(tone, title, resolved);
	};

const words = (message: Message): [string, ToastOptions] =>
	typeof message === "string"
		? [message, {}]
		: [message.title, { description: message.description }];

export const toast = Object.assign(open("neutral"), {
	success: open("success"),
	error: open("error"),
	loading: open("loading"),
	/** Same quiet look as a plain toast; kept so `toast.info(...)` reads naturally. */
	info: open("neutral"),
	/** Same quiet look as a plain toast; there is no separate warning tone. */
	warning: open("neutral"),
	update,
	dismiss,
	/** Shows progress, then morphs into the outcome. Returns the promise. */
	promise<T>(promise: Promise<T>, messages: PromiseMessages<T>): Promise<T> {
		const [loading, loadingOptions] = words(messages.loading);
		const id = show("loading", loading, loadingOptions);
		promise.then(
			(value) => {
				const message =
					typeof messages.success === "function"
						? messages.success(value)
						: messages.success;
				const [title, options] = words(message);
				update(id, "success", title, options);
			},
			(error: unknown) => {
				const message =
					typeof messages.error === "function"
						? messages.error(error)
						: messages.error;
				const [title, options] = words(message);
				update(id, "error", title, options);
			},
		);
		return promise;
	},
});

export function subscribeToasts(listener: () => void) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

export function getToasts(): Toast[] {
	return toasts;
}

export const toastLimits = { visible: MAX_VISIBLE } as const;
