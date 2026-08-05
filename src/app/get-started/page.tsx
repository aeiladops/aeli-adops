import GetStartedPage from '@/src/components/get-started/get-started-page';
import { generateMetadata as buildMeta } from '@/src/utils/generateMetaData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...buildMeta('Get Started — Free Publisher Audit | Aeli AdOps'),
  description:
    'Request your free publisher audit from Aeli AdOps. Our certified GAM engineers identify revenue gaps, fill rate issues, and ad stack problems in 1–2 business days.',
};

export default function GetStartedRoute() {
  return <GetStartedPage />;
}
