/** Types and constants for site content. Safe to import in client components (no Node.js or server-only deps). */

export interface HeroSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  infoUrl: string;
  flyerImage: string;
  sponsorLabel: string;
}

export interface GalleryItem {
  id: string;
  caption: string;
  imageUrl: string;
  date?: string;
}

/** Optional overrides for the home (landing) page sections. */
export interface HomeProgramCard {
  /** Must match one of the default program slugs (e.g. "educational-enrichment"). */
  slug: string;
  title?: string;
  description?: string;
  image?: string;
}

export interface HomeContent {
  /** Heading for the mission section (defaults to "Our Mission"). */
  missionHeading?: string;
  /** Main mission statement text under the heading. */
  missionStatement?: string;

  /** Heading and body for the programs intro above the cards. */
  programsIntroTitle?: string;
  programsIntroBody?: string;

  /** CTA section at the bottom of the home page. */
  ctaTitle?: string;
  ctaBody?: string;

  /** Optional overrides for the three program cards on the home page. */
  programCards?: HomeProgramCard[];
}

export type CustomPagePlacement = "header" | "footer" | "both" | "none";

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  heroImage: string;
  body: string;
  /** Where to show the page in site navigation. Default "none". */
  placement?: CustomPagePlacement;
}

/** Editable hero + body for built-in site pages (About, History, etc.). When set, the page uses this instead of hardcoded content. */
export interface StaticPageContent {
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  /** HTML body. Can include <img> tags; use admin "Insert image" to upload and add images. */
  body?: string;
}

export function hasStaticPageContent(c: StaticPageContent | undefined): boolean {
  if (!c) return false;
  return Boolean((c.heroImage ?? "").trim() || (c.heroTitle ?? "").trim() || (c.heroSubtitle ?? "").trim() || (c.body ?? "").trim());
}

/** Keys for built-in pages that can be edited in the admin. */
export const SITE_PAGE_KEYS = [
  "about",
  "history",
  "programs",
  "board",
  "committees",
  "donate",
  "contact",
  "gallery",
  "earl-exum-tribute",
] as const;

export type SitePageKey = (typeof SITE_PAGE_KEYS)[number];

export interface SiteContent {
  heroSlides: HeroSlide[];
  events: EventItem[];
  galleryItems: GalleryItem[];
  customPages: CustomPage[];
  /** Optional overrides for the landing (home) page sections. */
  home?: HomeContent;
  /** Editable content for built-in pages. Key = route segment (e.g. "about", "earl-exum-tribute"). */
  staticPageContent?: Partial<Record<SitePageKey, StaticPageContent>>;
  /** URL for the Donate button (third-party platform e.g. Zeffy, PayPal, Givebutter). When set, Donate Now redirects here. */
  donationLink?: string;
}

/** Default copy for each site page. Shown in the admin when no saved content exists so editors can edit current wording and photos. */
export const DEFAULT_STATIC_PAGE_CONTENT: Partial<Record<SitePageKey, StaticPageContent>> = {
  about: {
    heroImage: "/images/hero/communitygardenimage.webp",
    heroTitle: "About WHAASCO",
    heroSubtitle:
      "Empowering families, supporting youth, and celebrating African American culture through education and community.",
    body:
      '<h2>Who We Are</h2>' +
      '<p>We, the members of the <strong>West Hartford African American Social and Cultural Organization (WHAASCO)</strong>, are a non-profit organization established to support, encourage, and enhance the social, cultural, and educational well-being of African American families and the broader community.</p>' +
      '<h2>Our Mission</h2>' +
      '<p>Our mission is to promote unity, cultural awareness, and community involvement by providing programs and activities that strengthen families, support children, and foster pride in African American heritage and history.</p>' +
      '<h2>Our Purpose</h2>' +
      "<p>The purpose of WHAASCO is to provide social, cultural, and educational opportunities, promote positive self-image and cultural pride, encourage parental involvement, support youth development, and serve as a resource and advocate for families within the community.</p>",
  },
  history: {
    heroImage: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&q=80",
    heroTitle: "Our History",
    heroSubtitle: "Decades of community advocacy, education, and cultural celebration.",
    body:
      "<p>Edit this page in the admin to add your full history content. You can follow the sections from the current History page and update them as needed.</p>",
  },
  programs: {
    heroTitle: "Our Programs",
    heroSubtitle: "Learn more about the programs we offer and how they make a difference.",
    body:
      "<p>Add program descriptions, images, and key bullet points here. The existing Programs page can be used as a reference when you first populate this content.</p>",
  },
  board: {
    heroTitle: "Our Board",
    heroSubtitle: "The leaders who guide WHAASCO.",
    body:
      "<p>Add board member bios and photos here. The grid of board members is still rendered via the Board component; this content can be used for an introductory section.</p>",
  },
  committees: {
    heroTitle: "WHAASCO Committees",
    heroSubtitle: "Our committees drive programs, events, and community impact across West Hartford.",
    body:
      "<p>Edit committee descriptions and overview here. You can list committees, describe their focus, and add images where helpful.</p>",
  },
  donate: {
    heroTitle: "Support Our Mission",
    heroSubtitle:
      "Your donation supports WHAASCO's mission to strengthen families, uplift youth, and celebrate African American culture.",
    body:
      "<p>Add any extra message or context above the donation form here. The donation form and link itself are managed separately.</p>",
  },
  contact: {
    heroTitle: "Contact Us",
    heroSubtitle:
      "We'd love to hear from you. Get in touch using the form below or the contact information provided.",
    body:
      "<p>Add any introductory copy here, such as guidance on how best to reach WHAASCO or what to expect after submitting the form.</p>",
  },
  gallery: {
    heroTitle: "Gallery & Events",
    heroSubtitle: "Explore WHAASCO events and community moments.",
    body:
      "<p>Intro text for the gallery. Events and photos themselves are managed from the Events and Gallery tabs, but you can adjust the introduction here.</p>",
  },
  "earl-exum-tribute": {
    heroTitle: "A Tribute to President Earl Exum",
    heroSubtitle:
      "Honoring a leader whose vision, service, and hope for better communities continue to guide WHAASCO.",
    body:
      "<p>Edit the tribute content here. Use sections and headings to tell Earl Exum's story and highlight his impact on the community.</p>",
  },
};
