import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "./(components)/Nav";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bite Logs",
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
        <div className="flex flex-col h-screen">
          <Nav />
          <div className="flex-grow overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
