import Link from "next/link";
import { ChevronRight, Menu } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { NAVIGATION_CONFIG } from "@/config/navigation";
import type { NavGroup } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CollapsibleNavGroup } from "@/components/collapsible-nav-group";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ClientThemeToggle } from "@/components/theme-toggle";

export function localizeHref(href: string, locale: string) { return locale === "en" ? href : `/${locale}${href === "/" ? "" : href}`; }

export async function SiteHeader({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "nav" });
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href={localizeHref("/", locale)} className="flex items-center gap-3">
            <img src="/apple-touch-icon.png" alt="Project Rasengan" className="h-10 w-10 rounded-lg object-cover" />
            <span className="hidden items-baseline gap-1.5 sm:flex">
              <span className="text-base font-extrabold tracking-tight text-foreground">Project Rasengan</span>
              <span className="text-sm font-semibold text-muted-foreground">Wiki</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {NAVIGATION_CONFIG.map((item) => (<Link key={item.key} href={localizeHref(item.path, locale)} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">{t(item.key)}</Link>))}
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} />
            <ClientThemeToggle label={t("toggleTheme")} />
            <Sheet>
              <SheetTrigger asChild className="lg:hidden"><Button variant="outline" size="icon" aria-label={t("menu")}><Menu className="h-4 w-4" /></Button></SheetTrigger>
              <SheetContent className="border-border bg-background text-foreground"><div className="mt-8 grid gap-2">{NAVIGATION_CONFIG.map((item) => <Link key={item.key} href={localizeHref(item.path, locale)} className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-muted">{t(item.key)}</Link>)}</div></SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (<nav className="mb-7 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">{items.map((item, index) => (<span key={`${item.label}-${index}`} className="flex items-center gap-2">{index > 0 && <ChevronRight className="h-4 w-4" />}{item.href ? <Link className="hover:text-foreground" href={item.href}>{item.label}</Link> : <span className="text-foreground">{item.label}</span>}</span>))}</nav>);
}

export async function WikiSidebar({ locale, navGroups, currentPath }: { locale: string; navGroups: NavGroup[]; currentPath?: string }) {
  const t = await getTranslations({ locale, namespace: "shared" });
  const isActive = (href: string) => currentPath === href;
  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-1">
      <section className="rounded-2xl border border-border bg-card/60 p-5 shadow-sm">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">{t("wikiNavigation")}</h3>
        <div className="space-y-4">
          {navGroups.map((group) => (<CollapsibleNavGroup key={group.slug} title={group.title} icon={<span className="grid h-4 w-4 place-items-center rounded text-[10px] font-bold text-[hsl(var(--nav-theme))]">{group.title[0]}</span>} count={group.count} currentPath={currentPath}><ul className="space-y-1">{group.links.map((link) => <li key={link.href}><Link href={localizeHref(link.href, locale)} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${isActive(link.href) ? "bg-[hsl(var(--nav-theme)/0.15)] font-semibold text-[hsl(var(--nav-theme))]" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}><span className="truncate">{link.label}</span>{link.badge && <Badge variant="secondary" className="ml-auto h-5 border-border px-1.5 text-[10px]">{link.badge}</Badge>}</Link></li>)}</ul></CollapsibleNavGroup>))}
        </div>
      </section>
      <section className="rounded-2xl border border-border bg-card/60 p-5"><h3 className="mb-3 text-sm font-bold text-foreground">{t("activeCodes")}</h3><div className="rounded-xl bg-muted p-3 text-sm text-muted-foreground">{t("noCodes")}</div></section>
    </aside>
  );
}

function FooterList({ title, links }: { title: string; links: string[][] }) { return (<div><h4 className="font-semibold text-foreground">{title}</h4><ul className="mt-3 space-y-2 text-sm text-muted-foreground">{links.map(([label, href]) => <li key={href}><Link className="hover:text-foreground" href={href}>{label}</Link></li>)}</ul></div>); }

export async function SiteFooter({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const site = await getTranslations({ locale, namespace: "site" });
  return (
    <footer className="mt-20 border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-2xl border border-border bg-muted/40 p-5">
          <div className="font-bold text-foreground">Project Rasengan Wiki</div>
          <p className="mt-1 text-sm text-muted-foreground">{site("description")}</p>
          <Link href="https://naruto-official.com/en/special/rasengan" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--nav-theme))]" target="_blank" rel="noopener noreferrer">{t("playGame")}</Link>
        </div>
        <p className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{site("legalNotice")}</p>
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2"><h3 className="font-bold text-foreground">{t("aboutTitle")}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{t("about")}</p></div>
          <FooterList title={t("officialYoutube")} links={[["Official YouTube", "https://www.youtube.com/@NARUTO_BORUTO_officialchannel"], ["Official X", "https://x.com/NARUTO_kousiki"], ["Official Instagram", "https://www.instagram.com/NTMGamePJTJP"]]} />
          <FooterList title={t("communityTool")} links={[["NARUTO CARD GAME", "https://www.naruto-cardgame.com/en/"], [t("privacyPolicy"), "/privacy-policy"], [t("termsOfService"), "/terms-of-service"]]} />
        </div>
        <p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">{t("copyright")}</p>
      </div>
    </footer>
  );
}

export function JsonLd({ data }: { data: unknown }) { return <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />; }
