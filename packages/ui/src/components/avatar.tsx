import {
	type ComponentProps,
	createContext,
	useContext,
	useState,
} from "react";
import { cx } from "../lib/cx";

type Status = "loading" | "loaded" | "error";
const Context = createContext<(s: Status) => void>(() => {});
const StatusContext = createContext<Status>("loading");

export function Avatar({ className, ...props }: ComponentProps<"span">) {
	const [status, setStatus] = useState<Status>("loading");
	return (
		<Context.Provider value={setStatus}>
			<StatusContext.Provider value={status}>
				<span
					data-slot="avatar"
					className={cx(
						"relative flex size-10 shrink-0 overflow-hidden rounded-full bg-fill",
						className,
					)}
					{...props}
				/>
			</StatusContext.Provider>
		</Context.Provider>
	);
}

/** The photo. It stays invisible until loaded, and the fallback shows if it fails. */
export function AvatarImage({
	className,
	alt = "",
	...props
}: ComponentProps<"img">) {
	const report = useContext(Context);
	const status = useContext(StatusContext);
	if (!props.src || status === "error") return null;
	return (
		<img
			alt={alt}
			data-slot="avatar-image"
			onLoad={() => report("loaded")}
			onError={() => report("error")}
			className={cx(
				"absolute inset-0 size-full object-cover transition-opacity duration-(--duration-fast)",
				status !== "loaded" && "opacity-0",
				className,
			)}
			{...props}
		/>
	);
}

export function AvatarFallback({
	className,
	...props
}: ComponentProps<"span">) {
	const status = useContext(StatusContext);
	if (status === "loaded") return null;
	return (
		<span
			data-slot="avatar-fallback"
			className={cx(
				"absolute inset-0 flex items-center justify-center text-subheadline font-medium text-label-secondary",
				className,
			)}
			{...props}
		/>
	);
}
