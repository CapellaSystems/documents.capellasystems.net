// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Capella Documents',
  tagline: "This website provides users with comprehensive documentation and guides for all Capella's products.",
  favicon: 'img/capellalogo.png',

  // Set the production url of your site here
  url: 'https://documents.capellasystems.net',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'CapellaSystems', // Usually your GitHub org/user name.
  projectName: 'documents.capellasystems.net', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Color mode configuration
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      // Replace with your project's social card
      image: 'img/capellalogo.png',
                     // Algolia search configuration
        algolia: {
          appId: process.env.ALGOLIA_APP_ID,
          apiKey: process.env.ALGOLIA_API_KEY,
          indexName: 'Capella Documentation',
          contextualSearch: true,
          searchParameters: {},
          externalUrlRegex: 'external\\.com|domain\\.com',
          replaceSearchResultPathname: {
            from: '/docs/',
            to: '/',
          },
        },
      navbar: {
        title: 'Capella Documentation',
        logo: {
          alt: 'My Site Logo',
          src: 'img/capellalogo.png',
        },
        items: [
		  {
            type: 'docSidebar',
            sidebarId: 'StreamSidebar',
            label: 'Cambria Stream',
            position: 'right',
          },
          {
            type: 'docSidebar',
            sidebarId: 'FTCSidebar',
            label: 'Cambria FTC',
            position: 'right',
          },
          {
            href: 'https://www.capellasystems.net',
            label: 'Capella Website',
            position: 'right',
          },
          {
            type: 'search',
            position: 'right',
          },

        ],
      },
      footer: {
        links: [
          {
            title: 'Company',
            items: [
              {
                label: 'About',
                href: 'https://www.capellasystems.net/about-capella',
              },
              {
                label: 'Newsfeed',
                href: 'https://www.capellasystems.net/newsfeed',
              },
              {
                label: 'Contact Us',
                href: 'https://www.capellasystems.net/contact-us',
              },
            ],
          },
          {
            title: 'Docs',
            items: [
              {
                label: 'Cambria Stream',
                href: 'https://documents.capellasystems.net/docs/Cambria%20Stream/Installation%20Guides/Kubernetes/AWS/placeholder',
              },
              {
                label: 'Cambria FTC',
                href: 'https://documents.capellasystems.net/docs/Cambria%20FTC/Installation%20Guides/Kubernetes/AWS/Akamai_Linode_Kubernetes_CambriaClusterFTC_Installation',
              },
            ],
          },
          {
            title: 'Other',
            items: [
              {
                label: 'Terms of Use',
                href: 'https://www.capellasystems.net/terms-of-use',
              },
              {
                label: 'Privacy Policy',
                href: 'https://www.capellasystems.net/online-privacy-policy',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Capella Systems`,
      },

    }),
};

export default config;
