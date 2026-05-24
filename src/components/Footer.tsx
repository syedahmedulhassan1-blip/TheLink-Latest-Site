import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Globe, ArrowRight } from 'lucide-react';
import { useRouter, type Page } from '../router';

const navLinks: { label: string; id: Page }[] = [
  { label: 'Home',          id: 'home' },
  { label: 'About',         id: 'about' },
  { label: 'Portfolio',     id: 'portfolio' },
  { label: 'Agentic AI',    id: 'agentic-ai' },
  { label: 'Services',      id: 'services' },
  { label: 'Rent Creative', id: 'rent-creative' },
  { label: 'Contact',       id: 'contact' },
];

const Footer: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <footer className="bg-black text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Brand */}
          <div className="lg:col-span-5">
            <img src="/the link logo white.png" alt="The Link Advertising" className="h-12 w-auto mb-6" />
            <p className="text-gray-500 mb-8 max-w-sm leading-relaxed font-light text-sm">
              A creative and technology agency spanning 4 sub-continents, rooted in the Middle East &amp; Saudi Arabia.
              We build brands that captivate and autonomous systems that perform.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl border border-white/8 flex items-center justify-center text-gray-500 hover:text-green-400 hover:border-green-500/40 transition-all duration-300 hover:scale-110">
                <Linkedin size={16} strokeWidth={1.5} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl border border-white/8 flex items-center justify-center text-gray-500 hover:text-green-400 hover:border-green-500/40 transition-all duration-300 hover:scale-110">
                <Globe size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-light tracking-widest uppercase text-white/60 mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => navigate(item.id)}
                    className="group text-gray-500 hover:text-green-400 transition-colors duration-200 font-light text-sm flex items-center gap-2"
                  >
                    <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-green-400" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-light tracking-widest uppercase text-white/60 mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-500">
                <Phone className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div className="font-light text-sm space-y-1">
                  <div>South Asia: +92 304 223 9907</div>
                  <div>Middle East: +971 50 726 4698</div>
                  <div className="text-gray-600 text-xs">Saudi Arabia: Expanding Soon</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <Mail className="w-4 h-4 text-green-400 flex-shrink-0" strokeWidth={1.5} />
                <a href="mailto:contact@thelinkadvertizing.com" className="hover:text-green-400 transition-colors duration-200 font-light text-sm">
                  contact@thelinkadvertizing.com
                </a>
              </div>
              <div className="flex items-start gap-3 text-gray-500">
                <MapPin className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div className="font-light text-sm">
                  <div>Serving 4 Sub-Continents</div>
                  <div className="text-xs text-gray-600 mt-1">Asia · Middle East · Africa · Europe</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-light">
            © 2025 The Link Advertising Agency. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-green-400 transition-colors duration-200 font-light text-xs">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-green-400 transition-colors duration-200 font-light text-xs">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
