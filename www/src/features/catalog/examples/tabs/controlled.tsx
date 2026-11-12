import { Tabs, TabsContent, TabsList, TabsTrigger } from "@passui/react/tabs";
import { useState } from "react";

export function TabsControlled() {
	const [tab, setTab] = useState("a");
	return (
		<Tabs value={tab} onValueChange={setTab} className="w-full max-w-md">
			<TabsList>
				<TabsTrigger value="a">One</TabsTrigger>
				<TabsTrigger value="b">Two</TabsTrigger>
			</TabsList>
			<TabsContent value="a">First panel</TabsContent>
			<TabsContent value="b">Second panel</TabsContent>
		</Tabs>
	);
}
