import React from 'react';
import Link from 'next/link';
// import { Instagram, Facebook, Twitter } from 'lucide-react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { getAppName } from '@/lib/helpers';

const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-background py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">{getAppName().toUpperCase()}</h2>
          </div>
          
          <div>
            <h3 className="text-lg mb-4 text-gray-500 font-bold">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/browse">Browse</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg mb-4 text-gray-500 font-bold">Contact us</h3>
            <p>Email: Klasikiat@gmail.com</p>
            <p>Phone: +212 567898745</p>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 {getAppName()}. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="https://instagram.com/klasikiat" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="w-6 h-6" />
            </Link>
            <Link href="https://facebook.com/klasikiat" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="w-6 h-6" />
            </Link>
            <Link href="https://twitter.com/klasikiat" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
