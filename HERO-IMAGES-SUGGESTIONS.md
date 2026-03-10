# Hero image suggestions for WHAASCO

Use these to find **clear, high-quality** hero images that fit each carousel slide. The hero uses full-width `object-cover`, so landscape images look best.

---

## Image specs (for best quality)

| Spec | Recommendation |
|------|----------------|
| **Aspect ratio** | **16:9** (e.g. 1920×1080) or **3:2** (e.g. 1800×1200) |
| **Resolution** | At least **1920px wide** (1280px minimum for sharpness) |
| **Format** | PNG or high-quality JPG (80–90% quality) |
| **File size** | Under ~500KB per image after export so the page stays fast |

---

## Slide 1: “Empowering Families, Supporting Youth, Celebrating Culture”

**Mood:** Warm, inclusive, families and youth, community, hope.

**What to look for:**
- African American families or parents with children (diverse ages).
- Community gathering, people together (not a single face).
- Well-lit, sharp focus; avoid busy or dark images.
- Prefer real moments over posed; outdoors or community spaces work well.

**Search terms (Unsplash / Pexels):**
- `African American family community`
- `Black family together outdoors`
- `community gathering diverse families`
- `parents and children community event`

**Example-style ideas:** Family at a park or event, group of parents and kids at a community activity, people at an outdoor celebration.

---

## Slide 2: “Building Strong Communities Together”

**Mood:** Unity, partnership, collaboration, “since 1979” longevity, strength.

**What to look for:**
- People connecting (handshakes, huddles, group discussion).
- Community or civic setting (library, town hall, park, event space).
- Diverse group, mixed ages; suggests “together we build.”
- Clear, bright; room for text overlay (avoid text-heavy photos).

**Search terms:**
- `community meeting diverse group`
- `people together collaboration`
- `community event handshake`
- `diverse group discussion`

**Example-style ideas:** Group at a town meeting, volunteers at a community project, people at a local event or festival.

---

## Slide 3: “Celebrating Heritage, Creating Impact”

**Mood:** Culture, heritage, pride, celebration, impact.

**What to look for:**
- Cultural celebration (art, music, dance, food, dress).
- Joy and pride; can be event or performance.
- African American culture / Black culture (without being stereotyped).
- Strong colors and clear faces or gestures; not too dark.

**Search terms:**
- `African American culture celebration`
- `Black culture community event`
- `cultural festival celebration`
- `heritage celebration community`

**Example-style ideas:** Cultural festival, performers or musicians, community celebration with traditional or cultural elements.

---

## Slide 4: “Rooted in West Hartford”

**You already use:** `westhartfordlogosign.png` (flagpoles and stone wall).  
Keep this as the “place” slide unless you have a higher-resolution version of the same scene.

**If you want an alternative:** Same location in different light (e.g. golden hour) or a second West Hartford landmark (e.g. town green, library, main street), same specs (16:9, 1920px wide).

---

## Where to get images

1. **Unsplash** (unsplash.com) – Free, high resolution. Search the terms above; filter by “Orientation: Landscape.”
2. **Pexels** (pexels.com) – Free, good for “family” and “community” searches.
3. **Your own photos** – Events, gatherings, or West Hartford scenes. Export at 1920px wide, 16:9, for hero use.

**Licensing:** Unsplash and Pexels allow free commercial use; no attribution required (still good practice to credit if you want). Avoid Google Image results unless you have clear rights.

---

## File names and where they go

After you pick or export images:

| Slide | Current file | Suggested new filename (if you replace) |
|-------|----------------|-------------------------------------------|
| 1 – Empowering Families… | `hero-image.png` | e.g. `hero-families.png` or keep `hero-image.png` |
| 2 – Building Strong Communities | `heroimg3.png` | e.g. `hero-community.png` or keep `heroimg3.png` |
| 3 – Celebrating Heritage… | `hero-image.png` | e.g. `hero-heritage.png` (or reuse slide 1 if same image) |
| 4 – Rooted in West Hartford | `westhartfordlogosign.png` | Keep as is |

Put all hero images in the **`public/`** folder. Update the `image` path in `components/HeroCarousel.tsx` for each slide to match the new filename (e.g. `"/hero-families.png"`).

---

## Quick checklist for “clear and high quality”

- [ ] **Landscape** (16:9 or 3:2).
- [ ] **At least 1920px wide** (or 1280px minimum).
- [ ] **Sharp** (in focus, not blurry).
- [ ] **Well lit** (works with the dark gradient overlay).
- [ ] **On-theme** (families, community, culture, or West Hartford for slide 4).
- [ ] **Not too busy** (enough “quiet” area for overlay text).

If you tell me which slide(s) you want to replace first (1, 2, 3, or 4), I can suggest more targeted search links or adjust the carousel code for new filenames.
