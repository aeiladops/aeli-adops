'use client';

import newArrowWhite from '@/public/images/icons/new-arrow-white.svg';
import whatsNewImage from '@/public/images/product-updates-banner.jpg';
import {
  AboutIcon,
  CaseStudyICon,
  ManifestoIcon,
  ServiceIcon,
  TeamIcon,
  UseCaseIcon,
  WhyChooseUsIcon,
} from '@/src/components/shared/icon/menu-icon';
import {
  CompanyMenuLink,
  type CompanyMenuLinkProps,
} from '@/src/components/shared/layout/navbar/company-menu-link';
import { cn } from '@/src/utils/cn';
import Image from 'next/image';
import Link from 'next/link';

const MENU_COMPANY_ID = 'company-mega-menu-v2';

type CompanyLink = Omit<CompanyMenuLinkProps, 'onClose'>;

const aboutLinks: CompanyLink[] = [
  {
    title: 'Yield Optimization',
    description: 'Identify opportunities across pricing, inventory, demand, viewability, and fill rate',
    href: '/services/yield-optimization',
    icon: AboutIcon,
  },
  {
    title: 'Google Ad Manager',
    description: 'Simplify setup, management, troubleshooting, and optimization',
    href: '/services/google-ad-manager',
    icon: TeamIcon,
  },
  {
    title: 'Ad Operations',
    description: 'Reliable operational support for inventory, campaigns, and reporting',
    href: '/services/ad-operations',
    icon: ServiceIcon,
  },
];

const cultureLinks: CompanyLink[] = [
  {
    title: 'Programmatic Direct',
    description: 'Build more structured workflows for direct and programmatic advertising',
    href: '/services/programmatic-direct',
    icon: ManifestoIcon,
  },
  {
    title: 'Technical Support',
    description: 'Solve advertising implementation and delivery issues',
    href: '/services/technical-support',
    icon: WhyChooseUsIcon,
  },
  {
    title: 'Website Monetization',
    description: 'Create a smarter advertising setup for sustainable growth',
    href: '/services/website-monetization',
    icon: CaseStudyICon,
  },
];

const solutionLinks: CompanyLink[] = [
  {
    title: 'Free Publisher Audit',
    description: 'Get a complimentary review of your monetisation setup',
    href: '/publisher-audit',
    icon: UseCaseIcon,
  },
];

interface CompanyMenuProps {
  menuDropdownId: string | null;
  setMenuDropdownId: (id: string | null) => void;
}

export const CompanyMenu = ({ menuDropdownId, setMenuDropdownId }: CompanyMenuProps) => {
  const handleClose = () => setMenuDropdownId(null);
  const isOpen = menuDropdownId === MENU_COMPANY_ID;

  return (
    <div>
      <div className="dropdown-menu-bridge pointer-events-none fixed top-full left-1/2 z-40 h-3 w-full -translate-x-1/2 bg-transparent transition-opacity duration-300 lg:w-[946px]" />
      <div
        id={MENU_COMPANY_ID}
        className={cn(
          'dropdown-menu border-stroke-1 fixed top-full left-1/2 z-50 mt-2 flex w-full -translate-x-1/2 items-start gap-y-6 rounded-[20px] border bg-white p-4 transition-all duration-300 md:gap-x-6 lg:w-[946px]',
          isOpen && 'active'
        )}
      >
        <div className="flex-1 space-y-3">
          <ul className="space-y-2">
            {aboutLinks.map((link) => (
              <CompanyMenuLink key={link.title} {...link} onClose={handleClose} />
            ))}
          </ul>
        </div>
        <div className="flex-1 space-y-3">
          <ul className="space-y-2">
            {cultureLinks.map((link) => (
              <CompanyMenuLink key={link.title} {...link} onClose={handleClose} />
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <div className="space-y-3">
            <ul className="space-y-2">
              {solutionLinks.map((link) => (
                <CompanyMenuLink key={link.title} {...link} onClose={handleClose} />
              ))}
            </ul>
          </div>
          <p className="text-tagline-2 text-secondary/60 p-3 font-medium">What&apos;s new</p>
          <div>
            <figure className="group relative min-h-[175px] w-full max-w-full overflow-hidden rounded-[14px] shadow-sm">
              <Image
                src={whatsNewImage}
                alt="Product updates"
                fill
                className="rounded-[14px] object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent rounded-[14px]" />
              <div className="absolute inset-0 flex flex-col justify-between p-4 z-10">
                <div>
                  <p className="text-tagline-1 text-white font-bold tracking-tight">Product updates</p>
                  <p className="text-xs text-white/80 w-full max-w-[190px] font-medium mt-1 leading-snug">
                    Stay ahead with our latest ad operations tech and floor price automation.
                  </p>
                </div>
                <Link
                  href="/blog"
                  onClick={handleClose}
                  className="group/arrow bg-primary-600 hover:bg-primary-500 relative flex h-8.5 w-14 items-center justify-center overflow-hidden rounded-[40px] px-4 py-1.5 ring-2 ring-white/30 transition-all duration-300 ease-in-out shadow-md"
                >
                  <span className="relative flex size-5 items-center justify-center overflow-hidden">
                    <Image
                      src={newArrowWhite}
                      alt=""
                      width={20}
                      height={20}
                      className="absolute inset-0 size-full -translate-x-5 object-cover transition-transform duration-400 ease-in-out group-hover/arrow:translate-x-0"
                    />
                    <Image
                      src={newArrowWhite}
                      alt=""
                      width={20}
                      height={20}
                      className="size-full object-cover transition-transform duration-400 ease-in-out group-hover/arrow:translate-x-5"
                    />
                  </span>
                </Link>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};
