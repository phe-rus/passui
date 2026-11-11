import { spring } from "@passui/react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
	children: ReactNode;
	className?: string;
	/** Seconds to wait, for staggering siblings. */
	delay?: number;
};

/** Rises into place the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
	const reducedMotion = useReducedMotion();
	return (
		<motion.div
			className={className}
			initial={{
				y: reducedMotion ? 0 : 32,
			}}
			whileInView={{
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
			}}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ ...spring.smooth, delay }}
		>
			{children}
		</motion.div>
	);
}
