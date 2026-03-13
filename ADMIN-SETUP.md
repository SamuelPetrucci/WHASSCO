# Admin page setup (Gallery, Events & Hero Carousel)

The site has an **admin page** at `/admin` where you can edit the hero carousel, events, and gallery photos without touching code. It uses **Vercel Blob** (free tier) for storage so everything works on Vercel with minimal setup.

## 1. Create a Vercel Blob store

1. In the [Vercel Dashboard](https://vercel.com/dashboard), open your project.
2. Go to **Storage** → **Create Database** → **Blob**.
3. Name the store (e.g. `whaasco-content`) and set access to **Public** (so the site can read content).
4. Create the store. Vercel will add `BLOB_READ_WRITE_TOKEN` to your project environment variables.

## 2. Set the admin password

Add an environment variable so only you can save content and upload images:

- **Name:** `ADMIN_SECRET`
- **Value:** A long, random password (e.g. generate one with a password manager).

In Vercel: **Project** → **Settings** → **Environment Variables**. Add `ADMIN_SECRET` for Production (and Preview if you want to use admin in preview deploys).

## 3. Use the admin page

1. Open **yoursite.com/admin** (or `localhost:3000/admin` in development).
2. Enter the password you set as `ADMIN_SECRET`.
3. Use the **Hero carousel**, **Events**, and **Gallery** tabs to edit content.
4. Click **Save all changes** to publish. Edits go live immediately (no redeploy).

**Images:** You can paste image URLs (e.g. from your existing `/public` paths like `/images/hero/heroimage.webp`) or use **Upload image** to upload new files to Vercel Blob.

## Local development

- Run `vercel env pull` to get `BLOB_READ_WRITE_TOKEN` and `ADMIN_SECRET` locally.
- Or create a `.env.local` with:
  - `BLOB_READ_WRITE_TOKEN` – from the Blob store in the dashboard.
  - `ADMIN_SECRET` – the same password you use in production.

If `BLOB_READ_WRITE_TOKEN` is not set, the site still works: it uses built-in default content (current hero slides and the Black Business Expo event). The admin page will not be able to save until Blob and `ADMIN_SECRET` are configured.
