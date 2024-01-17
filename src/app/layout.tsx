import type { Metadata } from "next";
import "./globals.css";
import "./reset.css";
import "./fonts.css";

export const metadata: Metadata = {
  title: "EternalAi",
  description: "eternal ai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
