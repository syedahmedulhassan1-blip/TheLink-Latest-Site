import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter, type Page } from '../router';
import { useContent } from '../content/ContentContext';
import SmartImage from './SmartImage';

interface NavItem { label: string; id: Page }

const navItems: NavItem[] = [
  { label: 'Home',           id: 'home' },
  { label: 'About',          id: 'about' },
  { label: 'Portfolio',      id: 'portfolio' },
  { label: 'Agentic AI',     id: 'agentic-ai' },
  { label: 'Services',       id: 'services' },
  { label: 'Rent Creative',  id: 'rent-creative' },
  { label: 'Contact',        id: 'contact' },
];

const Header: React.FC = () => {
  const { page, navigate } = useRouter();
  const { content } = useContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on page change
  useEffect(() => { setIsMenuOpen(false); }, [page]);

  const isHome = page === 'home';
  const darkBg = !isScrolled && isHome;

  const go = (id: Page) => { navigate(id); setIsMenuOpen(false); };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-700 ${
        isScrolled || !isHome
          ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100/50 py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <button onClick={() => go('home')} className="flex-shrink-0 group">
            <SmartImage
              src={darkBg ? content.branding.logoLight.src : content.branding.logoDark.src}
              alt={content.branding.logoDark.alt || 'The Link Advertising'}
              variant={darkBg ? 'dark' : 'light'}
              className="h-10 md:h-12 w-auto transition-all duration-500 group-hover:scale-105"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`relative font-light text-sm tracking-widest uppercase transition-all duration-300 py-1 group ${
                  darkBg ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-green-600'
                } ${page === item.id ? (darkBg ? '!text-white' : '!text-green-600') : ''}`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-green-500 transition-all duration-300 ${
                    page === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}

            <button
              onClick={() => go('contact')}
              className={`ml-2 px-6 py-2.5 rounded-full text-sm font-light tracking-wide transition-all duration-300 hover:scale-105 ${
                darkBg
                  ? 'border border-white/40 text-white hover:bg-white/10 backdrop-blur-sm'
                  : 'bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-green-200'
              }`}
            >
              Get In Touch
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
              darkBg ? 'text-white' : 'text-gray-900'
            }`}
            onClick={() => setIsMenuOpen(v => !v)}
          >
            <div className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
              {isMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? 'max-h-[32rem] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-6 space-y-1">
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                style={{ transitionDelay: isMenuOpen ? `${i * 40}ms` : '0ms' }}
                className={`w-full text-left py-3 px-4 rounded-xl font-light text-sm tracking-wide transition-all duration-300 ${
                  page === item.id
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => go('contact')}
                className="w-full bg-green-500 text-white py-3 px-4 rounded-xl font-light text-sm tracking-wide hover:bg-green-600 transition-colors duration-200"
              >
                Get In Touch
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
