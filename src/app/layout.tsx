import type { Metadata } from "next";
import { SUSE, SUSE_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";
import { darkModeScript } from "@/lib/dark-mode";
import "./globals.css";

const suseSans = SUSE({
	variable: "--font-sans",
	subsets: ["latin"],
});

const suseMono = SUSE_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Umalogue",
	description: "Organise and view your Umamusume: Pretty Derby veterans",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${suseSans.variable} ${suseMono.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<head>
				{/* Anti-FOUC: synchronously apply dark class before first paint */}
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: required for synchronous theme script */}
				<script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
			</head>
			<body className="min-h-full flex flex-col bg-background text-foreground">
				<Header />
				<main className="flex-1">{children}</main>
				<Toaster />
			</body>
		</html>
	);
}
