import { MobileMenuData } from '../interface/interface';

export const mobileMenuData: MobileMenuData[] = [
  {
    id: 'services',
    title: 'Monetisation Services',
    submenu: [
      { id: 'yield-optimization', label: 'Yield Optimization', href: '/services/yield-optimization' },
      { id: 'google-ad-manager', label: 'Google Ad Manager', href: '/services/google-ad-manager' },
      { id: 'ad-operations', label: 'Ad Operations', href: '/services/ad-operations' },
      { id: 'programmatic-direct', label: 'Programmatic Direct', href: '/services/programmatic-direct' },
      { id: 'technical-support', label: 'Technical Support', href: '/services/technical-support' },
      { id: 'website-monetization', label: 'Website Monetization', href: '/services/website-monetization' },
    ],
  },
  {
    id: 'about',
    title: 'About Us',
    submenu: [
      { id: 'about', label: 'About', href: '/about' },
      { id: 'mission', label: 'Our Mission', href: '/about' },
      { id: 'leadership', label: 'Leadership Team', href: '/team' },
      { id: 'updates', label: 'Updates', href: '/blog' },
    ],
  },
  {
    id: 'resources',
    title: 'Resources',
    submenu: [
      { id: 'faq', label: 'FAQs', href: '/faq' },
      { id: 'publisher-audit', label: 'Free Publisher Audit', href: '/publisher-audit' },
      { id: 'blog', label: 'Blog', href: '/blog' },
      { id: 'contact', label: 'Contact', href: '/contact' },
    ],
  },
];
