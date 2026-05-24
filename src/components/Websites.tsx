import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Globe, ArrowRight } from 'lucide-react';
import { useRouter } from '../router';

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

interface Site {
  url: string;
  title: string;
  client: string;
  location: string;
  description: string;
  tags: string[];
}

const sites: Site[] = [
  {
    url: 'https://www.naquist.com/',
    title: 'Naquist',
    client: 'Naquist',
    location: 'Italy',
    description: 'Luxury partnership platform for the Italian market, a refined digital experience built for high-end hospitality and brand collaborations.',
    tags: ['Luxury', 'Web Design', 'UI/UX'],
  },
  {
    url: 'https://www.vita-italiana.com/',
    title: 'Vita Italiana',
    client: 'Vita Italiana',
    location: 'Italy',
    description: 'An elegant lifestyle brand showcasing the essence of Italian living, with curated content, immersive visuals, and a seamless digital journey.',
    tags: ['Lifestyle', 'Brand Identity', 'Web Design'],
  },
  {
    url: 'https://petrominexpress-uae.netlify.app/',
    title: 'Petromin Express UAE',
    client: 'Petromin Express',
    location: 'UAE',
    description: 'Digital presence for Petromin Express in the UAE, a fast, modern automotive service platform built for clarity and conversion.',
    tags: ['Automotive', 'Web Development', 'UI/UX'],
  },
];

const BrowserFrame: React.FC<{ site: Site; delay: number; visible: boolean }> = ({ site, delay, visible }) => {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const displayUrl = site.url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative flex flex-col rounded-2xl border border-white/8 overflow-hidden bg-gray-950
        hover:border-white/20 transition-all duration-700 hover:shadow-[0_0_60px_rgba(0,0,0,0.8)]
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-14'}`}
    >
      {/* Top bar animation */}
      <div className={`absolute top-0 left-0 h-px bg-green-500 transition-all duration-500 z-10 ${hovered ? 'w-full' : 'w-0'}`} />

      {/* Browser chrome */}
      <div className="flex-shrink-0 bg-gray-900 border-b border-white/6 px-4 py-3 flex items-center gap-3">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-amber-400/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>

        {/* Address bar */}
        <div className="flex-1 flex items-center gap-2 bg-black/40 rounded-lg px-3 py-1.5 border border-white/5 min-w-0">
          <Globe size={10} className="text-gray-500 flex-shrink-0" />
          <span className="text-gray-500 text-[11px] font-light truncate tracking-wide">{displayUrl}</span>
        </div>

        {/* Open button */}
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/5 hover:bg-green-500/20 border border-white/5 hover:border-green-500/30 flex items-center justify-center transition-all duration-300"
          title="Open in new tab"
        >
          <ExternalLink size={11} className="text-gray-400 hover:text-green-400" />
        </a>
      </div>

      {/* iframe viewport */}
      <div className="relative bg-white overflow-hidden" style={{ height: '420px' }}>
        {!loaded && (
          <div className="absolute inset-0 bg-gray-950 flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
              <span className="text-gray-600 text-xs font-light tracking-widest uppercase">Loading</span>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={site.url}
          title={site.title}
          className="w-full h-full border-0"
          style={{
            width: '100%',
            height: '100%',
            transform: 'scale(1)',
            transformOrigin: 'top left',
          }}
          onLoad={() => setLoaded(true)}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />

        {/* Clickthrough overlay: prevents iframe interaction, sends click to open link */}
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-20 cursor-pointer"
          aria-label={`Visit ${site.title}`}
        >
          <div className={`absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center`}>
            <div className={`flex items-center gap-2 bg-black/80 backdrop-blur-sm text-white text-xs font-light tracking-widest uppercase px-5 py-2.5 rounded-full border border-white/10 transition-all duration-300 ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <ExternalLink size={12} />
              Visit Website
            </div>
          </div>
        </a>
      </div>

      {/* Info footer */}
      <div className="p-6 border-t border-white/5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-white font-light text-base tracking-tight mb-1">{site.title}</h3>
            <p className="text-green-400/70 text-xs font-light">{site.client} · {site.location}</p>
          </div>
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 group/btn flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-400 font-light tracking-wide transition-colors duration-300"
          >
            Visit
            <ArrowRight size={11} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
        </div>
        <p className="text-gray-600 text-xs font-light leading-relaxed mb-4">{site.description}</p>
        <div className="flex flex-wrap gap-2">
          {site.tags.map(tag => (
            <span key={tag} className="text-[10px] text-gray-600 border border-white/6 px-2.5 py-1 rounded-full font-light tracking-wide">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Websites: React.FC = () => {
  const { navigate } = useRouter();
  const heading = useReveal();
  const grid = useReveal(0.04);

  return (
    <section id="websites" className="bg-gray-950 overflow-hidden">
      <div className="section-divider" />

      <div className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div
          ref={heading.ref}
          className={`text-center mb-20 transition-all duration-1000 ${heading.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <p className="text-green-400 text-xs tracking-[0.4em] uppercase mb-4 font-light">Live Deployments</p>
          <h2 className="text-5xl md:text-7xl font-extralight text-white mb-6 tracking-tight">
            Websites We've <span className="italic text-green-400">Built</span>
          </h2>
          <div className="w-12 h-px bg-green-500 mx-auto mb-8" />
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Beautiful, performant digital experiences, from luxury platforms to automotive services.
          </p>
        </div>

        {/* Grid */}
        <div ref={grid.ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site, i) => (
            <BrowserFrame key={site.url} site={site} delay={i * 120} visible={grid.visible} />
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${grid.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={() => navigate('contact')}
            className="group inline-flex items-center gap-3 border border-green-500/40 text-green-400 hover:bg-green-500 hover:text-black px-10 py-4 rounded-full font-light text-sm tracking-widest uppercase transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.25)]"
          >
            Let's Build Yours
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="section-divider" />
    </section>
  );
};

export default Websites;
