import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                CreativeShowcase
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A platform for artists to showcase their digital memories and artwork.
              Share your creativity with the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Gallery', 'Artists', 'Trending'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {['Blog', 'Documentation', 'Support', 'Community'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              {[
                { name: 'twitter', color: 'hover:text-blue-400' },
                { name: 'instagram', color: 'hover:text-pink-500' },
                { name: 'facebook', color: 'hover:text-blue-600' },
                { name: 'github', color: 'hover:text-gray-300' }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center ${social.color} transition-colors duration-200`}
                  aria-label={social.name}
                >
                  <span className="text-lg">{
                    social.name === 'twitter' ? '🐦' :
                      social.name === 'instagram' ? '📷' :
                        social.name === 'facebook' ? '📘' : '💻'
                  }</span>
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-4">
              goutam.debugs@gmail.com
              <img
              src="https://avatars.githubusercontent.com/u/249311741?v=4"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover mx-auto"
            />
            </p>
            
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Creative Showcase. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Made with <span className="text-red-400">❤️</span> for artists worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;