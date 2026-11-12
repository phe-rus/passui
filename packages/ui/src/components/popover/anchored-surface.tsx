import { springs } from "@passui/tokens/motion";
import { useMediaQuery } from "../../hooks/use-media-query";
import {
	forwardRef,
	type HTMLAttributes,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { useAnchoredPlacement } from "../../hooks/use-anchored-placement";
import { FLOATING_LAYER } from "../../hooks/use-dismiss";
import { useFloatingDismiss } from "../../hooks/use-floating-dismiss";
import { cn } from "../../lib/class-names";
import { registerFloatingLayer } from "../../lib/floating-layers";
import { concealMenuSource } from "../context-menu/conceal-menu-source";
import { menuSurfaceReveal } from "../context-menu/menu-reveal";

interface AnchoredSurfaceProps extends HTMLAttributes<HTMLDivElement> {
	open: boolean;
	onExited: () => void;
	anchor: HTMLElement;
	width: number;
	needed: number;
	onClose: (restoreFocus: boolean) => void;
	contentClassName?: string;
}

/**
 * Shared material and lifetime for portaled
 *  pickers; their content owns
 * selection.
 * */
export const AnchoredSurface = forwardRef<HTMLDivElement, AnchoredSurfaceProps>(
	function AnchoredSurface(
		{
			open: present,
			onExited: remove,
			anchor,
			width,
			needed,
			onClose,
			children,
			className,
			contentClassName,
			...props
		},
		forwardedRef,
	) {
		const root = useRef<HTMLDivElement>(null);
		const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
		const material = useRef<HTMLDivElement>(null);
		const content = useRef<HTMLDivElement>(null);
		const animated = useRef<{
			values: number[];
			velocities: number[];
			opacity: number;
			materialOpacity: number;
		} | null>(null);
		const placement = useAnchoredPlacement(anchor, width, needed, true);
		const [geometry, setGeometry] = useState<{
			source: ReturnType<typeof menuSurfaceReveal>;
			width: number;
			height: number;
			radius: number;
		} | null>(null);

		// biome-ignore lint/correctness/useExhaustiveDependencies: Placement can move without resizing; remeasure the source-relative reveal.
		useLayoutEffect(() => {
			const panel = root.current;
			if (!panel || !present) return;
			const measure = () => {
				const target = panel.getBoundingClientRect();
				const source = anchor.getBoundingClientRect();
				const radius =
					Number.parseFloat(getComputedStyle(panel).borderTopLeftRadius) || 0;
				const reveal = menuSurfaceReveal(source, target);
				setGeometry((current) =>
					current &&
					current.width === target.width &&
					current.height === target.height &&
					current.radius === radius &&
					current.source.x === reveal.x &&
					current.source.y === reveal.y &&
					current.source.width === reveal.width &&
					current.source.height === reveal.height
						? current
						: {
								source: reveal,
								width: target.width,
								height: target.height,
								radius,
							},
				);
			};
			measure();
			const observer = new ResizeObserver(measure);
			observer.observe(panel);
			return () => observer.disconnect();
		}, [
			anchor,
			present,
			placement.left,
			placement.top,
			placement.bottom,
			placement.width,
		]);

		useLayoutEffect(() => {
			if (!root.current) return;
			const unregister = registerFloatingLayer(root.current, anchor);
			return unregister;
		}, [anchor]);

		useLayoutEffect(() => {
			if (!present) return;
			const restore = concealMenuSource(anchor, false);
			return () => {
				restore();
			};
		}, [anchor, present]);

		useLayoutEffect(() => {
			if (!geometry || !material.current || !content.current) {
				if (!present) remove?.();
				return;
			}
			const pane = material.current;
			const body = content.current;
			const source = [
				geometry.source.x,
				geometry.source.y,
				geometry.source.width,
				geometry.source.height,
				geometry.source.borderRadius,
			];
			const target = present
				? [0, 0, geometry.width, geometry.height, geometry.radius]
				: source;
			const state = animated.current ?? {
				values: [...source],
				velocities: source.map(() => 0),
				opacity: 0,
				materialOpacity: 1,
			};
			animated.current = state;
			let frame = 0;
			let previous = 0;
			const paint = () => {
				const [x, y, width, height, radius] = state.values;
				pane.style.transform = `translate(${x}px, ${y}px)`;
				pane.style.width = `${Math.max(0, width)}px`;
				pane.style.height = `${Math.max(0, height)}px`;
				pane.style.borderRadius = `${Math.max(0, radius)}px`;
				pane.style.opacity = String(state.materialOpacity);
				body.style.opacity = String(state.opacity);
			};
			const tick = (now: number) => {
				const dt = previous ? Math.min(0.032, (now - previous) / 1000) : 1 / 60;
				previous = now;
				const { stiffness, damping, mass } = springs.smooth;
				let resting = true;
				for (let index = 0; index < target.length; index++) {
					state.velocities[index] +=
						(((target[index] - state.values[index]) * stiffness -
							state.velocities[index] * damping) /
							mass) *
						dt;
					state.values[index] += state.velocities[index] * dt;
					if (
						Math.abs(target[index] - state.values[index]) > 0.05 ||
						Math.abs(state.velocities[index]) > 0.05
					)
						resting = false;
				}
				const progress = Math.max(
					0,
					Math.min(
						1,
						1 -
							Math.abs(geometry.height - state.values[3]) /
								Math.max(1, Math.abs(geometry.height - source[3])),
					),
				);
				const opacity = present ? Math.max(0, (progress - 0.25) / 0.75) : 0;
				state.opacity += (opacity - state.opacity) * (1 - Math.exp(-dt / 0.04));
				state.materialOpacity +=
					((present ? 1 : 0) - state.materialOpacity) *
					(1 - Math.exp(-dt / 0.04));
				paint();
				if (
					resting &&
					Math.abs(opacity - state.opacity) < 0.01 &&
					Math.abs((present ? 1 : 0) - state.materialOpacity) < 0.01
				) {
					state.values = [...target];
					state.velocities.fill(0);
					state.opacity = present ? 1 : 0;
					state.materialOpacity = present ? 1 : 0;
					paint();
					if (!present) remove?.();
					return;
				}
				frame = requestAnimationFrame(tick);
			};
			if (reducedMotion) {
				state.values = [...target];
				state.velocities.fill(0);
				state.opacity = present ? 1 : 0;
				state.materialOpacity = present ? 1 : 0;
				paint();
				if (!present) remove?.();
			} else {
				paint();
				frame = requestAnimationFrame(tick);
			}
			return () => cancelAnimationFrame(frame);
		}, [geometry, present, remove, reducedMotion]);

		useFloatingDismiss(root, anchor, (restore) => {
			if (present) onClose(restore);
		});

		return (
			<div
				{...props}
				ref={(node) => {
					root.current = node;
					if (typeof forwardedRef === "function") forwardedRef(node);
					else if (forwardedRef) forwardedRef.current = node;
				}}
				{...{ [FLOATING_LAYER]: "" }}
				inert={!present}
				className={cn(
					"fixed isolate z-[80] flex min-w-0 flex-col rounded-3xl outline-none",
					!present && "pointer-events-none",
					className,
				)}
				style={{
					left: placement.left,
					top: placement.top,
					bottom: placement.bottom,
					width: placement.width,
					maxHeight: placement.maxHeight ?? 420,
				}}
			>
				<div
					ref={material}
					aria-hidden="true"
					className="glass-menu pointer-events-none absolute top-0 left-0 -z-10"
				/>
				<div
					ref={content}
					style={{ opacity: 0 }}
					className={cn(
						"flex min-h-0 flex-col overflow-y-auto overscroll-contain",
						contentClassName,
					)}
				>
					{children}
				</div>
			</div>
		);
	},
);
