"use client";
import { AppWrapper } from "@/context";
import { SessionProvider } from "next-auth/react";
import React from "react";
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <AppWrapper>{children}</AppWrapper>
    </SessionProvider>
  );
};
