import { Metadata } from 'next';
import HomePage from '@/components/home/home';

export const metadata: Metadata = {
  title: 'Motion View Affiliate Program in Bangladesh',
  description:
    'Join the Motion View Affiliate Program in Bangladesh and earn by promoting authentic smart gadgets, electronics, and eco products from a trusted brand.',
};

const Home = () => {
  return <HomePage />;
};

export default Home;
