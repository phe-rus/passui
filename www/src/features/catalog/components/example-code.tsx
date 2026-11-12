import { Button } from "@passui/react/button";
import { Skeleton } from "@passui/react/skeleton";
import { useEffect, useState } from "react";
import { CodeView } from "@/features/playground/components/code-view";
import { getExampleSource } from "../lib/get-example-source";

/** Source text loads independently, with retry when a chunk cannot be fetched. */
export function ExampleCode({ slug, id }: { slug: string; id: string }) {
	const [attempt, setAttempt] = useState(0);
	const key = `${slug}/${id}:${attempt}`;
	const [result, setResult] = useState<{
		key: string;
		code?: string;
		failed?: boolean;
	}>({ key });
	useEffect(() => {
		let current = true;
		setResult({ key });
		void getExampleSource(slug, id)
			.then((code) => {
				if (current) setResult({ key, code, failed: !code });
			})
			.catch(() => {
				if (current) setResult({ key, failed: true });
			});
		return () => {
			current = false;
		};
	}, [slug, id, key]);
	if (result.key === key && result.failed)
		return (
			<div className="text-footnote text-label-secondary flex items-center justify-between gap-3 p-4">
				<span>Example source could not load.</span>
				<Button
					size="xs"
					variant="secondary"
					onClick={() => setAttempt((value) => value + 1)}
				>
					Retry
				</Button>
			</div>
		);
	if (result.key !== key || result.code === undefined)
		return <Skeleton label="Loading example source" className="m-4 h-24" />;
	return <CodeView code={result.code} label={`${slug}-${id}.tsx`} />;
}
