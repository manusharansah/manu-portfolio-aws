# Manu Sharan Kumar: portfolio

Personal portfolio of Manu Sharan Kumar, a Computer Engineering student in Kathmandu, built for the
AWS Student Builder Challenge. React 18, Vite 5 and Tailwind CSS, hosted on AWS Amplify Hosting in
`ap-southeast-2`.

Live site: https://main.d3qmau925109ff.amplifyapp.com

## What is in it

- **Home, Projects, Built on AWS and Contact pages**, plus a proper 404 page.
- **Eight projects**, each with a generated cover, filterable by area. Public repositories link to
  their code; a private project links to its live site instead.
- **Light and dark themes**, switched from the navigation bar and remembered between visits.
- **A secret terminal**, opened with the backtick key, the `terminal` button in the navigation bar or the
  round button in the corner.

| Command | What it does |
| --- | --- |
| `help` | Lists every command |
| `about`, `whoami`, `skills`, `projects`, `contact` | Short answers about me and my work |
| `neofetch` | A system card for this very site |
| `quiz` | Four questions about the portfolio |
| `certichain <text>` | Hashes your text with SHA-256 in the browser and shows how one changed character changes the whole fingerprint |
| `theme dark`, `theme light`, `theme retro` | Switches theme; `retro` turns the site into a green-phosphor CRT |
| `goto <page>` | Navigates to home, projects, aws or contact |
| `fun`, `aws`, `ls`, `cat secret.txt`, `date`, `sudo hire-me` | Small extras |
| `clear`, `exit` | Clears the screen or closes the terminal |

## Accessibility

Skip link, landmarks, a heading order that does not skip, labelled controls, visible focus, contrast
checked in both themes, reduced-motion support, and a terminal dialog that traps focus and makes the page
behind it inert while open.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static files in dist/
npm run preview  # serve the production build
```

## How it is hosted

`npm run build` produces six static files in `dist/`. They are zipped and uploaded to AWS Amplify Hosting
with the AWS API (create deployment, upload the zip to the presigned URL, start deployment). The Amplify
app carries a rewrite rule so single-page routes survive a refresh, plus security headers (HSTS, a
Content-Security-Policy, nosniff, frame protection and cache headers for hashed assets).

`amplify.yml` is ready for connecting this repository to Amplify for automatic builds. That connection
has not been made yet, so deployments are still manual. The `/aws` page of the site explains the setup and
what went wrong along the way.

## Notes

- The contact form sends nothing by itself: the site is static, so it opens the visitor's email app with
  the message ready to send.
- The inline theme script in `index.html` is allowed by a hash in the Content-Security-Policy. If you edit
  that script, update the hash in the Amplify custom headers.
