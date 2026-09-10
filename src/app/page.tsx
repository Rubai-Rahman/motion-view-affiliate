import { Metadata } from 'next';
import HomePage from '@/components/home/home';

export const metadata: Metadata = {
  title: 'Motion View Affiliate',
  description: 'Motion View Affiliate',
};

const Home = () => {
  return <HomePage />;
};

export default Home;
