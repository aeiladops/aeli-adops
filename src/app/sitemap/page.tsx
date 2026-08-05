import SitemapContent from '@/src/components/sitemap/sitemap-content';
import CTA from '@/src/components/shared/cta';
import { generateMetadata } from '@/src/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'HTML Sitemap & Site Index | Aeli AdOps',
  description: 'Complete HTML sitemap and page directory for Aeli AdOps. Easily navigate through our services, publisher audit tools, blog insights, and legal pages.',
};

export default function SitemapPage() {
  return (
    <>
      <SitemapContent />
      <CTA />
    </>
  );
}
