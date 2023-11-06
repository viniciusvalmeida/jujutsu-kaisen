import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Jujutsu Kaisen Info",
	description: "Info for characters of anime Jujutsu Kaisen",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} h-screen max-w-screen-xl mx-auto bg-[url('/background.jpg')] bg-fixed bg-cover text-white space-y-14`}
			>
				{children}
			</body>
		</html>
	);
}
