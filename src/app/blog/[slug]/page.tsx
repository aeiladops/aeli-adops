import DetailsInfo from '@/src/components/blog-details/details-info';
import RelatedBlog from '@/src/components/blog-details/related-blog';
import CTA from '@/src/components/shared/cta';
import { BlogPost } from '@/src/interface/interface';
import getMarkDownContent from '@/src/utils/getMarkDownContent';
import getMarkDownData from '@/src/utils/getMarkDownData';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getMarkDownData<BlogPost>('src/data/blog', false, 'order');
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const doc = getMarkDownContent('src/data/blog/', slug);
  if (!doc) {
    return {
      title: 'Blog Not Found | Aeli AdOps',
    };
  }

  const data = doc.data as Partial<BlogPost>;
  const title = data.metaTitle || (data.title ? `${data.title} | Aeli AdOps Insights` : 'Aeli AdOps Blog');
  const description =
    data.metaDescription ||
    data.excerpt ||
    'Explore publisher monetization insights, Google Ad Manager guides, ad operations best practices, and yield optimization strategies.';
  const canonicalUrl = `https://aeliadops.com/blog/${slug}`;
  const ogImage = data.image || '/images/aeli-about-2580x1460.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Aeli AdOps',
      type: 'article',
      publishedTime: data.dateTime,
      authors: [data.authorName || 'Aeli AdOps Team'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: data.title || 'Aeli AdOps Insight',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const doc = getMarkDownContent('src/data/blog/', slug);
  if (!doc) {
    notFound();
  }
  const data = doc.data as Partial<BlogPost>;

  return (
    <>
      <DetailsInfo data={data} content={doc.content} />
      <RelatedBlog currentSlug={slug} category={data.category} />
      <CTA />
    </>
  );
};

export default Page;
