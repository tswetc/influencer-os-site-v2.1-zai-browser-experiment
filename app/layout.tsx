import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { PwaRegister } from "@/components/pwa-register";
import "./globals.css";

// Fix Pack 8: Open Graph / Twitter cards (link previews in Telegram, DMs,
// Twitter), PWA manifest and iOS standalone install.
// Fix Pack 21: a service worker (public/sw.js) caches the static shell so
// the installed app opens offline. It never touches /api/* or non-GET
// requests — license activation and re-checks always hit the network.
// The theme boot script applies the saved studio theme before first paint,
// so a dark-theme user no longer sees a white flash on /app.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://apply-patch-files.vercel.app";

const TITLE = "Influencer OS — AI Character Prompt Studio";
const DESCRIPTION =
  "Build consistent AI characters across Nano Banana Pro, Kling, Seedance, Veo and Omni Flash with one character passport and model-specific prompts.";

const UI_BOOT = `try{var isApp=location.pathname.indexOf("/app")===0;var s=isApp?JSON.parse(localStorage.getItem("ios_settings")||"{}"):{};if(isApp&&(s.theme==="dark"||s.theme==="contrast"))document.documentElement.classList.add(s.theme);var saved=isApp?s.language:localStorage.getItem("ios_landing_lang");document.documentElement.lang=saved==="ru"||saved==="en"?saved:(navigator.language||"").toLowerCase().indexOf("ru")===0?"ru":"en"}catch(e){document.documentElement.lang="en"}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Influencer OS",
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    siteName: "Influencer OS",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#F5F5F7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: UI_BOOT }} />
        {children}
        <PwaRegister />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
