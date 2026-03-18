import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "myAdmin — Manage your rentals. Handle your taxes. All in one platform.",
  description:
    "myAdmin is the integrated platform for short-term rental property managers. Rental analytics, financial administration, and tax compliance in one tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="font-sans text-deep-slate bg-off-white antialiased">
        {children}
      </body>
    </html>
  );
}
