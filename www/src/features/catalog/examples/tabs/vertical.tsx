import { Tabs, TabsContent, TabsList, TabsTrigger } from "@passui/react/tabs";

export function TabsVertical() {
	return (
		<Tabs defaultValue="account" variant="line" orientation="vertical">
			<TabsList>
				<TabsTrigger value="account">Account</TabsTrigger>
				<TabsTrigger value="security">Security</TabsTrigger>
				<TabsTrigger value="billing">Billing</TabsTrigger>
			</TabsList>
			<TabsContent
				value="account"
				className="text-footnote text-label-secondary"
			>
				Name, email and profile photo.
			</TabsContent>
			<TabsContent
				value="security"
				className="text-footnote text-label-secondary"
			>
				Password and two step sign in.
			</TabsContent>
			<TabsContent
				value="billing"
				className="text-footnote text-label-secondary"
			>
				Plan, invoices and payment method.
			</TabsContent>
		</Tabs>
	);
}
