import { Metadata } from 'next';
import HomePage from '@/components/home/home';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

const Home = () => {
  return <HomePage />;
};

export default Home;
