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
    <>
      <div className="sticky top-[65px] z-40 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="flex flex-col items-center px-4 py-2">
          <span className="mb-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Advertisement
          </span>
          <AdsterraBanner variant="mobile" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </div>

      <div className="mx-auto mt-10 max-w-7xl space-y-5 px-4 pb-8">
        <div className="flex flex-col items-center">
          <span className="mb-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Advertisement
          </span>
          <AdsterraBanner variant="rectangle" />
        </div>
        <div className="flex flex-wrap items-start justify-center gap-5">
          <div className="hidden flex-col items-center lg:flex">
            <AdsterraBanner variant="leaderboard" />
          </div>
          <div className="hidden flex-col items-center sm:flex">
            <AdsterraBanner variant="footer" />
          </div>
        </div>
      </div>

      <div className="fixed left-2 top-1/2 z-40 hidden min-[1700px]:block -translate-y-1/2">
        <div className="flex flex-col items-center">
          <span className="mb-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Advertisement
          </span>
          <AdsterraBanner variant="sidebarTall" />
        </div>
      </div>

      <div className="fixed right-2 top-1/2 z-40 hidden min-[1700px]:block -translate-y-1/2">
        <div className="flex flex-col items-center">
          <span className="mb-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Advertisement
          </span>
          <AdsterraBanner variant="sidebarSmall" />
        </div>
      </div>
    </>
  );
}
