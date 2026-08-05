import ContactUs from '@/src/components/contact/contact-us';
import CTA from '@/src/components/shared/cta';
import { generateMetadata } from '@/src/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'Contact Us | Aeli AdOps',
};

const ContactPage = () => {
  return (
    <>
      <ContactUs />
      <CTA />
    </>
  );
};

export default ContactPage;
