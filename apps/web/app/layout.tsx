import { dir } from "i18next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { headers, cookies } from "next/headers";
import Script from "next/script";
import React from "react";

import { getLocale } from "@calcom/features/auth/lib/getLocale";
import { IS_PRODUCTION } from "@calcom/lib/constants";

import { prepareRootMetadata } from "@lib/metadata";

import "../styles/globals.css";

const interFont = Inter({ subsets: ["latin"], variable: "--font-inter", preload: true, display: "swap" });
const calFont = localFont({
  src: "../fonts/CalSans-SemiBold.woff2",
  variable: "--font-cal",
  preload: true,
  display: "block",
});

export const generateMetadata = () =>
  prepareRootMetadata({
    twitterCreator: "@bakklog",
    twitterSite: "@bakklog",
    robots: {
      index: false,
      follow: false,
    },
  });

const getInitialProps = async (url: string) => {
  const { pathname, searchParams } = new URL(url);

  const isEmbed = pathname.endsWith("/embed") || (searchParams?.get("embedType") ?? null) !== null;
  const embedColorScheme = searchParams?.get("ui.color-scheme");

  const req = { headers: headers(), cookies: cookies() };
  const newLocale = await getLocale(req);
  const direction = dir(newLocale);

  return { isEmbed, embedColorScheme, locale: newLocale, direction };
};

const getFallbackProps = () => ({
  locale: "en",
  direction: "ltr",
  isEmbed: false,
  embedColorScheme: false,
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = headers();

  const fullUrl = h.get("x-url") ?? "";
  const nonce = h.get("x-csp") ?? "";

  const isSSG = !fullUrl;

  const { locale, direction, isEmbed, embedColorScheme } = isSSG
    ? getFallbackProps()
    : await getInitialProps(fullUrl);

  return (
    <html
      lang={locale}
      dir={direction}
      style={embedColorScheme ? { colorScheme: embedColorScheme as string } : undefined}
      data-nextjs-router="app">
      <head nonce={nonce}>
        {!IS_PRODUCTION && process.env.VERCEL_ENV === "preview" && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <Script
            data-project-id="KjpMrKTnXquJVKfeqmjdTffVPf1a6Unw2LZ58iE4"
            src="https://snippet.meticulous.ai/v1/stagingMeticulousSnippet.js"
          />
        )}
        <style>{`
          :root {
            --font-inter: ${interFont.style.fontFamily.replace(/\'/g, "")};
            --font-cal: ${calFont.style.fontFamily.replace(/\'/g, "")};
          }
        `}</style>
      </head>
      <body
        className="dark:bg-darkgray-50 todesktop:!bg-transparent bg-subtle antialiased"
        style={
          isEmbed
            ? {
                background: "transparent",
                // Keep the embed hidden till parent initializes and
                // - gives it the appropriate styles if UI instruction is there.
                // - gives iframe the appropriate height(equal to document height) which can only be known after loading the page once in browser.
                // - Tells iframe which mode it should be in (dark/light) - if there is a a UI instruction for that
                visibility: "hidden",
              }
            : {}
        }>
        {children}
      </body>
    </html>
  );
}
