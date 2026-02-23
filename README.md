<div align="center">
  <h1>Ully AI — Web</h1>
  <p><em>Marketing site, legal pages, and support portal for Ully AI</em></p>

  <p>
    <img src="https://img.shields.io/badge/hosted-Firebase%20Hosting-FFCA28?style=flat-square&logo=firebase" />
    <img src="https://img.shields.io/badge/stack-HTML%20%7C%20CSS-E34F26?style=flat-square&logo=html5" />
    <img src="https://img.shields.io/badge/brand-Ully%20AI-C8923C?style=flat-square" />
  </p>
</div>

---

## Overview

Static website for **Ully AI** — the mobile-first AI coffee companion. Hosted on Firebase Hosting and deployed alongside the [Ully AI mobile app](https://github.com/chrisdarvelo/Ully--coffee).

---

## Pages

| Route | File | Purpose |
|---|---|---|
| `/` | `index.html` | Landing page |
| `/privacy` | `privacy.html` | Privacy policy (required for App Store & Play Store) |
| `/terms` | `terms.html` | Terms of service |
| `/support` | `support.html` | Support page |
| `/data` | `data.html` | Data handling information |
| `/delete-account` | `delete-account.html` | Account deletion instructions (required by Apple) |

---

## Structure

```
ully-web/
├── index.html
├── privacy.html
├── terms.html
├── support.html
├── data.html
├── delete-account.html
├── css/
│   └── style.css
└── images/
```

---

## Deploy

This site is deployed via Firebase Hosting from the main Ully Firebase project.

```bash
# From the Ully-Coffee app repo (where firebase.json lives)
firebase deploy --only hosting
```

> Once this repo is fully standalone, a `firebase.json` will be added here for independent deployment.

---

## Related

- **Mobile app:** [Ully AI (React Native / Expo)](https://github.com/chrisdarvelo/Ully--coffee)
- **Support:** support@ullycoffee.com
