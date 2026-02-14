import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBarWrapper from "@/components/NavBarWrapper";
import MainContentWrapper from "@/components/MainContentWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (    
    <html lang="en">
      <body>
        <NavBarWrapper />
        <MainContentWrapper>
          {children}
        </MainContentWrapper>
      </body>
    </html>
  );
}
