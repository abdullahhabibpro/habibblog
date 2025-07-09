import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-5/12 px-4 mb-8">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-4">
                <Logo width="100px" />
              </div>
              <p className="text-sm">&copy; 2025 HabibBlog. All Rights Reserved.</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-2/12 px-4 mb-8">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-6">Company</h3>
            <ul>
              <li className="mb-4">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              </li>
              <li className="mb-4">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
              </li>
              <li className="mb-4">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Affiliate Program</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Press Kit</Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-2/12 px-4 mb-8">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-6">Support</h3>
            <ul>
              <li className="mb-4">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Account</Link>
              </li>
              <li className="mb-4">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Help</Link>
              </li>
              <li className="mb-4">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Customer Support</Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-3/12 px-4 mb-8">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-6">Legals</h3>
            <ul>
              <li className="mb-4">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
              <li className="mb-4">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Licensing</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;