import RevealAnimation from '@/src/components/animation/reveal-animation';
import BlogDetailsMarkdown from '@/src/components/blog-details/blog-details-markdown';
import { SocialIcons } from '@/src/components/shared/social-icons';
import { BlogPost } from '@/src/interface/interface';
import Image from 'next/image';
import Link from 'next/link';

const SHARE_SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/' },
  { name: 'X', href: 'https://x.com/' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/' },
] as const;

/* SVG Helpers */
const ArrowLeftIcon = ({ className = 'size-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const ArrowRightIcon = ({ className = 'size-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const CalendarIcon = ({ className = 'size-3.5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const ClockIcon = ({ className = 'size-3.5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckCircleIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface DetailsInfoProps {
  data: Partial<BlogPost>;
  content: string;
}

const DetailsInfo = ({ data, content }: DetailsInfoProps) => {
  // Construct JSON-LD Structured Data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.title,
    description: data.excerpt || data.metaDescription,
    image: data.image ? [data.image] : [],
    datePublished: data.dateTime,
    author: {
      '@type': 'Person',
      name: data.authorName || 'Aeli AdOps Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Aeli AdOps',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aeliadops.com/images/logo/logo.svg',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-20 md:pt-28 lg:pt-36 pb-16">
        <div className="main-container">
          
          {/* Back Navigation Link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-tagline-2 font-medium text-secondary/70 hover:text-primary-600 transition-colors"
            >
              <ArrowLeftIcon className="size-4" />
              <span>Back to all insights</span>
            </Link>
          </div>

          {/* Article Header Container (Comfortable Centered Width) */}
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            {data.category && (
              <RevealAnimation delay={0.1}>
                <span className="inline-block bg-primary-50 text-primary-600 border border-primary-500/20 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                  {data.category}
                </span>
              </RevealAnimation>
            )}

            <RevealAnimation delay={0.15}>
              <h1 className="text-heading-2 md:text-heading-1 text-secondary font-bold tracking-tight leading-tight">
                {data.title}
              </h1>
            </RevealAnimation>

            {data.excerpt && (
              <RevealAnimation delay={0.2}>
                <p className="text-tagline-1 md:text-heading-5 text-secondary/70 max-w-3xl mx-auto font-normal leading-relaxed">
                  {data.excerpt}
                </p>
              </RevealAnimation>
            )}

            {/* Author Metadata */}
            <RevealAnimation delay={0.25}>
              <div className="flex items-center justify-center gap-4 pt-2">
                {data.authorImage && (
                  <figure className="size-11 overflow-hidden rounded-full border border-secondary/10">
                    <Image
                      src={data.authorImage}
                      alt={data.authorName || 'Author'}
                      width={44}
                      height={44}
                      className="size-full object-cover"
                    />
                  </figure>
                )}
                <div className="text-left">
                  <p className="text-tagline-2 text-secondary font-semibold">
                    {data.authorName || 'Aeli AdOps Team'}
                  </p>
                  <div className="flex items-center gap-3 text-tagline-3 text-secondary/60">
                    <span className="flex items-center gap-1">
                      <CalendarIcon />
                      {data.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <ClockIcon />
                      {data.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </RevealAnimation>
          </div>

          {/* Featured Hero Image */}
          {data.image && (
            <RevealAnimation delay={0.3} className="my-10 md:my-14 max-w-5xl mx-auto">
              <figure className="h-[320px] md:h-[480px] lg:h-[540px] w-full overflow-hidden rounded-2xl border border-secondary/10 relative shadow-md">
                <Image
                  src={data.image}
                  alt={data.title || 'Blog Banner'}
                  fill
                  className="object-cover"
                  priority
                />
              </figure>
            </RevealAnimation>
          )}

          {/* Main Article Content (Comfortable Reading Width max-w-[800px]) */}
          <div className="mx-auto max-w-[820px] pt-4">
            <BlogDetailsMarkdown content={content} />

            {/* Contextual Publisher Audit CTA Box */}
            <div className="my-14 p-8 rounded-2xl bg-gradient-to-r from-secondary/5 via-secondary/10 to-primary-50/50 border border-secondary/15 relative overflow-hidden shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-xl bg-secondary text-white flex items-center justify-center shrink-0">
                  <CheckCircleIcon className="size-6 text-primary-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-heading-4 text-secondary font-bold">
                    Want an Expert Review of Your Ad Setup?
                  </h3>
                  <p className="text-tagline-2 text-secondary/70 leading-relaxed">
                    Identify hidden configuration errors, optimize your Google Ad Manager floors, and boost viewability with a complimentary, no-obligation audit from the Aeli AdOps team.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/publisher-audit"
                      className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 text-tagline-2 font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
                    >
                      <span>Request Free Publisher Audit</span>
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Share & Author Footer */}
            <div className="border-t border-secondary/15 pt-8 mt-12 space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-tagline-2 text-secondary/80 font-semibold">Share this post:</span>
                  <SocialIcons links={SHARE_SOCIAL_LINKS} iconClassName="stroke-secondary hover:stroke-primary-600 transition-colors" />
                </div>

                <div className="text-tagline-3 text-secondary/60">
                  Published in <span className="font-semibold text-secondary">{data.category}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default DetailsInfo;
