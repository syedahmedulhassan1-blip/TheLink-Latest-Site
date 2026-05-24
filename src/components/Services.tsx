import React, { useEffect, useRef, useState } from 'react';
import { Palette, Printer as PrinterIcon, Megaphone, Layers, Monitor, Users, Globe, Sparkles } from 'lucide-react';
import { useRouter } from '../router';

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const services = [
  { icon: Palette,      title: 'Creative Campaigns',  description: 'From concept to execution, campaigns that capture attention and drive real action.', features: ['Brand Strategy', 'Creative Concepts', 'Campaign Development', 'Multi-channel Execution'] },
  { icon: Layers,       title: 'Branding & Identity',  description: 'Building strong brand identities that resonate with your target audience across markets.', features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Positioning'] },
  { icon: Globe,        title: 'Website & UI/UX',      description: 'Beautiful, user-centered digital experiences that engage audiences and convert visitors.', features: ['Web Design', 'UI/UX Design', 'Responsive Development', 'UX Strategy'] },
  { icon: Sparkles,     title: 'AI-Powered Creative',  description: 'Cutting-edge AI solutions that amplify your creative vision and streamline production.', features: ['AI Content Generation', 'Smart Automation', 'Data-Driven Insights', 'Creative Intelligence'] },
  { icon: PrinterIcon,  title: 'Print Materials',      description: 'High-quality print solutions that make your brand stand out in physical spaces.', features: ['Brochures & Flyers', 'Business Cards', 'Packaging Design', 'Corporate Materials'] },
  { icon: Monitor,      title: 'Point of Sale',        description: 'Strategic POS materials that drive sales and enhance the in-store customer experience.', features: ['Display Design', 'Promotional Materials', 'In-store Graphics', 'Product Packaging'] },
  { icon: Megaphone,    title: 'Outdoor Advertising',  description: 'Large-format advertising solutions that command attention in public spaces and cities.', features: ['Billboard Design', 'Transit Advertising', 'Street Furniture', 'Digital Displays'] },
  { icon: Users,        title: 'Digital & Social',     description: 'Digital campaigns that engage audiences across social media and online platforms.', features: ['Social Campaigns', 'Digital Advertising', 'Content Creation', 'Online Branding'] },
];

const Services: React.FC = () => {
  const { navigate } = useRouter();
  const heading = useReveal();
  const grid = useReveal(0.05);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="bg-gray-950 overflow-hidden">
      <div className="section-divider" />

      <div className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={heading.ref}
          className={`text-center mb-20 transition-all duration-1000 ${heading.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <p className="text-green-400 text-xs tracking-[0.4em] uppercase mb-4 font-light">What We Do</p>
          <h2 className="text-5xl md:text-7xl font-extralight text-white mb-6 tracking-tight">
            Our <span className="italic text-green-400">Services</span>
          </h2>
          <div className="w-12 h-px bg-green-500 mx-auto mb-8" />
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            Comprehensive advertising solutions tailored to your brand's unique needs,
            with specialized expertise in Middle Eastern and Saudi markets.
          </p>
        </div>

        {/* Grid */}
        <div ref={grid.ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {services.map((s, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ transitionDelay: grid.visible ? `${i * 60}ms` : '0ms' }}
              className={`group relative bg-gray-950 p-8 cursor-default transition-all duration-700
                hover:bg-gray-900
                ${grid.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              {/* Animated top border */}
              <div className={`absolute top-0 left-0 h-0.5 bg-green-500 transition-all duration-500 ${hovered === i ? 'w-full' : 'w-0'}`} />

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${hovered === i ? 'bg-green-500 scale-110' : 'bg-white/5'}`}>
                <s.icon className={`w-6 h-6 transition-colors duration-300 ${hovered === i ? 'text-black' : 'text-green-400'}`} strokeWidth={1.5} />
              </div>

              <h3 className="text-lg font-light text-white mb-3 tracking-tight">{s.title}</h3>
              <p className="text-gray-500 mb-6 leading-relaxed text-sm font-light">{s.description}</p>

              <ul className="space-y-2">
                {s.features.map((f, fi) => (
                  <li key={fi} className="flex items-center text-gray-600 text-xs font-light">
                    <div className={`w-1 h-1 rounded-full mr-3 transition-colors duration-300 flex-shrink-0 ${hovered === i ? 'bg-green-400' : 'bg-gray-600'}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${grid.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={() => navigate('contact')}
            className="group relative inline-flex items-center gap-3 border border-green-500/40 text-green-400 hover:bg-green-500 hover:text-black px-10 py-4 rounded-full font-light text-sm tracking-widest uppercase transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.25)]"
          >
            Discuss Your Project
          </button>
        </div>
      </div>

      <div className="section-divider" />
    </section>
  );
};

export default Services;
