import Hero from '@/components/layouts/front-office/hero';
import { getAppName } from '@/lib/helpers';

export const metadata = {
  title: getAppName() + ' - ' + 'Home'
};

const Home = () => {
  return (
    <>
      <Hero />
      <div>test</div>
    </>
  );
};

export default Home;
