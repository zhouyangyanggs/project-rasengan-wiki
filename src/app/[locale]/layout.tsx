import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/site";
import { routing } from "@/i18n/routing";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://project-rasengan-wiki.vercel.app";

export function generateStaticParams() { return routing.locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const image = `${siteUrl}/images/rasengan/41_ogp_og-image-en.png`;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: messages.metadata.title, template: "%s" },
    description: messages.metadata.description,
    keywords: messages.metadata.keywords,
    verification: { google: "OYuBAYBQmAIObKvw7weTnn3_yJxbz9WJiJo0fAGJZRM" },
    icons: { icon: "/favicon.ico" },
    openGraph: { type: "website", locale, url: siteUrl, siteName: "Project Rasengan Wiki", images: [{ url: image }] },
    twitter: { card: "summary_large_image", images: [{ url: image }] },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();
  const website = { "@context": "https://schema.org", "@type": "WebSite", name: "Project Rasengan Wiki", url: siteUrl };
  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NextIntlClientProvider messages={messages}>
            <GoogleAnalytics gaId="G-C9C340VY98" />
            <JsonLd data={website} />
            <SiteHeader locale={locale} />
            {children}
            <SiteFooter locale={locale} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
