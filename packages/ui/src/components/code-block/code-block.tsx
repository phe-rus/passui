import { Fragment, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../lib/class-names";

export type CodeBlockSize = "sm" | "md" | "lg";

export interface CodeBlockProps
	extends Omit<ComponentProps<"div">, "children" | "size"> {
	code: string;
	/** Supply a highlighter's rendered pre/code element; source remains the fallback. */
	children?: ReactNode;
	/** Show a nonselectable line gutter. @default true */
	lineNumbers?: boolean;
	/** Code font size, padding and line gutter scale. @default "md" */
	size?: CodeBlockSize;
}

/** Code presentation without shipping a highlighter or formatter to consumers. */
export function CodeBlock({
	code,
	children,
	lineNumbers = true,
	size = "md",
	className,
	...props
}: CodeBlockProps) {
	const lines = code.split("\n");
	return (
		<div
			{...props}
			className={cn("passui-code-block", className)}
			data-line-numbers={lineNumbers || undefined}
			data-size={size}
		>
			{children ?? (
				<pre>
					<code>
						{lines.map((line, index) => (
							<Fragment key={`${index}-${line}`}>
								<span className="line">{line || " "}</span>
								{index < lines.length - 1 ? "\n" : null}
							</Fragment>
						))}
					</code>
				</pre>
			)}
		</div>
	);
}
