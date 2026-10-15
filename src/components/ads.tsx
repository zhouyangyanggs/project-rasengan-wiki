type AdVariant =
  | "leaderboard"
  | "mobile"
  | "rectangle"
  | "sidebarTall"
  | "sidebarSmall"
  | "footer";

const AD_CONFIG: Record<AdVariant, { width: number; height: number }> = {
  leaderboard: { width: 728, height: 90 },
  mobile: { width: 320, height: 50 },
  rectangle: { width: 300, height: 250 },
  sidebarTall: { width: 160, height: 600 },
  sidebarSmall: { width: 160, height: 300 },
  footer: { width: 468, height: 60 },
};

export function AdsterraBanner({ variant, className = "" }: { variant: AdVariant; className?: string }) {
  const ad = AD_CONFIG[variant];

  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{ width: `${ad.width}px`, height: `${ad.height}px` }}
    >
      <iframe
        src={`/ads/banner-${ad.width}x${ad.height}.html`}
        width={ad.width}
        height={ad.height}
        title="Advertisement"
        loading="lazy"
        className="h-full w-full border-0 bg-transparent"
      />
    </div>
  );
}

export function AdShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1760px]">
      <div className="grid grid-cols-1 gap-6 px-0 2xl:grid-cols-[160px_minmax(0,1fr)_160px]">
        <aside className="hidden 2xl:block">
          <div className="sticky top-24">
            <AdsterraBanner variant="sidebarTall" />
          </div>
        </aside>

        <div className="min-w-0">
          <div className="sticky top-[64px] z-40 flex justify-center border-b border-border/60 bg-background/95 px-4 py-2 backdrop-blur">
            <AdsterraBanner variant="leaderboard" className="hidden lg:flex" />
            <AdsterraBanner variant="mobile" className="flex lg:hidden" />
          </div>

          {children}

          <div className="flex flex-col items-center gap-4 px-4 py-6">
            <AdsterraBanner variant="rectangle" />
            <AdsterraBanner variant="footer" className="hidden sm:flex" />
          </div>
        </div>

        <aside className="hidden 2xl:block">
          <div className="sticky top-24">
            <AdsterraBanner variant="sidebarSmall" />
          </div>
        </aside>
      </div>
    </div>
  );
}

