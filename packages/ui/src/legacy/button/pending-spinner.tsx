/**
 * Centred over the button while it is pending: fades in, spins, and is
 * sized from the text so it suits every button size.
 */
export function PendingSpinner() {
	return (
		<span
			aria-hidden="true"
			className="animate-in fade-in zoom-in-75 absolute inset-0 flex items-center justify-center duration-200 motion-reduce:animate-none"
		>
			<span className="size-[1.1em] animate-spin rounded-full border-2 border-current/25 border-t-current motion-reduce:animate-none" />
		</span>
	);
}
