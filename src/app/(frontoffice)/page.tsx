import AboutUs from '@/components/layouts/front-office/home/about-us';
import Hero from '@/components/layouts/front-office/home/hero';
import HowItWorks from '@/components/layouts/front-office/home/how-it-works';
import { getAppName } from '@/lib/helpers';

export const metadata = {
  title: getAppName() + ' - ' + 'Home'
};

const Home = () => {
  return (
    <>
      <Hero />
      <AboutUs />
      <HowItWorks className="mb-20"/>
    </>
  );
};

export default Home;
