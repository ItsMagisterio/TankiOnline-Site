# Tanki Online – Brazilian Portuguese Fan Site

A static website for the Tanki Online browser game, in Brazilian Portuguese. It includes a navigation bar, hero banner, news feed, and links to game resources (Wiki, Discord, rankings, support).

## Stack

- Pure static site: HTML, CSS, JavaScript, images, fonts
- No build step or backend required

## Running

The site is served with `npx serve` on port 5000.

**Workflow:** `Start application`  
**Command:** `npx serve . -p 5000 --no-clipboard`

## Structure

```
index.html      – Main page
css/            – Stylesheets (normalize, colorbox, flags, custom)
js/             – JavaScript (jQuery, parallax, helpers, etc.)
images/         – Site images and sprites
fonts/          – Custom fonts (DINPro, Panton)
```

## Notes

- The site originally embedded Flash game content; some links (e.g. the play button) point to external Tanki Online servers and won't function without those services.
- A few 404 errors in the browser console are for external resources (Google Fonts CDN, external scripts) that are referenced but unavailable in this local copy.
