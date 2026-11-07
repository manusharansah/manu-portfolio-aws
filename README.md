# Manu Sharan Kumar: Portfolio

This is my personal portfolio, built for the AWS Student Builder Challenge. It introduces who I am,
shows the projects I have built, and explains how the site itself runs on AWS.

**Live site:** https://main.d3qmau925109ff.amplifyapp.com

## What is on the site

- **Home, Projects, Built on AWS and Contact** pages.
- **Eight projects.** Public ones link to their code. VidyaChain, whose repository is private, links to
  its live demo instead.
- **Light and dark themes**, remembered between visits.
- **A hidden terminal.** Press the backtick key (`) or click the terminal button, then type `help`.
  Try `skills`, `projects`, `neofetch`, `quiz` or `theme retro`.

## Built with

React 18, Vite 5, Tailwind CSS and Framer Motion, hosted on AWS Amplify Hosting in `ap-southeast-2`.

## Run it locally

```bash
npm install
npm run dev       # development server
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## How it is deployed

`npm run build` produces a handful of static files in `dist/`. I zip that folder and upload it to AWS
Amplify Hosting through the AWS API. Amplify serves the site over HTTPS, rewrites routes such as
`/projects` to the app so a page refresh works, and adds security headers.

The repository includes an `amplify.yml` for automatic builds from GitHub. I have not connected that yet,
so deployments are still manual. The Built on AWS page on the site covers the setup and what went wrong
along the way.

## Accessibility

Keyboard navigation, a skip link, visible focus, contrast checked in both themes, support for reduced
motion, and a terminal that traps focus while it is open.

## Notes

- The contact form opens your email app with the message filled in. The site is static and has no
  backend to send it.
- There are no API keys or credentials in this repository, and the site does not need any.
