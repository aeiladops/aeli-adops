'use client';

import logo from '@/public/images/logo/aeli-logo-icon.png';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { FooterBottom } from '@/src/components/shared/layout/footer/footer-bottom';
import { FooterLinkGroups } from '@/src/components/shared/layout/footer/footer-link-groups';
import { FooterSocialLinks } from '@/src/components/shared/layout/footer/footer-social-links';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface FooterProps {
  isHomePageInner?: boolean;
}

const Footer = ({ isHomePageInner }: FooterProps = {}) => {
  const pathname = usePathname();

  // Never show footer in admin
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  // Root layout renders <Footer /> for all pages.
  // On the home page, page.tsx also renders <Footer isHomePageInner /> right
  // before the staggered grid. So we suppress the root-layout copy on '/'.
  if (pathname === '/' && !isHomePageInner) {
    return null;
  }

  return (
    <footer className="footer bg-white text-secondary relative z-10 overflow-hidden border-t border-secondary/10 shadow-sm">
      <div className="main-container px-5">
        <div className="grid grid-cols-12 justify-between gap-x-0 gap-y-16 pb-12 pt-20">
          <div className="col-span-12 xl:col-span-4">
            <RevealAnimation delay={0.1}>
              <div className="max-w-[320px]">
                <Link href="/" className="inline-flex items-center gap-3 group bg-slate-50 px-4 py-2 rounded-full border border-secondary/10 shadow-sm">
                  <span className="sr-only">Aeli AdOps</span>
                  <figure className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-primary-500/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={logo}
                      alt="Aeli AdOps Logo"
                      fill
                      className="object-cover"
                    />
                  </figure>
                  <span className="font-extrabold text-lg text-black tracking-tight group-hover:text-primary-600 transition-colors">
                    Aeli AdOps
                  </span>
                </Link>
                <p className="text-secondary/70 text-tagline-1 mt-4 mb-7 font-normal leading-relaxed">
                  Helping publishers build better advertising experiences through smarter Ad Operations, reliable support, and sustainable revenue growth.
                </p>
                <FooterSocialLinks />
              </div>
            </RevealAnimation>
          </div>
          <FooterLinkGroups />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
