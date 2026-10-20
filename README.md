# Reality Matters — ICRA 2027 Workshop

Static workshop homepage based on the supplied joint proposal. Designed for `RM-workshop.github.io` with no build step.

## Publish

Create the public repository `RM-workshop/RM-workshop.github.io`, upload the contents of this folder, and select **Settings → Pages → Deploy from a branch → main → /(root)**. The intended URL is https://rm-workshop.github.io/ (not live until deployment succeeds).

## Maintain

- Edit `index.html` for copy, schedule, affiliations and homepage links.
- Edit `style.css` for layout and typography.
- Portraits are local under `assets/`; source URLs and provenance are recorded in `photo-sources.json`.
- Ruotian Liu uses an initials placeholder because no portrait was found on the verified institutional page.
- Affiliations follow the supplied proposal. The site explicitly identifies the workshop as proposed; update acceptance, date, venue, speakers and submission details only after confirmation.
- The proposal's internal reviewer feedback and organizer logistics are not published.
- No submission backend or analytics is included. Contact links open email.

Local preview: `python3 -m http.server 8765` from this folder.
