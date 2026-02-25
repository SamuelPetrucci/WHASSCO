# WHAASCO Website — Direction & Improvements Guide

This guide ties your **content feedback form** to concrete changes and gives direction for making the site more appealing and user-friendly while capturing WHAASCO’s essence.

---

## 1. Share preview (link preview / “when we text the website”)

**Done.** When someone shares the site (text, social, messaging apps), the preview now uses **your organization logo**.

- **Technical:** Open Graph and Twitter Card metadata in `app/layout.tsx` point to `/image.png`.
- **What you need:** Place your logo at **`public/image.png`** (same file used in the header). For best previews on social/media, use a square or 1200×630px image; the logo should be clear and centered.
- **Production URL:** Set `NEXT_PUBLIC_SITE_URL` in your hosting env (e.g. `https://yoursite.org`) so preview images resolve correctly.

---

## 2. Using the content feedback form

Use **`CONTENT-FEEDBACK.txt`** as your single checklist. When you have edits:

1. Fill in **Section 1** (text/copy) for Homepage, About, History, Board, Gallery, Donate, Contact, Footer.
2. Use **Section 2** to list photos you want, where they go, and filenames (e.g. `about-hero.jpg`, `board-event-2023.jpg`).
3. Use **Section 3** to choose hero/banner images for each page (home carousel, About, History, etc.).
4. Use **Section 4** when board photos are ready (name, title, filename).
5. Use **Section 5** for new pages, links (donation, social), and other requests.

Send the filled form plus the actual image files (or links) to the web team so changes can be applied in one pass.

---

## 3. Making the site more appealing and user-friendly

### Photos

- **Show, don’t only tell.** Replace placeholder areas (e.g. About hero, “Who We Are” image) with real photos: events, families, youth programs, community gatherings.
- **Hero carousel:** Use 3 strong images (see CONTENT-FEEDBACK Section 3). Ideally: one “community/family,” one “programs/events,” one “culture/celebration.” Same aspect ratio (e.g. 16:9) for a smooth carousel.
- **Gallery:** Add captions and short descriptions (CONTENT-FEEDBACK Section 2). Even one line per photo (event name + date) helps.
- **About / History:** One clear “Who We Are” photo and one for Bristow/legacy (if you have it) will make those sections feel real and rooted.

### Transitions and motion

- **Page load:** The site already uses a light fade-in; keep it subtle so it doesn’t slow perception of content.
- **Carousel:** Consider a short crossfade (e.g. 400–600ms) between hero slides instead of a hard cut, so the hero feels smoother.
- **Sections:** Optional: very light fade-in or slide-up as sections enter the viewport (e.g. on About, History). Use sparingly so the site stays fast and accessible.
- **Hover:** Keep hover states on buttons and links clear; avoid heavy animation that might distract from reading.

### Capturing WHAASCO’s essence (without saying too much or too little)

- **Homepage:** One clear mission line + one “what we do” line is enough. Let the hero images and one strong CTA (e.g. Donate / Get Involved) carry the rest.
- **About:** Lead with “Who We Are” and “Our Mission” in short paragraphs. Use bullets for purpose and programs so they’re scannable. One “Our History” sentence with a link to the full History page is enough on About.
- **History:** Keep formation and key milestones concise. Use a short Bristow/legacy section and a clear list of program topics and community support; details can live in a few sentences rather than long blocks.
- **Board:** Short intro + names/titles (and photos when ready). One line on “Get Involved” with a link to Contact or Join is sufficient.
- **Tone:** Warm, inclusive, proud of heritage and community. Prefer short sentences and active voice. Avoid jargon; use “families,” “youth,” “community,” “culture,” “heritage” as your anchors.

### User-friendly tweaks

- **Navigation:** Keep the main nav simple (About, History, Board, Gallery, Donate, Contact). Dropdowns only where needed (e.g. “About” if you add sub-pages later).
- **Contact:** Make email and phone obvious (and update them in CONTENT-FEEDBACK if they change). If address is “Coming soon,” say that clearly.
- **Donate:** One clear message + one primary button/link. Remove extra steps if possible.
- **Footer:** Tagline + social links (from CONTENT-FEEDBACK) so people can follow and share.
- **Mobile:** Test key actions (Donate, Contact, Join) on a phone; ensure buttons and links are easy to tap and forms are readable.

---

## 4. Quick checklist before launch

- [ ] Logo at `public/image.png` (and optional 1200×630 version for best share previews).
- [ ] `NEXT_PUBLIC_SITE_URL` set in production.
- [ ] CONTENT-FEEDBACK form filled for all sections you care about.
- [ ] Hero carousel: 3 images + short titles/descriptions.
- [ ] About and History: hero/banner images and section images added.
- [ ] Contact: correct email, phone, and address/“Coming soon.”
- [ ] Donate: correct link and one clear CTA.
- [ ] Footer: tagline and social links.

---

## 5. Summary

- **Share preview:** Uses your logo; ensure `public/image.png` exists and `NEXT_PUBLIC_SITE_URL` is set.
- **Feedback:** Use `CONTENT-FEEDBACK.txt` as the single place to list all text, photo, and hero choices.
- **Appeal:** More real photos (especially heroes and About/History), light transitions, short and scannable copy, one clear CTA per page.
- **Essence:** Warm, community- and culture-focused; show people and events, and keep copy tight so the organization’s impact and identity come through without overload.

When you have the feedback form filled and the new images, the web team can implement copy, photos, and any transition tweaks in a coordinated way.
