import { list, put } from "@vercel/blob";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import type { SiteContent, SitePageKey, StaticPageContent } from "./content-types";
import { SITE_PAGE_KEYS } from "./content-types";

export type { HeroSlide, EventItem, GalleryItem, CustomPage, CustomPagePlacement, StaticPageContent, SiteContent, SitePageKey } from "./content-types";
export { SITE_PAGE_KEYS, hasStaticPageContent } from "./content-types";

const CONTENT_PATH = "content.json";
const CONTENT_BACKUP_PATH = "content-backup.json";
const LOCAL_CONTENT_PATH = path.join(process.cwd(), ".data", "content.json");
const LOCAL_BACKUP_PATH = path.join(process.cwd(), ".data", "content-backup.json");

const defaultContent: SiteContent = {
  heroSlides: [
    {
      id: 1,
      title: "Empowering Families, Supporting Youth, Celebrating Culture",
      description:
        "Empowering families, supporting youth, and celebrating African American culture through education and community.",
      image: "/images/hero/heroimage.webp",
      primaryButtonText: "Donate Now",
      primaryButtonLink: "/donate",
      secondaryButtonText: "Learn More",
      secondaryButtonLink: "/about",
    },
    {
      id: 2,
      title: "Building Strong Communities Together",
      description:
        "Since 1979, we've been dedicated to strengthening families, supporting children, and fostering pride in African American heritage and history.",
      image: "/images/hero/communitygardenimage.webp",
      primaryButtonText: "Get Involved",
      primaryButtonLink: "/contact",
      secondaryButtonText: "Our Programs",
      secondaryButtonLink: "/programs",
    },
    {
      id: 3,
      title: "Celebrating Heritage, Creating Impact",
      description:
        "Join us in promoting unity, cultural awareness, and community involvement through programs that make a lasting difference.",
      image: "/images/hero/hero%20image.avif",
      primaryButtonText: "View History",
      primaryButtonLink: "/history",
      secondaryButtonText: "See Events",
      secondaryButtonLink: "/gallery",
    },
    {
      id: 4,
      title: "Rooted in West Hartford",
      description:
        "From the flagpoles to the stone wall, WHAASCO's work is grounded in the West Hartford community we call home.",
      image: "/westhartfordlogosign.png",
      primaryButtonText: "About WHAASCO",
      primaryButtonLink: "/about",
      secondaryButtonText: "Gallery & Events",
      secondaryButtonLink: "/gallery",
    },
  ],
  events: [
    {
      id: "black-business-expo-2026",
      title: "Black Business Expo",
      date: "Saturday, February 28, 2026",
      time: "1:00 PM – 4:00 PM",
      location: "West Hartford Conference Center in Town Hall",
      address: "50 South Main Street, West Hartford, CT",
      infoUrl: "https://bit.ly/whbbe26",
      flyerImage: "/images/events/black-business-expo-flyer.png",
      sponsorLabel:
        "Champion Sponsor: PeoplesBank · Community Advocate Sponsors: NBT Bank, BUDR Cannabis, West Hartford, Westfield Bank",
    },
  ],
  galleryItems: [],
  customPages: [],
  staticPageContent: {},
  donationLink: "",
};

export function getDefaultContent(): SiteContent {
  return JSON.parse(JSON.stringify(defaultContent));
}

export async function getContent(): Promise<SiteContent> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const raw = await readFile(LOCAL_CONTENT_PATH, "utf-8");
      const parsed = JSON.parse(raw) as SiteContent;
      return normalizeContent(parsed);
    } catch {
      return getDefaultContent();
    }
  }
  try {
    const blobs = await list({ prefix: "content", limit: 10 });
    const exact = blobs.blobs.find((b) => b.pathname === CONTENT_PATH);
    if (!exact?.url) return getDefaultContent();
    const res = await fetch(exact.url);
    if (!res.ok) return getDefaultContent();
    const parsed = (await res.json()) as SiteContent;
    return normalizeContent(parsed);
  } catch {
    return getDefaultContent();
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  const normalized = normalizeContent(content);
  const payload = JSON.stringify(normalized, null, 2);

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    await mkdir(path.dirname(LOCAL_CONTENT_PATH), { recursive: true });
    try {
      const current = await readFile(LOCAL_CONTENT_PATH, "utf-8");
      await writeFile(LOCAL_BACKUP_PATH, current, "utf-8");
    } catch {
      // No existing file or no backup; continue with save
    }
    await writeFile(LOCAL_CONTENT_PATH, payload, "utf-8");
    return;
  }

  try {
    const blobs = await list({ prefix: "content", limit: 10 });
    const exact = blobs.blobs.find((b) => b.pathname === CONTENT_PATH);
    if (exact?.url) {
      const res = await fetch(exact.url);
      if (res.ok) {
        const backupPayload = await res.text();
        await put(CONTENT_BACKUP_PATH, backupPayload, {
          access: "public",
          contentType: "application/json",
          addRandomSuffix: false,
          allowOverwrite: true,
        });
      }
    }
  } catch {
    // Backup failed; still save new content
  }
  await put(CONTENT_PATH, payload, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

/** Restore content from the last backup (previous version before last save). Use if someone altered content by mistake. */
export async function restoreContent(): Promise<boolean> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const backup = await readFile(LOCAL_BACKUP_PATH, "utf-8");
      const parsed = JSON.parse(backup) as SiteContent;
      const normalized = normalizeContent(parsed);
      await writeFile(LOCAL_CONTENT_PATH, JSON.stringify(normalized, null, 2), "utf-8");
      return true;
    } catch {
      return false;
    }
  }
  try {
    const blobs = await list({ prefix: "content", limit: 10 });
    const backupBlob = blobs.blobs.find((b) => b.pathname === CONTENT_BACKUP_PATH);
    if (!backupBlob?.url) return false;
    const res = await fetch(backupBlob.url);
    if (!res.ok) return false;
    const backupPayload = await res.text();
    const parsed = JSON.parse(backupPayload) as SiteContent;
    const normalized = normalizeContent(parsed);
    await put(CONTENT_PATH, JSON.stringify(normalized, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return true;
  } catch {
    return false;
  }
}

function normalizeContent(c: Partial<SiteContent>): SiteContent {
  const existing = c.staticPageContent && typeof c.staticPageContent === "object" ? c.staticPageContent : {};
  const staticPageContent = { ...existing } as Partial<Record<SitePageKey, StaticPageContent>>;
  for (const key of SITE_PAGE_KEYS) {
    if (!staticPageContent[key]) staticPageContent[key] = {};
  }
  return {
    heroSlides: Array.isArray(c.heroSlides) ? c.heroSlides : defaultContent.heroSlides,
    events: Array.isArray(c.events) ? c.events : defaultContent.events,
    galleryItems: Array.isArray(c.galleryItems) ? c.galleryItems : defaultContent.galleryItems,
    customPages: Array.isArray(c.customPages) ? c.customPages : defaultContent.customPages,
    staticPageContent,
    donationLink: typeof c.donationLink === "string" ? c.donationLink : (defaultContent.donationLink ?? ""),
  };
}
