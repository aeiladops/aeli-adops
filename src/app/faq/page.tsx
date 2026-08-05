import FAQClient from '@/src/components/faq/faq-client';
import Testimonial from '@/src/components/home/testimonial';
import CTA from '@/src/components/shared/cta';
import { generateMetadata } from '@/src/utils/generateMetaData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'Frequently Asked Questions | Aeli AdOps',
  description:
    'Find answers to common questions about Google Ad Manager, Ad Operations, Yield Optimization, Programmatic Advertising, and Publisher Monetization.',
  alternates: {
    canonical: 'https://aeliadops.com/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | Aeli AdOps',
    description:
      'Find answers to common questions about Google Ad Manager, Ad Operations, Yield Optimization, Programmatic Advertising, and Publisher Monetization.',
    url: 'https://aeliadops.com/faq',
    siteName: 'Aeli AdOps',
    type: 'website',
  },
};

const Page = () => {
  return (
    <>
      <FAQClient />
      <Testimonial />
      <CTA />
    </>
  );
};

export default Page;
