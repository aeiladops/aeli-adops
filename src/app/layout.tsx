import PreloaderWrapper from "@/src/components/animation/preloader-wrapper";
import SmoothScrollProvider from "@/src/components/animation/smooth-scroll";
import Footer from "@/src/components/shared/layout/footer/footer";
import Navbar from "@/src/components/shared/layout/navbar/navbar";
import WhatsAppButton from "@/src/components/shared/whatsapp-button";
import { MobileMenuProvider } from "@/src/context/MobileMenuContext";
import { fontVariables } from "@/src/utils/font";
import { defaultMetadata } from "@/src/utils/generateMetaData";
import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import "./globals.css";

// Root-level metadata with metadataBase so all child pages resolve OG images correctly
export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        <Suspense>
          <PreloaderWrapper>
            <MobileMenuProvider>
              <SmoothScrollProvider>
                <Navbar />
                <main className="bg-background-13">{children}</main>
                <Footer />
                <WhatsAppButton />
              </SmoothScrollProvider>
            </MobileMenuProvider>
          </PreloaderWrapper>
        </Suspense>
      </body>
    </html>
  );
}

