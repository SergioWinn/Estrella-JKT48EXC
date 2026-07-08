import type { Metadata } from "next";
import "./globals.css";

const themeBootstrapScript = `(() => {
  try {
    const storedTheme = window.localStorage.getItem("gem-theme");
    const theme = storedTheme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = "dark";
  }
})();`;

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
