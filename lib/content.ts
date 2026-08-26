import { list, put } from "@vercel/blob";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";
import type { SiteContent, SitePageKey, StaticPageContent } from "./content-types";
import { SITE_PAGE_KEYS } from "./content-types";

export type { HeroSlide, EventItem, GalleryItem, CustomPage, CustomPagePlacement, StaticPageContent, SiteContent, SitePageKey } from "./content-types";
export { SITE_PAGE_KEYS, hasStaticPageContent } from "./content-types";

const CONTENT_PATH = "content.json";
const CONTENT_BACKUP_PATH = "content-backup.json";
const LOCAL_CONTENT_PATH = path.join(process.cwd(), ".data", "content.json");
const LOCAL_BACKUP_PATH = path.join(process.cwd(), ".data", "content-backup.json");

function getMailTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("Email not configured (missing SMTP_HOST/SMTP_USER/SMTP_PASS).");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

async function sendDonationLinkChangedEmail(previous: string, next: string) {
  // If email is not configured, fail silently so content saving still works.
  try {
    const transport = getMailTransport();
    const to = process.env.CONTACT_EMAIL || process.env.SMTP_TO || "info@whaasco.org";
    const from = process.env.SMTP_FROM || process.env.FROM_EMAIL || process.env.SMTP_USER || "noreply@whaasco.org";

    const prevDisplay = previous.trim() || "(none)";
    const nextDisplay = next.trim() || "(none)";

    const subject = "WHAASCO site: Donation link updated";
    const text = `The donation link in the WHAASCO admin was changed.

Previous: ${prevDisplay}
New: ${nextDisplay}

This controls where the Donate button and /donate route send visitors.`;

    const html = `<h2>Donation link updated</h2>
<p>The donation link in the WHAASCO admin was changed.</p>
<p><strong>Previous:</strong> ${prevDisplay}</p>
<p><strong>New:</strong> ${nextDisplay}</p>
<p>This controls where the <strong>Donate</strong> button and <code>/donate</code> route send visitors.</p>`;

    await transport.sendMail({
      to,
      from,
      subject,
      text,
      html,
    });
  } catch {
    // Swallow errors so a mail problem never blocks saving content.
  }
}

const defaultContent: SiteContent = {
  heroSlides: [
    {
      id: 5,
      title: "Beyond the Ballot",
      description:
        "A community conversation on civic engagement. Monday, Sept 21, 2026 · 6:00–7:30 PM at Noah Webster Library.",
      image: "/images/events/event2.jpeg",
      primaryButtonText: "Register today!",
      primaryButtonLink: "https://shorturl.at/D6dDC",
      secondaryButtonText: "Event details",
      secondaryButtonLink: "/gallery",
    },
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
      id: "beyond-the-ballot-2026",
      title: "Beyond the Ballot: A Community Conversation on Civic Engagement",
      date: "Monday, Sept 21, 2026",
      time: "6:00 PM – 7:30 PM",
      location: "Noah Webster Library — NWL Meeting Room",
      address: "20 South Main Street, West Hartford, CT 06107",
      infoUrl: "https://shorturl.at/D6dDC",
      flyerImage: "/images/events/event2.jpeg",
      sponsorLabel: "Your voice. Our community. Our future.",
    },
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
  home: undefined,
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
    const res = await fetch(exact.url, { cache: "no-store" });
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
  const newDonation = (normalized.donationLink ?? "").trim();
  let previousDonation = "";

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    await mkdir(path.dirname(LOCAL_CONTENT_PATH), { recursive: true });
    try {
      const current = await readFile(LOCAL_CONTENT_PATH, "utf-8");
      await writeFile(LOCAL_BACKUP_PATH, current, "utf-8");
      try {
        const parsed = JSON.parse(current) as SiteContent;
        previousDonation = (parsed.donationLink ?? "").trim();
      } catch {
        previousDonation = "";
      }
    } catch {
      // No existing file or no backup; continue with save
    }
    await writeFile(LOCAL_CONTENT_PATH, payload, "utf-8");

    if (previousDonation !== newDonation) {
      await sendDonationLinkChangedEmail(previousDonation, newDonation);
    }
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
        try {
          const parsed = JSON.parse(backupPayload) as SiteContent;
          previousDonation = (parsed.donationLink ?? "").trim();
        } catch {
          previousDonation = "";
        }
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

  if (previousDonation !== newDonation) {
    await sendDonationLinkChangedEmail(previousDonation, newDonation);
  }
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

function mergeById<T extends { id: string | number }>(saved: T[], defaults: T[]): T[] {
  const savedIds = new Set(saved.map((item) => item.id));
  const missing = defaults.filter((item) => !savedIds.has(item.id));
  return missing.length ? [...missing, ...saved] : saved;
}

function normalizeContent(c: Partial<SiteContent>): SiteContent {
  const existing = c.staticPageContent && typeof c.staticPageContent === "object" ? c.staticPageContent : {};
  const staticPageContent = { ...existing } as Partial<Record<SitePageKey, StaticPageContent>>;
  for (const key of SITE_PAGE_KEYS) {
    if (!staticPageContent[key]) staticPageContent[key] = {};
  }
  return {
    // Seed any new default slides/events that aren't in saved CMS content yet (so deploys can add featured events live).
    heroSlides: Array.isArray(c.heroSlides)
      ? mergeById(c.heroSlides, defaultContent.heroSlides)
      : defaultContent.heroSlides,
    events: Array.isArray(c.events)
      ? mergeById(c.events, defaultContent.events)
      : defaultContent.events,
    galleryItems: Array.isArray(c.galleryItems) ? c.galleryItems : defaultContent.galleryItems,
    customPages: Array.isArray(c.customPages) ? c.customPages : defaultContent.customPages,
    home: c.home && typeof c.home === "object" ? c.home : defaultContent.home,
    staticPageContent,
    donationLink: typeof c.donationLink === "string" ? c.donationLink : (defaultContent.donationLink ?? ""),
  };
}
