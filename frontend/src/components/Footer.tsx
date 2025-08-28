import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-purple-600 to-pink-600 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo/Brand */}
          <div className="mb-4 md:mb-0">
            <a href="#home" className="text-2xl font-bold text-white">
              <span className="text-cyan-300">&lt;</span>
              Dev
              <span className="text-cyan-300">/&gt;</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-white/80">
            <span>© {currentYear} John Doe. Made with</span>
            <Heart size={16} className="text-red-300 animate-pulse" />
            <span>and lots of coffee</span>
          </div>

          {/* Quick Links */}
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#about"
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-8 pt-6 border-t border-white/20">
          <p className="text-white/70 text-sm">
            Thank you for visiting my portfolio. Let's build something amazing together!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;