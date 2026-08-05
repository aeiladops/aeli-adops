import ServiceDetailsMarkdown from '@/src/components/service-details/service-details-markdown';
import WhyUse from '@/src/components/service-details/why-use';
import AdOperationsView from '@/src/components/services/ad-operations-view';
import GoogleAdManagerView from '@/src/components/services/google-ad-manager-view';
import ProgrammaticDirectView from '@/src/components/services/programmatic-direct-view';
import TechnicalSupportView from '@/src/components/services/technical-support-view';
import WebsiteMonetizationView from '@/src/components/services/website-monetization-view';
import YieldOptimizationView from '@/src/components/services/yield-optimization-view';
import CTA from '@/src/components/shared/cta';
import { ServiceData } from '@/src/interface/interface';
import { generateMetadata as buildMeta } from '@/src/utils/generateMetaData';
import getMarkDownContent from '@/src/utils/getMarkDownContent';
import getMarkDownData from '@/src/utils/getMarkDownData';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const services = getMarkDownData<ServiceData>('src/data/services');
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const doc = getMarkDownContent('src/data/services/', slug);
  if (!doc) return buildMeta('Service Not Found | Aeli AdOps');
  const data = doc.data as Partial<ServiceData>;
  const title = data.title
    ? `${data.title} | Aeli AdOps`
    : 'Service Details | Aeli AdOps';

  return buildMeta(title);
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const doc = getMarkDownContent('src/data/services/', slug);
  if (!doc) {
    notFound();
  }

  if (slug === 'yield-optimization') {
    return (
      <>
        <YieldOptimizationView />
        <WhyUse />
        <CTA />
      </>
    );
  }

  if (slug === 'website-monetization') {
    return (
      <>
        <WebsiteMonetizationView />
        <WhyUse />
        <CTA />
      </>
    );
  }

  if (slug === 'google-ad-manager') {
    return (
      <>
        <GoogleAdManagerView />
        <WhyUse />
        <CTA />
      </>
    );
  }

  if (slug === 'technical-support') {
    return (
      <>
        <TechnicalSupportView />
        <WhyUse />
        <CTA />
      </>
    );
  }

  if (slug === 'ad-operations') {
    return (
      <>
        <AdOperationsView />
        <WhyUse />
        <CTA />
      </>
    );
  }

  if (slug === 'programmatic-direct') {
    return (
      <>
        <ProgrammaticDirectView />
        <WhyUse />
        <CTA />
      </>
    );
  }

  return (
    <>
      <ServiceDetailsMarkdown content={doc.content} />
      <WhyUse />
      <CTA />
    </>
  );
};

export default Page;
