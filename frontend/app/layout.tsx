import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "GLOBAL EXCLUSIVE MONITOR",
	description: "Live Tracker for All JKT48 Exclusive Events",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
