import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mybuu | Management Student & Self-Taught Web Developer",
  description: "Official developer portfolio of Mybuu, combining strategic management problem-solving with advanced programming logic to build high-performance digital solutions.",
  keywords: ["Mybuu", "Developer Portfolio", "Self-Taught Web Developer", "Management Student", "Roblox Lua Scripting", "Next.js Portfolio", "Tailwind CSS v4", "TypeScript Web App"],
  authors: [{ name: "Mybuu" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col bg-portfolio-bg text-white">
        {children}
      </body>
    </html>
  );
}
