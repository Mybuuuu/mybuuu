import type { Metadata } from "next";
import "../globals.css";
import { LanguageProvider } from "../../context/LanguageContext";

export const metadata: Metadata = {
  title: "Mybuu | Management Student & Self-Taught Web Developer",
  description: "Official developer portfolio of Mybuu, combining strategic management problem-solving with advanced programming logic to build high-performance digital solutions.",
  keywords: ["Mybuu", "Developer Portfolio", "Self-Taught Web Developer", "Management Student", "Roblox Lua Scripting", "Next.js Portfolio", "Tailwind CSS v4", "TypeScript Web App"],
  authors: [{ name: "Mybuu" }],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col bg-portfolio-bg text-white">
        <LanguageProvider locale={locale}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
