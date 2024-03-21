import { Metadata, Viewport } from "next";
import AppFrame from "../components/AppFrame";
import { pageInfo } from "../lib/messages/pages";
import { Providers } from "./providers";
import { Suspense } from "react";

export const metadata: Metadata = {
  description: pageInfo.default.description,
  title: {
    template: pageInfo.default.titleTemplate,
    default: pageInfo.default.title,
  },
};

export const viewport: Viewport = {
  themeColor: pageInfo.default.themeColor,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            <AppFrame>{children}</AppFrame>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
