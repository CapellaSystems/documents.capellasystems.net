// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Capella Documents',
  tagline: "Welcome to the Capella's Documentation",
  favicon: 'img/favicon.ico',

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
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Capella Documentation',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
		  {
            type: 'docSidebar',
            sidebarId: 'StreamSidebar',
            position: 'left',
            label: 'Cambria Stream',
          },
          {
            type: 'docSidebar',
            sidebarId: 'FTCSidebar',
            position: 'left',
            label: 'Cambria FTC',
          },
          /*{
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },*/
        ],
      },
      footer: {
        style: 'dark',
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
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
