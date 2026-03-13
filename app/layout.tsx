import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://whaasco.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "WHAASCO - West Hartford African American Social & Cultural Organization",
  description: "WHAASCO empowers families, supports youth, and celebrates African American culture through education, connection, and community engagement.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "WHAASCO - West Hartford African American Social & Cultural Organization",
    description: "WHAASCO empowers families, supports youth, and celebrates African American culture through education, connection, and community engagement.",
    images: ["/logo.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WHAASCO - West Hartford African American Social & Cultural Organization",
    description: "WHAASCO empowers families, supports youth, and celebrates African American culture through education, connection, and community engagement.",
    images: ["/logo.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  const customPages = content.customPages ?? [];
  const headerPages = customPages.filter(
    (p) => p.placement === "header" || p.placement === "both"
  );
  const footerPages = customPages.filter(
    (p) => p.placement === "footer" || p.placement === "both"
  );

  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Suspense fallback={<header className="bg-white shadow-md sticky top-0 z-50 border-b-4 border-african-gold-500 h-28" />}>
          <Header headerPages={headerPages} />
        </Suspense>
        <main className="min-h-screen animate-fade-in">{children}</main>
        <Footer footerPages={footerPages} />
      </body>
    </html>
  );
}
