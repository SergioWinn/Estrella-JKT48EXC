import type { Metadata } from "next";
import "./globals.css";
import { getThemeBootstrapScript } from "./theme";

const themeBootstrapScript = getThemeBootstrapScript("gem-theme");

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
		<html lang="en" suppressHydrationWarning>
			<body>
				<script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
				{children}
			</body>
		</html>
	);
}
