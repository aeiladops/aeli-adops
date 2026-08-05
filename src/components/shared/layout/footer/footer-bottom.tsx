import RevealAnimation from '@/src/components/animation/reveal-animation';
import Link from 'next/link';

export const FooterBottom = () => {
  return (
    <RevealAnimation delay={0.7} offset={10} start="top 105%">
      <div className="relative pt-[26px] pb-[42px] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="bg-stroke-3 absolute top-0 right-0 left-0 mx-auto h-px origin-center" />
        
        <p className="text-tagline-1 text-secondary font-normal">
          Copyright &copy; <span>{new Date().getFullYear()}</span> Aeli AdOps. All rights reserved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-tagline-2 text-secondary/70">
          <Link href="/privacy-policy" className="hover:text-secondary transition-colors">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-secondary transition-colors">
            Terms & Conditions
          </Link>
          <span>•</span>
          <Link href="/cookie-policy" className="hover:text-secondary transition-colors">
            Cookie Policy
          </Link>
          <span>•</span>
          <Link href="/compliance" className="hover:text-secondary transition-colors">
            GDPR Compliance
          </Link>
          <span>•</span>
          <Link href="/sitemap" className="hover:text-secondary transition-colors">
            Sitemap
          </Link>
        </div>
      </div>
    </RevealAnimation>
  );
};
