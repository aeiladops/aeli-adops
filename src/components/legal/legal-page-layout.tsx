import RevealAnimation from '@/src/components/animation/reveal-animation';
import { BadgePrimary } from '@/src/components/shared/ui/badge';
import Link from 'next/link';

interface LegalSection {
  id: string;
  title: string;
}

interface LegalPageLayoutProps {
  badge: string;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  children: React.ReactNode;
}

export default function LegalPageLayout({
  badge,
  title,
  lastUpdated,
  intro,
  sections,
  children,
}: LegalPageLayoutProps) {
  return (
    <section className="pt-20 md:pt-28 lg:pt-36 pb-20">
      <div className="main-container">
        
        {/* Header Hero */}
        <div className="mx-auto max-w-4xl text-center space-y-4 mb-12 md:mb-16">
          <RevealAnimation delay={0.1} className="flex justify-center">
            <BadgePrimary>{badge}</BadgePrimary>
          </RevealAnimation>

          <RevealAnimation delay={0.15}>
            <h1 className="text-heading-2 md:text-heading-1 text-secondary font-bold tracking-tight">
              {title}
            </h1>
          </RevealAnimation>

          <RevealAnimation delay={0.2}>
            <p className="text-tagline-1 text-secondary/70 max-w-2xl mx-auto font-normal leading-relaxed">
              {intro}
            </p>
          </RevealAnimation>

          <RevealAnimation delay={0.25}>
            <div className="inline-block bg-secondary/5 text-secondary/70 text-xs font-semibold px-3.5 py-1.5 rounded-full">
              Last Updated: {lastUpdated}
            </div>
          </RevealAnimation>
        </div>

        {/* Content & Sticky Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          
          {/* Sticky Table of Contents Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 bg-white p-6 rounded-2xl border border-secondary/10 shadow-sm space-y-4 hidden lg:block">
            <p className="text-tagline-2 font-bold text-secondary uppercase tracking-wider">
              On this page
            </p>
            <nav className="space-y-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block text-tagline-2 text-secondary/70 hover:text-primary-600 transition-colors py-1 pl-2 border-l-2 border-transparent hover:border-primary-500"
                >
                  {section.title}
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-secondary/10 space-y-3">
              <p className="text-xs text-secondary/60">Have legal questions?</p>
              <Link
                href="/contact"
                className="inline-block text-tagline-2 font-semibold text-primary-600 hover:underline"
              >
                Contact Legal Support →
              </Link>
            </div>
          </aside>

          {/* Main Legal Content Container */}
          <main className="lg:col-span-8 bg-white p-6 md:p-10 rounded-2xl border border-secondary/10 shadow-sm space-y-8 blog-details-markdown">
            {children}
          </main>

        </div>
      </div>
    </section>
  );
}
