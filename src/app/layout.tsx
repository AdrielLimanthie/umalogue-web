import type { Metadata } from "next";
import { Geist_Mono, Press_Start_2P } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";
import { darkModeScript } from "@/lib/dark-mode";
import "./globals.css";

const geistMono = Geist_Mono({
	variable: "--font-sans",
	subsets: ["latin"],
});

const geistMonoMono = Geist_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
	variable: "--font-display",
	weight: "400",
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
			className={`${geistMono.variable} ${geistMonoMono.variable} ${pressStart2P.variable} h-full antialiased`}
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
