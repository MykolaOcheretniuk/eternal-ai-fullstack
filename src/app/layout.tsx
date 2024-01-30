import type { Metadata } from "next";
import "./globals.css";
import "./reset.css";
import "./fonts.css";
import { Header } from "@/components/Header/Header";
import { SignUp } from "@/components/Auth/SignUp/SignUp";
import { SignIn } from "@/components/Auth/SignIn/SignIn";
import { Providers } from "@/components/Providers/Providers";

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
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
