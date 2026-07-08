import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
	subsets: ["latin"],
});

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
		<html lang="en" className={geist.className}>
			<body>{children}</body>
		</html>
	);
}
