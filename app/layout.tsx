import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taste Mummies Made Restaurant - Home in every spoon",
  description: "Healthy, nutritious, and affordable homemade breakfast delivery service in Ho, Ghana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
