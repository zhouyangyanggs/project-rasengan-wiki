"use client";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { localizeHref } from "@/components/site";
import type { ContentItem } from "@/lib/content";
import en from "@/locales/en.json";

type Home = typeof en.home;

export default function HomePageClient({ home, locale, articles, recentArticles }: { home: Home; locale: string; articles: ContentItem[]; recentArticles: ContentItem[] }) {
  return (
    <div className="space-y-16">
      <section className="text-center">
        <div className="mx-auto mb-5 flex items-center justify-center gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">{home.hero.title}</h1>
          <span className="mt-2 inline-flex items-center rounded-md border border-[hsl(var(--nav-theme))] bg-[hsl(var(--nav-theme))] px-2.5 py-0.5 text-xs font-semibold text-primary-foreground sm:-translate-y-1.5">{home.hero.eyebrow}</span>
        </div>
        <div className="mx-auto mt-5 max-w-4xl overflow-hidden rounded-2xl border border-border shadow-lg">
          <video className="aspect-video w-full bg-black" controls preload="metadata" poster="/images/rasengan/01_main_kv_en.webp">
            <source src="/videos/project_rasengan_main_trailer.mp4" type="video/mp4" />
            {home.hero.videoLabel}
          </video>
        </div>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">{home.hero.description}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">{home.hero.stats.map((stat) => <span key={stat} className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{stat}</span>)}</div>
      </section>
      <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="border-border bg-card/70 p-5">
          <h2 className="mb-4 text-xl font-bold text-foreground">{home.updates.title}</h2>
          <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
            {recentArticles.map((article) => (
              <Link key={`/${article.contentType}/${article.slug}`} href={localizeHref(`/${article.contentType}/${article.slug}`, locale)} className="block rounded-xl border border-border bg-background p-4 transition hover:border-[hsl(var(--nav-theme-light))]">
                <div className="mb-2 flex items-center justify-between"><Badge className="bg-[hsl(var(--nav-theme))] text-primary-foreground">{article.metadata.badge || article.contentType}</Badge><span className="text-xs text-muted-foreground">{article.metadata.date}</span></div>
                <p className="font-semibold text-foreground">{article.metadata.title}</p>
              </Link>
            ))}
          </div>
          <Button asChild className="mt-5 w-full" variant="outline"><Link href={localizeHref("/guide", locale)}>{home.updates.browse}</Link></Button>
        </Card>
        <div>
          <p className="text-sm font-semibold text-[hsl(var(--nav-theme))]">{home.start.eyebrow}</p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground">{home.start.title}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">{home.start.cards.map((card) => (<div key={card.number} className="rounded-2xl border border-border bg-card/70 p-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-[hsl(var(--nav-theme))] text-sm font-bold text-primary-foreground">{card.number}</span><h3 className="mt-4 font-bold text-foreground">{card.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{card.description}</p></div>))}</div>
        </div>
      </section>
      {articles.length > 0 && (
        <section>
          <div className="flex items-center justify-between"><p className="text-sm font-semibold text-[hsl(var(--nav-theme))]">{home.popular.eyebrow}</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground">{home.popular.title}</h2></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 6).map((article) => (
              <Link key={`${article.locale}-${article.contentType}-${article.slug}`} href={localizeHref(`/${article.contentType}/${article.slug}`, locale)} className="group rounded-2xl border border-border bg-card/70 p-5 transition hover:border-[hsl(var(--nav-theme-light))]">
                <Badge variant="secondary">{article.metadata.badge || article.contentType}</Badge>
                <h3 className="mt-4 font-bold text-foreground">{article.metadata.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{article.metadata.summary || article.metadata.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--nav-theme))]">Read More <ChevronRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </section>
      )}
      <section className="grid gap-8 rounded-3xl border border-border bg-card/60 p-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div><h2 className="text-3xl font-bold tracking-tight text-foreground">{home.aboutGame.title}</h2>{home.aboutGame.paragraphs.map((p) => <p key={p} className="mt-5 leading-8 text-muted-foreground">{p}</p>)}<Button asChild className="mt-6"><Link href={localizeHref("/guide/what-is-project-rasengan", locale)}>{home.aboutGame.cta}</Link></Button></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">{home.aboutGame.stats.map((stat) => (<div key={stat.label} className="rounded-2xl border border-border bg-background p-4"><p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</p><p className="mt-2 text-xl font-bold text-foreground">{stat.value}</p></div>))}</div>
      </section>
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">{home.faq.title}</h2>
        <p className="mt-2 text-muted-foreground">{home.faq.description}</p>
        <Accordion type="single" collapsible className="mt-6 rounded-2xl border border-border bg-card/70 px-5">
          {home.faq.items.map((item, index) => (<AccordionItem key={item.question} value={`item-${index}`}><AccordionTrigger className="text-left text-foreground">{item.question}</AccordionTrigger><AccordionContent className="leading-7 text-muted-foreground">{item.answer}</AccordionContent></AccordionItem>))}
        </Accordion>
      </section>
      <section className="rounded-3xl border border-border bg-gradient-to-br from-muted to-card p-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">{home.finalCta.title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{home.finalCta.description}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"><Link href={localizeHref("/guide/what-is-project-rasengan", locale)}>{home.finalCta.primary}<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          <Button asChild size="lg" variant="outline"><Link href="https://naruto-official.com/en/special/rasengan" target="_blank" rel="noopener noreferrer">{home.finalCta.secondary}</Link></Button>
        </div>
      </section>
    </div>
  );
}
