import { generateMetadata } from '@/src/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'Aeli AdOps | Publisher Monetisation & Ad Operations',
};

import AboutUs from '@/src/components/home/about-us';
import Benefits from '@/src/components/home/benefits';
import Features from '@/src/components/home/features';
import FreePublisherAuditSection from '@/src/components/home/free-publisher-audit';
import Hero from '@/src/components/home/hero';
import Process from '@/src/components/home/process';
import StaggeredGridSection from '@/src/components/home/staggered-grid-section';
import CTA from '@/src/components/shared/cta';
import Footer from '@/src/components/shared/layout/footer/footer';

const Page = () => {
  return (
    <>
      <Hero />
      <AboutUs />
      <Features />
      <Benefits />
      <Process />
      <FreePublisherAuditSection />
      <CTA />
      <Footer isHomePageInner />
      <StaggeredGridSection />
    </>
  );
};

export default Page;

