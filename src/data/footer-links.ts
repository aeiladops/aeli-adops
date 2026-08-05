export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterLinkColumn {
  title: string;
  links: FooterLinkItem[];
}

export const footerNavColumns: FooterLinkColumn[] = [
  {
    title: 'Services',
    links: [
      { label: 'Yield Optimization', href: '/services/yield-optimization' },
      { label: 'Google Ad Manager', href: '/services/google-ad-manager' },
      { label: 'Ad Operations', href: '/services/ad-operations' },
      { label: 'Programmatic Direct', href: '/services/programmatic-direct' },
      { label: 'Technical Support', href: '/services/technical-support' },
      { label: 'Website Monetization', href: '/services/website-monetization' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Leadership Team', href: '/team' },
      { label: 'Publisher Blog', href: '/blog' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Legal & Resources',
    links: [
      { label: 'FAQs', href: '/faq' },
      { label: 'Free Publisher Audit', href: '/publisher-audit' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'GDPR Compliance', href: '/compliance' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
  },
];

export interface FooterSocialLink {
  label: string;
  href: string;
  icon: string;
}

export const footerSocialLinks: FooterSocialLink[] = [
  { label: 'Facebook', href: '#', icon: '/images/icons/facebook-dark.svg' },
  { label: 'Instagram', href: '#', icon: '/images/icons/instagram-dark.svg' },
  { label: 'Youtube', href: '#', icon: '/images/icons/youtube-dark.svg' },
  { label: 'LinkedIn', href: '#', icon: '/images/icons/linkedin-dark.svg' },
];
