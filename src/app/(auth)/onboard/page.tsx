import { Metadata } from 'next';
import OnboardContainer from './onboard-container';

export const metadata: Metadata = {
  title: 'Onboard',
  description: 'Onboard for an account',
};

export default function OnboardPage() {
  return <OnboardContainer />;
}
