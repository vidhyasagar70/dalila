// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Jost, Marcellus, Maven_Pro } from "next/font/google";
import "./globals.css";
import HeaderFooterWrapper from "@/components/HeaderFooterWrapper";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});
const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});
const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dalila Diamonds - Premium B2B Diamond Supplier",
  description: "Global supplier of certified premium natural diamonds for B2B",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jost.variable} ${marcellus.variable} ${mavenPro.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-background text-foreground font-jost">
        <HeaderFooterWrapper>{children}</HeaderFooterWrapper>
      </body>
    </html>
  );
}
