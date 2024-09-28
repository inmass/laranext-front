import AboutUs from '@/components/layouts/front-office/home/about-us';
import Hero from '@/components/layouts/front-office/home/hero';
import { getAppName } from '@/lib/helpers';
import Image from 'next/image';

export const metadata = {
  title: getAppName() + ' - ' + 'Home'
};

const Home = () => {
  return (
    <>
      <Hero />
      <AboutUs />
    </>
  );
};

export default Home;
