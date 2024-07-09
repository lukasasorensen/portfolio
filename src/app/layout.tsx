import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/index.scss";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NavBar from "@/components/NavBar";
import { Body } from "@/components/Body";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lukas A Sorensen",
  description: "Lukas A Sorensen | Full Stack Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={inter.className + " bg-slate-300 dark:bg-slate-800"}>
          <Body>
            <NavBar />
            {children}
          </Body>
        </body>
      </ThemeProvider>
    </html>
  );
}
