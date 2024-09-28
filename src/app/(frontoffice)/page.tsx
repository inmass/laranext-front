import Hero from '@/components/layouts/front-office/hero';
import { getAppName } from '@/lib/helpers';
import Image from 'next/image';

export const metadata = {
  title: getAppName() + ' - ' + 'Home'
};

const Home = () => {
  return (
    <>
      <Hero />
      <div className="flex items-center justify-between p-8 bg-gray-100">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">ABOUT US</h2>
          <p className="text-gray-700 mb-4">
            MAGANA DELUXE is a premier online platform dedicated to buying and
            selling luxury watches. Our carefully curated collection features
            exceptional timepieces from passionate sellers. Sellers can list their
            watches for a <span className="font-semibold">small fee</span>, connecting with serious buyers, while all
            transactions are completed privately between users. Whether you're a
            buyer seeking the perfect watch or a seller showcasing a unique piece,
            MAGANA DELUXE offers a trusted space for luxury watch enthusiasts.
          </p>
          <button className="bg-navy-blue text-white py-2 px-4 rounded">
            LEARN MORE ABOUT US
          </button>
        </div>
        <div className="relative w-64 h-64">
          <Image
            src="/watch-image.jpg"
            alt="Luxury Watch"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
