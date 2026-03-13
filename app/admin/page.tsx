"use client";

import { useState, useEffect, useCallback } from "react";
import type { SiteContent, HeroSlide, EventItem, GalleryItem, CustomPage, CustomPagePlacement, StaticPageContent } from "@/lib/content-types";
import { SITE_PAGE_KEYS, type SitePageKey, DEFAULT_STATIC_PAGE_CONTENT } from "@/lib/content-types";

const CONTENT_API = "/api/content";
const UPLOAD_API = "/api/upload";
const VERIFY_API = "/api/admin/verify";
const ADMIN_STORAGE_KEY = "whaasco_admin_secret";

type HeroLinkOption = { label: string; href: string };

function buildHeroLinkOptions(content: SiteContent): HeroLinkOption[] {
  const base: HeroLinkOption[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "History", href: "/history" },
    { label: "Programs", href: "/programs" },
    { label: "Committees", href: "/committees" },
    { label: "Board", href: "/board" },
    { label: "Gallery & Events", href: "/gallery" },
    { label: "Donate", href: "/donate" },
    { label: "Contact", href: "/contact" },
    { label: "Earl Exum Tribute", href: "/earl-exum-tribute" },
  ];
  const custom: HeroLinkOption[] =
    (content.customPages ?? [])
      .filter((p) => p.slug && (p.title || p.slug))
      .map((p) => ({
        label: p.title || p.slug,
        href: `/pages/${p.slug}`,
      })) ?? [];
  return [...base, ...custom];
}

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [storedSecret, setStoredSecret] = useState<string | null>(null);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [saving, setSaving] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"hero" | "events" | "gallery" | "pages" | "site-pages">("hero");

  const headers = useCallback(() => {
    const h: Record<string, string> = { "Content-Type": "application/json" };
    if (storedSecret) h["x-admin-secret"] = storedSecret;
    return h;
  }, [storedSecret]);

  useEffect(() => {
    const s = typeof window !== "undefined" ? sessionStorage.getItem(ADMIN_STORAGE_KEY) : null;
    setStoredSecret(s);
  }, []);

  useEffect(() => {
    if (!storedSecret) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetch(CONTENT_API)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Failed to load"))))
      .then((data) => {
        if (!cancelled) setContent(data);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load content. Check your password and that the content API is available.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [storedSecret]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const password = secret.trim();
    if (!password) return;
    setLoggingIn(true);
    setError(null);
    try {
      const res = await fetch(VERIFY_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-secret": password },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = typeof data?.error === "string" ? data.error : "Invalid password";
        throw new Error(msg);
      }
      sessionStorage.setItem(ADMIN_STORAGE_KEY, password);
      setStoredSecret(password);
      setSecret("");
      setLoading(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid password");
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    setStoredSecret(null);
    setContent(null);
  };

  const save = async () => {
    if (!content || !storedSecret) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(CONTENT_API, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error(await res.text());
      // Refetch so the UI matches what's actually stored (important when deleting pages)
      const refetched = await fetch(CONTENT_API).then((r) => (r.ok ? r.json() : null));
      if (refetched) setContent(refetched);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const restore = async () => {
    if (!storedSecret) return;
    if (!confirm("Restore content to the previous version (before the last save)? This cannot be undone.")) return;
    setRestoring(true);
    setError(null);
    try {
      const res = await fetch(`${CONTENT_API}?action=restore`, {
        method: "PUT",
        headers: { "x-admin-secret": storedSecret },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(typeof data?.error === "string" ? data.error : "Restore failed");
      }
      const data = await fetch(CONTENT_API).then((r) => (r.ok ? r.json() : Promise.reject(new Error("Failed to reload"))));
      setContent(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Restore failed");
    } finally {
      setRestoring(false);
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(UPLOAD_API, {
      method: "POST",
      headers: { "x-admin-secret": storedSecret! },
      body: form,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = typeof data?.error === "string" ? data.error : `Upload failed (${res.status})`;
      throw new Error(msg);
    }
    if (!data?.url) throw new Error("Upload succeeded but no URL returned");
    return data.url;
  };

  if (!storedSecret) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form onSubmit={login} className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin login</h1>
          <p className="text-gray-600 text-sm mb-4">Enter the admin password to edit hero, events, gallery, custom pages, and site page content.</p>
          <input
            type="password"
            value={secret}
            onChange={(e) => {
              setSecret(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
            autoFocus
          />
          {error && (
            <p className="text-red-600 text-sm mb-3" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loggingIn}
            className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loggingIn ? "Verifying…" : "Log in"}
          </button>
        </form>
      </div>
    );
  }

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">{loading ? "Loading…" : "Failed to load content."}</p>
      </div>
    );
  }

  const heroLinkOptions = buildHeroLinkOptions(content);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">WHAASCO Admin</h1>
        <div className="flex items-center gap-4">
          <a href="/" className="text-primary-600 hover:underline text-sm">View site</a>
          <button onClick={logout} className="text-gray-600 hover:text-gray-900 text-sm">Log out</button>
          <button
            onClick={restore}
            disabled={restoring}
            className="text-amber-700 bg-amber-100 px-4 py-2 rounded-lg font-medium hover:bg-amber-200 disabled:opacity-50 text-sm"
            title="Revert to the version before the last save (e.g. if someone altered something by mistake)"
          >
            {restoring ? "Restoring…" : "Restore previous version"}
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save all changes"}
          </button>
        </div>
      </header>

      {error && (
        <div className="mx-4 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          {error}
        </div>
      )}

      {typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && (
        <div className="mx-4 mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-sm" role="status">
          <p className="font-medium">You are editing local content only.</p>
          <p className="mt-1 text-amber-800">
            Changes here only affect your computer. To add or remove pages on the <strong>live site</strong>, open your site&apos;s admin on the live URL (e.g. yoursite.vercel.app/admin), make your changes there, and click Save.
          </p>
        </div>
      )}

      <div className="p-4 max-w-5xl mx-auto">
        <div className="flex gap-2 border-b border-gray-200 mb-6">
          {(["hero", "events", "gallery", "pages", "site-pages"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium rounded-t-lg capitalize ${
                activeTab === tab ? "bg-white border border-b-0 border-gray-200 text-primary-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab === "hero" ? "Hero carousel" : tab === "pages" ? "Custom pages" : tab === "site-pages" ? "Site pages" : tab}
            </button>
          ))}
        </div>

        {activeTab === "hero" && (
          <HeroEditor
            slides={content.heroSlides}
            onChange={(heroSlides) => setContent((c) => (c ? { ...c, heroSlides } : c))}
            onUpload={uploadFile}
            linkOptions={heroLinkOptions}
          />
        )}
        {activeTab === "events" && (
          <EventsEditor
            events={content.events}
            onChange={(events) => setContent((c) => (c ? { ...c, events } : c))}
            onUpload={uploadFile}
          />
        )}
        {activeTab === "gallery" && (
          <GalleryEditor
            items={content.galleryItems}
            onChange={(galleryItems) => setContent((c) => (c ? { ...c, galleryItems } : c))}
            onUpload={uploadFile}
          />
        )}
        {activeTab === "pages" && (
          <PagesEditor
            pages={content.customPages ?? []}
            onChange={(customPages) => setContent((c) => (c ? { ...c, customPages } : c))}
            onUpload={uploadFile}
          />
        )}
        {activeTab === "site-pages" && (
          <SitePagesEditor
            staticPageContent={content.staticPageContent ?? {}}
            onChange={(staticPageContent) => setContent((c) => (c ? { ...c, staticPageContent } : c))}
            donationLink={content.donationLink ?? ""}
            onDonationLinkChange={(v) => setContent((c) => (c ? { ...c, donationLink: v } : c))}
            onUpload={uploadFile}
          />
        )}
      </div>
    </div>
  );
}

function HeroEditor({
  slides,
  onChange,
  onUpload,
  linkOptions,
}: {
  slides: HeroSlide[];
  onChange: (slides: HeroSlide[]) => void;
  onUpload: (file: File) => Promise<string>;
  linkOptions: HeroLinkOption[];
}) {
  const update = (index: number, partial: Partial<HeroSlide>) => {
    const next = [...slides];
    next[index] = { ...next[index], ...partial };
    onChange(next);
  };
  const add = () => {
    onChange([
      ...slides,
      {
        id: Math.max(0, ...slides.map((s) => s.id)) + 1,
        title: "",
        description: "",
        image: "",
        primaryButtonText: "Learn more",
        primaryButtonLink: "/",
      },
    ]);
  };
  const remove = (index: number) => {
    onChange(slides.filter((_, i) => i !== index));
  };
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <p className="font-medium">Hero buttons link to real pages</p>
        <p className="mt-1 text-amber-800">
          Choose where each hero button should go using the dropdown. Only existing pages and custom pages are shown, so links stay valid.
        </p>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Hero carousel slides</h2>
        <button type="button" onClick={add} className="text-primary-600 font-medium hover:underline">
          + Add slide
        </button>
      </div>
      {slides.map((slide, i) => (
        <div key={i} className="bg-white rounded-xl shadow p-6 space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Slide {i + 1}</span>
            <button type="button" onClick={() => remove(i)} className="text-red-600 text-sm hover:underline">
              Remove
            </button>
          </div>
          <ImageField label="Image" value={slide.image} onChange={(v) => update(i, { image: v })} onUpload={onUpload} />
          <Field label="Title" value={slide.title} onChange={(v) => update(i, { title: v })} />
          <Field label="Description" value={slide.description} onChange={(v) => update(i, { description: v })} textarea />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Primary button text" value={slide.primaryButtonText} onChange={(v) => update(i, { primaryButtonText: v })} />
            <HeroLinkField
              label="Primary button link"
              value={slide.primaryButtonLink}
              options={linkOptions}
              onChange={(href) => update(i, { primaryButtonLink: href })}
            />
            <Field label="Secondary button text" value={slide.secondaryButtonText || ""} onChange={(v) => update(i, { secondaryButtonText: v || undefined })} />
            <HeroLinkField
              label="Secondary button link"
              value={slide.secondaryButtonLink || ""}
              options={linkOptions}
              onChange={(href) => update(i, { secondaryButtonLink: href || undefined })}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function EventsEditor({
  events,
  onChange,
  onUpload,
}: {
  events: EventItem[];
  onChange: (events: EventItem[]) => void;
  onUpload: (file: File) => Promise<string>;
}) {
  const update = (index: number, partial: Partial<EventItem>) => {
    const next = [...events];
    next[index] = { ...next[index], ...partial };
    onChange(next);
  };
  const add = () => {
    onChange([
      ...events,
      {
        id: `event-${Date.now()}`,
        title: "",
        date: "",
        time: "",
        location: "",
        address: "",
        infoUrl: "",
        flyerImage: "",
        sponsorLabel: "",
      },
    ]);
  };
  const remove = (index: number) => onChange(events.filter((_, i) => i !== index));
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Events</h2>
        <button type="button" onClick={add} className="text-primary-600 font-medium hover:underline">
          + Add event
        </button>
      </div>
      {events.map((ev, i) => (
        <div key={i} className="bg-white rounded-xl shadow p-6 space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Event {i + 1}</span>
            <button type="button" onClick={() => remove(i)} className="text-red-600 text-sm hover:underline">
              Remove
            </button>
          </div>
          <Field label="Title" value={ev.title} onChange={(v) => update(i, { title: v })} />
          <ImageField label="Flyer image" value={ev.flyerImage} onChange={(v) => update(i, { flyerImage: v })} onUpload={onUpload} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Date" value={ev.date} onChange={(v) => update(i, { date: v })} />
            <Field label="Time" value={ev.time} onChange={(v) => update(i, { time: v })} />
            <Field label="Location" value={ev.location} onChange={(v) => update(i, { location: v })} />
            <Field label="Address" value={ev.address} onChange={(v) => update(i, { address: v })} />
          </div>
          <Field label="Info URL" value={ev.infoUrl} onChange={(v) => update(i, { infoUrl: v })} />
          <Field label="Sponsor label" value={ev.sponsorLabel} onChange={(v) => update(i, { sponsorLabel: v })} />
        </div>
      ))}
    </div>
  );
}

function GalleryEditor({
  items,
  onChange,
  onUpload,
}: {
  items: GalleryItem[];
  onChange: (items: GalleryItem[]) => void;
  onUpload: (file: File) => Promise<string>;
}) {
  const update = (index: number, partial: Partial<GalleryItem>) => {
    const next = [...items];
    next[index] = { ...next[index], ...partial };
    onChange(next);
  };
  const add = () => {
    onChange([...items, { id: `gallery-${Date.now()}`, caption: "", imageUrl: "" }]);
  };
  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Gallery photos</h2>
        <button type="button" onClick={add} className="text-primary-600 font-medium hover:underline">
          + Add photo
        </button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="bg-white rounded-xl shadow p-6 space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Photo {i + 1}</span>
            <button type="button" onClick={() => remove(i)} className="text-red-600 text-sm hover:underline">
              Remove
            </button>
          </div>
          <ImageField label="Image" value={item.imageUrl} onChange={(v) => update(i, { imageUrl: v })} onUpload={onUpload} />
          <Field label="Caption" value={item.caption} onChange={(v) => update(i, { caption: v })} textarea />
          <Field label="Date (optional)" value={item.date || ""} onChange={(v) => update(i, { date: v || undefined })} />
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-gray-500 text-sm">No gallery items yet. Add photos and captions to show on the Gallery page.</p>
      )}
    </div>
  );
}

function PagesEditor({
  pages: pagesProp,
  onChange,
  onUpload,
}: {
  pages: CustomPage[];
  onChange: (pages: CustomPage[]) => void;
  onUpload: (file: File) => Promise<string>;
}) {
  const pages = Array.isArray(pagesProp) ? pagesProp : [];
  const update = (index: number, partial: Partial<CustomPage>) => {
    const next = [...pages];
    next[index] = { ...next[index], ...partial };
    onChange(next);
  };
  const add = () => {
    onChange([
      ...pages,
      {
        id: `page-${Date.now()}`,
        slug: "",
        title: "",
        heroImage: "",
        body: "",
        placement: "none",
      },
    ]);
  };
  const remove = (index: number) => onChange(pages.filter((_, i) => i !== index));
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        <p className="font-medium">Custom pages</p>
        <p className="mt-1 text-blue-800">
          Each page has a hero image and content, and is published at <strong>/pages/[slug]</strong>. Use a short URL-friendly slug (e.g. <code className="bg-blue-100 px-1 rounded">my-event</code>). You can use basic HTML in the content (e.g. &lt;p&gt;, &lt;strong&gt;, &lt;a href=&quot;...&quot;&gt;).
        </p>
        <p className="mt-2 text-blue-800">
          To <strong>remove a page from the live site</strong>, open the admin on your live site URL (not localhost), remove the page here, and click &quot;Save all changes&quot; at the top.
        </p>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Pages</h2>
        <button type="button" onClick={add} className="text-primary-600 font-medium hover:underline">
          + Add page
        </button>
      </div>
      {pages.map((page, i) => (
        <div key={page.id} className="bg-white rounded-xl shadow p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">
              {page.title || page.slug || `Page ${i + 1}`}
              {page.slug && (
                <span className="ml-2 text-gray-500 font-normal text-sm">/pages/{page.slug}</span>
              )}
            </span>
            <button type="button" onClick={() => remove(i)} className="text-red-600 text-sm hover:underline">
              Remove
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Page name"
              value={page.title}
              onChange={(v) => {
                const nextTitle = v;
                const currentSlug = page.slug;
                const nextSlug =
                  currentSlug && currentSlug.length > 0
                    ? currentSlug
                    : v
                        .toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-+|-+$/g, "");
                update(i, { title: nextTitle, slug: nextSlug });
              }}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Where should this page appear?</label>
              <select
                value={page.placement ?? "none"}
                onChange={(e) => update(i, { placement: e.target.value as CustomPagePlacement })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="none">Don&apos;t show in navigation</option>
                <option value="header">Main menu (header) only</option>
                <option value="footer">Footer only</option>
                <option value="both">Main menu and footer</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">
                This controls whether the page shows up in the header navigation, footer, both, or is only accessible from direct links.
              </p>
            </div>
          </div>
          <ImageField
            label="Hero image"
            value={page.heroImage}
            onChange={(v) => update(i, { heroImage: v })}
            onUpload={onUpload}
          />
          <div>
            <HtmlLlmHelp id={`custom-page-llm-${i}`} />
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Content (HTML)</label>
            <textarea
              value={page.body}
              onChange={(e) => update(i, { body: e.target.value })}
              rows={8}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="<p>Your content here. You can use &lt;p&gt;, &lt;strong&gt;, &lt;a href=&quot;/about&quot;&gt;links&lt;/a&gt;, etc.</p>"
            />
          </div>
        </div>
      ))}
      {pages.length === 0 && (
        <p className="text-gray-500 text-sm">No custom pages yet. Add a page to create a new URL with a hero image and content.</p>
      )}
    </div>
  );
}

const SITE_PAGE_BODY_PLACEHOLDER =
  '<p>Your content here. Use the button above to insert images, or paste image URLs in <img src="..." /> tags.</p>';

/** Prompt for editors to paste into ChatGPT, Claude, etc. to turn plain text into HTML. */
const LLM_HTML_PROMPT = `Convert the following into clean, semantic HTML for a webpage. Use only these tags: <p>, <h2>, <h3>, <h4>, <strong>, <em>, <ul>, <ol>, <li>, <a href="...">. For images use <img src="URL" alt="description" />. Do not use <div> or <span> unless necessary. Output only the HTML, no explanation.

My content:
[Paste your draft or bullet points here]`;

function HtmlLlmHelp({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  const copyPrompt = () => {
    void navigator.clipboard.writeText(LLM_HTML_PROMPT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">
      <p className="font-medium text-slate-900">Using an AI assistant to write HTML</p>
      <p className="mt-1 text-slate-700">
        Use a large language model (e.g. ChatGPT, Claude, or Copilot) to turn your text into HTML. Copy the prompt below, replace <strong>[Paste your draft or bullet points here]</strong> with your content, paste into the AI, then copy the AI&apos;s HTML output into the content field.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={copyPrompt}
          className="rounded bg-slate-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
        >
          {copied ? "Copied!" : "Copy prompt"}
        </button>
      </div>
      <pre id={id} className="mt-2 max-h-32 overflow-auto rounded border border-slate-200 bg-white p-2 text-xs text-slate-600 whitespace-pre-wrap font-sans">
        {LLM_HTML_PROMPT}
      </pre>
    </div>
  );
}

const SITE_PAGE_LABELS: Record<SitePageKey, string> = {
  about: "About",
  history: "History",
  programs: "Programs",
  board: "Board",
  committees: "Committees",
  donate: "Donate",
  contact: "Contact",
  gallery: "Gallery & Events",
  "earl-exum-tribute": "Earl Exum Tribute",
};

function SitePagesEditor({
  staticPageContent,
  onChange,
  donationLink,
  onDonationLinkChange,
  onUpload,
}: {
  staticPageContent: Partial<Record<SitePageKey, StaticPageContent>>;
  onChange: (staticPageContent: Partial<Record<SitePageKey, StaticPageContent>>) => void;
  donationLink: string;
  onDonationLinkChange: (v: string) => void;
  onUpload: (file: File) => Promise<string>;
}) {
  const [selectedPage, setSelectedPage] = useState<SitePageKey>("about");
  const [insertingImage, setInsertingImage] = useState(false);
  const merged = {
    ...(DEFAULT_STATIC_PAGE_CONTENT[selectedPage] ?? {}),
    ...(staticPageContent[selectedPage] ?? {}),
  };
  const pageContent = merged;

  const update = (partial: Partial<StaticPageContent>) => {
    onChange({
      ...staticPageContent,
      [selectedPage]: { ...pageContent, ...partial },
    });
  };

  const handleInsertImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setInsertingImage(true);
    try {
      const url = await onUpload(file);
      const imgTag = `\n<img src="${url}" alt="" class="max-w-full h-auto rounded-lg" />\n`;
      update({ body: (pageContent.body ?? "") + imgTag });
    } finally {
      setInsertingImage(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        <p className="font-medium">Edit built-in site pages</p>
        <p className="mt-1 text-blue-800">
          Choose a page below to edit its hero image, title, subtitle, and main content. When you add content here, it replaces the default page content. Use &quot;Upload and insert image&quot; to add images inside the body (e.g. in the middle of the text).
        </p>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Site settings</h3>
        <Field
          label="Donation link (third-party URL)"
          value={donationLink}
          onChange={onDonationLinkChange}
        />
        <p className="text-xs text-gray-500 mt-1">
          When visitors click &quot;Donate Now&quot;, they will be sent to this URL (e.g. Zeffy, PayPal, Givebutter). Leave empty to use the fallback from environment variables.
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Page</label>
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value as SitePageKey)}
          className="w-full max-w-xs border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          {SITE_PAGE_KEYS.map((key) => (
            <option key={key} value={key}>
              {SITE_PAGE_LABELS[key]}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h3 className="font-semibold text-gray-900">{SITE_PAGE_LABELS[selectedPage]}</h3>
        <ImageField
          label="Hero image"
          value={pageContent.heroImage ?? ""}
          onChange={(v) => update({ heroImage: v })}
          onUpload={onUpload}
        />
        <Field
          label="Hero title"
          value={pageContent.heroTitle ?? ""}
          onChange={(v) => update({ heroTitle: v })}
        />
        <Field
          label="Hero subtitle"
          value={pageContent.heroSubtitle ?? ""}
          onChange={(v) => update({ heroSubtitle: v })}
        />
        <div>
          <HtmlLlmHelp id="site-pages-llm-prompt" />
          <div className="flex items-center justify-between gap-2 mb-1 mt-4">
            <label className="block text-sm font-medium text-gray-700">Page content (HTML)</label>
            <label className="cursor-pointer text-primary-600 font-medium text-sm hover:underline shrink-0">
              {insertingImage ? "Uploading…" : "Upload and insert image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleInsertImage}
                className="hidden"
                disabled={insertingImage}
              />
            </label>
          </div>
          <textarea
            value={pageContent.body ?? ""}
            onChange={(e) => update({ body: e.target.value })}
            rows={14}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            placeholder={SITE_PAGE_BODY_PLACEHOLDER}
          />
        </div>
      </div>
    </div>
  );
}

function ReadOnlyLinkField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={value || "—"}
        readOnly
        disabled
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-100 text-gray-600 cursor-not-allowed"
        title="Button links are fixed to avoid broken hero buttons. Do not change."
      />
      <p className="mt-1 text-xs text-gray-500">Fixed route — not editable</p>
    </div>
  );
}

function HeroLinkField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: HeroLinkOption[];
  onChange: (href: string) => void;
}) {
  const hasValue = value && options.some((o) => o.href === value);
  // Include an extra option if the current value doesn't match any known option (for legacy/custom URLs)
  const extendedOptions = hasValue || !value
    ? options
    : [...options, { label: `Custom: ${value}`, href: value }];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
      >
        <option value="">Select a page…</option>
        {extendedOptions.map((opt) => (
          <option key={opt.href} value={opt.href}>
            {opt.label} ({opt.href})
          </option>
        ))}
      </select>
      <p className="mt-1 text-xs text-gray-500">
        Choose a page from the site. Only valid routes and custom pages are shown.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      )}
    </div>
  );
}

function ImageField({
  label,
  value,
  onChange,
  onUpload,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onUpload: (file: File) => Promise<string>;
}) {
  const [uploading, setUploading] = useState(false);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await onUpload(file);
      onChange(url);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex gap-2 flex-wrap items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL or upload below"
          className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
        <label className="cursor-pointer text-primary-600 font-medium text-sm hover:underline">
          {uploading ? "Uploading…" : "Upload image"}
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
        </label>
      </div>
      {value && (
        <div className="mt-2 relative w-32 h-20 bg-gray-100 rounded overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="object-cover w-full h-full" />
        </div>
      )}
    </div>
  );
}
