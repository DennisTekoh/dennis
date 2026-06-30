# Dennis Consulting Solutions Landing Page

Static landing page starter for Netlify.

## Where to put files

- `assets/reference/` - example screenshots, design references, color notes, or links.
- `assets/images/` - client photos, logo, product images, and final hero image.
- `content/client-copy.txt` - requested text for the page.

The current visual direction is based on `assets/reference/style-reference.png`.

Current image names:

- `dennis-portrait.jpg`
- `kingdom-english.jpg`
- `kingdom-spanish-front.jpg`
- `kingdom-spanish-back.jpg`
- `sleep-reset-box.jpg`
- `burnout-reset.jpg`
- `menopause-reset.jpg`
- `teen-reset.jpg`
- `millionaire-for-life.jpg`
- `euro-millions.jpg`
- `euro-jackpot.jpg`
- `lottery-fire.jpg`

Original PNG files are also kept in `assets/images/` as source files.

## Deploy on Netlify

Use this folder as the site root.

- Build command: `npm run build`
- Publish directory: `dist`

The contact form is handled by `netlify/functions/contact.cjs` and Resend.

## Contact form with Resend

The contact form sends email through a Netlify Function and Resend. Add these environment
variables in Netlify:

- `RESEND_API_KEY` - Resend API key.
- `CONTACT_TO_EMAIL` - destination inbox, usually `info@dennisconsulting.solutions`.
- `CONTACT_FROM_EMAIL` - verified sender, for example `Dennis Consulting Solutions <info@dennisconsulting.solutions>`.

## Local development

```bash
npm install
npm run dev
```
