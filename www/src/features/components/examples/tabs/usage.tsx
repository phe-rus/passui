import { Tabs, TabsContent, TabsList, TabsTrigger } from "@passui/react/tabs";

export function TabsUsage() {
	return (
		<Tabs defaultValue="account" className="w-full max-w-md">
			<TabsList>
				<TabsTrigger value="account">Account</TabsTrigger>
				<TabsTrigger value="password">Password</TabsTrigger>
			</TabsList>
			<TabsContent value="account">Change your name and photo.</TabsContent>
			<TabsContent value="password">Update how you sign in.</TabsContent>
		</Tabs>
	);
}
