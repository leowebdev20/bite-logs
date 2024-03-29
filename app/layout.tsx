import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "./(components)/Nav";
import "./globals.scss";
import NextTopLoader from "nextjs-toploader"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BiteLogs",
  description: "Log your foods and mood!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        <div className="flex h-screen flex-col">
          <Nav />
          <div className="flex-grow overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
