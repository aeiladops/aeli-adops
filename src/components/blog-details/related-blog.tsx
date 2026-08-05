import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { BlogPost } from '@/src/interface/interface';
import getMarkDownData from '@/src/utils/getMarkDownData';
import Image from 'next/image';
import Link from 'next/link';

interface RelatedBlogProps {
  currentSlug: string;
  category?: string;
}

/* SVG Helpers */
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

const RelatedBlog = ({ currentSlug, category }: RelatedBlogProps) => {
  const allPosts = getMarkDownData<BlogPost>('src/data/blog', false, 'order');
  
  // Exclude current post
  const otherPosts = allPosts.filter((post) => post.slug !== currentSlug);

  // Filter posts in the same category first, then fallback to others
  const sameCategoryPosts = category
    ? otherPosts.filter((post) => post.category === category)
    : [];
  
  const remainingPosts = otherPosts.filter(
    (post) => !sameCategoryPosts.some((p) => p.slug === post.slug)
  );

  const relatedPosts = [...sameCategoryPosts, ...remainingPosts].slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 bg-secondary/[0.02] border-t border-secondary/10">
      <div className="main-container space-y-10 md:space-y-14">
        <div className="space-y-3 text-center">
          <TextReveal delay={0.1}>
            <h2 className="text-heading-3 md:text-heading-2 text-secondary font-bold">Related Insights</h2>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="text-tagline-1 text-secondary/65 mx-auto max-w-[550px]">
              Explore more practical guides on publisher monetization, Google Ad Manager, and yield optimization.
            </p>
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts.map((post, index) => (
            <RevealAnimation key={post.slug} delay={0.1 * (index + 1)}>
              <article className="group flex flex-col justify-between rounded-xl bg-white border border-secondary/10 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                <div>
                  <figure className="h-[220px] w-full overflow-hidden relative bg-secondary/5">
                    <Link href={`/blog/${post.slug}`} className="block h-full w-full">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </Link>
                    {post.category && (
                      <div className="absolute top-3 left-3 bg-secondary/90 text-white text-[11px] font-medium px-2.5 py-1 rounded-md backdrop-blur-sm">
                        {post.category}
                      </div>
                    )}
                  </figure>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-x-3 text-tagline-3 text-secondary/60">
                      <span className="flex items-center gap-1">
                        <CalendarIcon />
                        {post.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <ClockIcon />
                        {post.readTime}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="block">
                      <h3 className="text-heading-5 text-secondary font-bold line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-tagline-2 text-secondary/70 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-tagline-2 font-semibold text-secondary group-hover:text-primary-600 transition-colors pt-2 border-t border-secondary/5 w-full justify-between"
                  >
                    <span>Read Article</span>
                    <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedBlog;
