import SignUp from '@/src/components/auth/sign-up';
import { generateMetadata } from '@/src/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'Sign Up | Aeli AdOps',
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
