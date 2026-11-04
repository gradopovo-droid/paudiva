import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PAUDIVA — Grow Green. Live Better.",
  description: "Discover plants, seeds and sustainable gardening products across India."
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}