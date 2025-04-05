import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { PostHogProvider } from "~/app/_providers/posthog-provider";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "Drive clone app",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <PostHogProvider>
          <body>
            {children}
            <Toaster />
          </body>
        </PostHogProvider>
      </html>
    </ClerkProvider>
  );
}
