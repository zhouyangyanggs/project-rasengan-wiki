import { BookOpen, CalendarClock, Layers, Milestone, Newspaper, PlayCircle, Smartphone, Tv, BookText } from "lucide-react";

export const NAVIGATION_CONFIG = [
  { key: "guide", path: "/guide", icon: BookOpen, isContentType: true },
  { key: "release-dates", path: "/release-dates", icon: CalendarClock, isContentType: true },
  { key: "news", path: "/news", icon: Newspaper, isContentType: true },
  { key: "anime", path: "/anime", icon: Tv, isContentType: true },
  { key: "manga", path: "/manga", icon: BookText, isContentType: true },
  { key: "roadmap", path: "/roadmap", icon: Milestone, isContentType: true },
  { key: "card-game", path: "/card-game", icon: Layers, isContentType: true },
  { key: "mobile-game", path: "/mobile-game", icon: Smartphone, isContentType: true },
  { key: "trailers", path: "/trailers", icon: PlayCircle, isContentType: true },
] as const;

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) => item.path.replace(/^\//, ""));
