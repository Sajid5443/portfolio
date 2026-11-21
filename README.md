# Sajid Salehin: Portfolio Website

Next.js site with motion work, 3D renders, video edits, motion posters, an About section and a contact form.

## What's where

| To change… | Edit |
|---|---|
| Text, project titles, descriptions, links, services | `content/site.ts` |
| Colours (dark + light) | top of `app/globals.css` (the `--bg`, `--key`, `--l1`… variables) |
| Videos, thumbnails, 3D renders, your photo | `public/media/` (3D renders in `public/media/3d/`) |
| Section layout | `app/page.tsx` and the files in `components/` |

## Run it on your computer (optional)

1. Install Node.js (LTS) from https://nodejs.org
2. Open this folder in a terminal and run:
   ```
   npm install
   npm run dev
   ```
3. Open http://localhost:3000

## Put it online with Vercel

1. Create a free account at https://github.com and make a new repository, for example `portfolio`.
2. Upload this whole folder to that repository: install GitHub Desktop, choose **Add existing repository** with this folder, then **Publish**.
   (The `node_modules`, `.next` and `out` folders are ignored automatically.)
3. Go to https://vercel.com, sign in with GitHub, click **Add New → Project**, pick the repository, then click **Deploy**.
   Vercel detects Next.js by itself. You'll get a link like `sajid-portfolio.vercel.app`.
4. Every time you push a change to GitHub, Vercel updates the site automatically.

## Make the contact form send to your email

1. Go to https://web3forms.com, enter the email where you want to receive messages, and copy the **Access Key** it sends you.
2. In Vercel: Project → **Settings → Environment Variables** → add
   `NEXT_PUBLIC_WEB3FORMS_KEY` = your key
3. Redeploy (Deployments → ⋯ → Redeploy). The "Send message" button now delivers to your inbox.

## Connect your own domain later

1. Buy a domain (Namecheap, Porkbun or Cloudflare).
2. In Vercel: Project → **Settings → Domains** → add your domain.
3. Copy the DNS records Vercel shows into your domain registrar's DNS settings. HTTPS is set up automatically.
   Nothing on the site needs to change.

## Notes

- Brand pieces (Google, KFC, Pepsi, Higgsfield) are labelled **Concept** in `content/site.ts`. Change the `label` if any were paid client work.
- To add more motion posters: put the video in `public/media/` as `name.mp4`, a short muted loop as `name-preview.mp4` and a still as `name.jpg`, then add it to `posters` in `content/site.ts`.
