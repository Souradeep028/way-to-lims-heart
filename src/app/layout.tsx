import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: "Way To Lim's Heart",
	description:
		"You are Lim's lover who wants to win Lim's affection, but the path is not easy. You have find your way in a land full of mines and the pain of starting all over again. You should not give up as destiny awaits to grant you a special something!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
