# Capella Systems Documentation

Welcome to the official **Capella Systems** documentation repository. This repository contains user guides, API references, and technical documentation for our software solutions. Please visit our website at https://documents.capellasystems.net/.

## 📖 About This Repository

This repository serves as a centralized resource for **Capella Systems** software documentation. Here, you will find:
- Installation guides
- Configuration instructions
- API documentation
- Troubleshooting and FAQs

For more information about our products, visit [Capella Systems](https://www.capellasystems.net).

---

## 🛠️ Developer Guide

### Project Structure

```
documents.capellasystems.net/
│
├── docs/                                         # All documentation markdown content
│   ├── cambria-ftc/                              # Cambria FTC product documentation
│   │   ├── ftc-overview/
│   │   │   └── cambria-ftc-5.x/                 # Version-specific product overviews
│   │   ├── installation-guides/
│   │   │   ├── kubernetes/
│   │   │   │   ├── aws/                         # AWS EKS deployment guide
│   │   │   │   ├── akamai/                      # Akamai Kubernetes deployment guide
│   │   │   │   └── oracle/                      # Oracle Cloud Kubernetes deployment guide
│   │   │   └── windows/                         # Windows Server installation guide
│   │   ├── release-notes/                        # FTC version history and changelogs
│   │   ├── api/
│   │   │   └── rest-api-ftc-5.0.1.md            # FTC REST API reference (v5.0.1)
│   │   ├── tutorials/                            # FTC how-to guides and feature walkthroughs
│   │   │   ├── Speech_To_Text_Filter.md
│   │   │   ├── Trusted_Executables_and_Scripts.md
│   │   │   ├── audio-watermarking-integration-with-kantar-guide.md
│   │   │   ├── cluster-redundancy-feature.md
│   │   │   ├── ftc-cluster-external-postgresql.md
│   │   │   ├── scte-35-insertion.md
│   │   │   └── (+ additional topic folders for logo filter, NexGuard, subtitle burn-in, etc.)
│   │   └── customer-faqs.md                      # FTC frequently asked questions
│   │
│   └── cambria-stream/                           # Cambria Stream product documentation
│       ├── installation-guides/
│       │   ├── kubernetes/                       # Stream Kubernetes deployment guides
│       │   └── windows/                          # Stream Windows installation guide
│       ├── release-notes/                        # Stream version history and changelogs
│       ├── api/                                  # Stream API reference
│       │   ├── introduction.md                   # API overview and authentication
│       │   ├── api-methods.md                    # Available REST endpoints
│       │   ├── event-attributes.md               # Event payload field definitions
│       │   └── event-descriptions.md             # Descriptions of all event types
│       ├── tutorials/
│       │   └── cambria-stream-primary-and-backup/  # Primary/backup failover setup guide
│       └── customer-faqs.md                      # Stream frequently asked questions
│
├── src/                                          # Docusaurus framework source code
│   ├── components/
│   │   └── HomepageFeatures/                    # React component: homepage feature grid cards
│   ├── css/
│   │   └── custom.css                           # Global CSS overrides applied across the entire site
│   ├── hooks/
│   │   └── useSearchHighlighting.js             # Custom hook: highlights Algolia search terms on page load
│   ├── pages/
│   │   ├── index.js                             # Homepage/landing page React component
│   │   └── index.module.css                     # CSS module scoped to the homepage only
│   └── theme/                                   # Docusaurus theme component swizzles (overrides)
│       ├── DocSidebar/
│       │   └── index.js                         # Custom sidebar: vertical sticky nav layout
│       ├── Root.js                              # Site-wide wrapper — injects useSearchHighlighting globally
│       └── SearchBar.js                         # Custom search bar behavior override
│
├── static/                                       # Static assets served directly at the site root
│                                                 # (images, favicons, downloadable files, etc.)
├── .github/                                      # GitHub Actions CI/CD workflows
├── build/                                        # Production build output (auto-generated, do not edit)
├── .docusaurus/                                  # Docusaurus cache (auto-generated, do not edit)
│
├── docusaurus.config.js                          # Main config: site title, URL, navbar, footer, plugins, GA4
├── sidebars.js                                   # Sidebar navigation structure and document ordering
├── package.json                                  # npm dependencies and CLI scripts (start, build, serve)
├── package-lock.json                             # Exact dependency lockfile (committed to repo)
├── push.bat                                      # Windows helper: stages, commits, and pushes to GitHub
└── CNAME                                         # Maps GitHub Pages to documents.capellasystems.net
```

---

### Key Files Explained

| File | Location | Purpose |
|---|---|---|
| `docusaurus.config.js` | `/` (root) | Controls site-wide settings: title, base URL, navbar links, footer, GA4 tag, Algolia search config, and all plugins |
| `sidebars.js` | `/` (root) | Defines the left sidebar structure, section nesting, and document ordering for both product areas |
| `custom.css` | `src/css/` | All global style overrides — fonts, colors, layout adjustments applied to every page on the site |
| `index.js` | `src/pages/` | The site homepage/landing page built as a React component |
| `Root.js` | `src/theme/` | Wraps the entire Docusaurus app; used to run the search highlighting hook on every page load |
| `SearchBar.js` | `src/theme/` | Swizzled override of the default Docusaurus search bar component |
| `DocSidebar/index.js` | `src/theme/DocSidebar/` | Custom sidebar implementation replacing the default with a vertical sticky navigation layout |
| `useSearchHighlighting.js` | `src/hooks/` | Reads the Algolia search query from the URL and highlights matching terms on the destination page |
| `push.bat` | `/` (root) | Windows batch script — run this to `git add`, `git commit`, and `git push` in one step, which triggers auto-deploy |
| `CNAME` | `/` (root) | Contains `documents.capellasystems.net` — required for GitHub Pages to serve under this custom domain |

---

### Adding New Documentation

1. **Create your markdown file** in the appropriate folder under `docs/`
2. **Add frontmatter** at the top of the file:
   ```yaml
   ---
   id: unique-document-id
   title: Document Title
   ---
   ```
3. **Update the sidebar** in `sidebars.js` if the folder isn't already covered by an `autogenerated` directive

### Folder Naming Convention

All folders use **lowercase, hyphen-separated names** (e.g., `installation-guides`). This ensures clean URLs and consistency throughout the site.

### Sidebar Configuration

The sidebar is configured in `sidebars.js`. Most sections use `autogenerated` to automatically include all docs in a folder:

```javascript
{
  type: 'autogenerated',
  dirName: 'cambria-ftc/installation-guides/kubernetes/aws',
}
```

**When adding a new folder:**
1. Create the folder using lowercase and hyphens
2. Add your markdown files inside
3. Add a new `autogenerated` entry in `sidebars.js` if the folder isn't already covered by a parent directive

---

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run start

# Build for production
npm run build

# Serve production build locally
npm run serve
```

### Deployment

Changes pushed to the `main` branch trigger **automatic deployment** to GitHub Pages via the `gh-pages` branch.

On Windows, use the helper script at the repo root:
```bat
push.bat
```
This stages all changes, commits with a default message, and pushes to `main` in one step.

### Analytics (GA4)

Site traffic is tracked via **Google Analytics 4**. The tag ID is configured in `docusaurus.config.js` under the `gtag` plugin section.

To view analytics, visit the [Google Analytics Dashboard](https://analytics.google.com/).

---

## ⚠️ Disclaimer & Copyright Notice

© [2026] Capella Systems. All rights reserved.

This repository and its contents are the property of **Capella Systems** and are intended for informational and educational purposes only.

### **Usage Rights**
- The documentation provided here is for **authorized users** of Capella Systems software.
- Redistribution, modification, or reproduction of this documentation, in part or in full, **without prior written permission** from Capella Systems is strictly prohibited.

### **Third-Party Usage**
- Any references to third-party software, tools, or services are for **informational purposes only**.
- Capella Systems is not responsible for any issues arising from third-party integrations.

### **No Warranty**
This documentation is provided **"as is"** without warranty of any kind. Capella Systems disclaims all liability for any damages resulting from the use or misuse of the information provided in this repository.

For any questions regarding licensing or usage rights, please contact **support@capellasystems.net**.

---

## 📩 Contributing & Support
If you find any issues or have suggestions for improvement, please contact our support team at **support@capellasystems.net**.

---

**Thank you for using Capella Systems software!**
