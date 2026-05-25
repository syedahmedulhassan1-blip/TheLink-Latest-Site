import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Play } from 'lucide-react';
import { useRouter } from '../router';
import { useContent } from '../content/ContentContext';
import SmartImage from './SmartImage';

const Hero: React.FC = () => {
  const { navigate } = useRouter();
  const { content } = useContent();
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Respect reduced-motion and skip the effect on touch devices for perf.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReduced || isCoarsePointer) return;

    let raf = 0;
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      // Throttle state updates to one per animation frame.
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setMousePos({ x, y }));
    };
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="home" className="bg-black">
      {/* Hero Image */}
      <div ref={heroRef} className="relative w-full overflow-hidden" style={{ maxHeight: '100vh' }}>
        <SmartImage
          src={content.hero.image.src}
          alt={content.hero.image.alt || 'The Link Advertising'}
          loading="eager"
          fetchPriority="high"
          className="w-full h-auto block animate-zoom-pan"
          style={{
            maxHeight: '100vh',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: `scale(1.04) translate(${mousePos.x * -12}px, ${mousePos.y * -8}px)`,
            transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* Text section */}
      <div className="bg-black py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(30px)',
              transition: 'opacity 1s 0.2s, transform 1s 0.2s',
            }}
          >
            <SmartImage
              src={content.branding.logoLight.src}
              alt={content.branding.logoLight.alt || 'The Link Advertising'}
              className="h-14 md:h-20 w-auto mx-auto mb-12"
            />
          </div>

          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(40px)',
              transition: 'opacity 1s 0.4s, transform 1s 0.4s',
            }}
          >
            <p className="text-green-400/80 text-xs tracking-[0.4em] uppercase mb-6 font-light">
              Creative &amp; Technology Agency
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white mb-6 leading-[1.05] tracking-tight">
              Where Brands
              <span className="block italic text-green-400">Come Alive</span>
            </h1>
          </div>

          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(40px)',
              transition: 'opacity 1s 0.6s, transform 1s 0.6s',
            }}
          >
            <p className="text-lg md:text-xl text-white/50 mb-14 max-w-2xl mx-auto leading-relaxed font-light">
              Where bold creative thinking meets autonomous technology. Spanning 4 sub-continents,
              rooted in the Middle East and Saudi Arabia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('portfolio')}
                className="group relative bg-green-500 hover:bg-green-400 text-black px-10 py-4 rounded-full font-light text-sm tracking-widest uppercase transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Play size={14} strokeWidth={2} />
                  View Our Work
                </span>
              </button>
              <button
                onClick={() => navigate('contact')}
                className="border border-white/20 text-white/70 hover:text-white hover:border-white/60 px-10 py-4 rounded-full font-light text-sm tracking-widest uppercase transition-all duration-500 hover:scale-105 backdrop-blur-sm"
              >
                Start a Project
              </button>
              <a
                href="https://wa.me/971507264698"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black px-10 py-4 rounded-full font-light text-sm tracking-widest uppercase transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Stats row */}
          <div
            className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto border-t border-white/10 pt-12"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(30px)',
              transition: 'opacity 1s 0.9s, transform 1s 0.9s',
            }}
          >
            {[
              { val: '4', label: 'Sub-continents' },
              { val: '150+', label: 'Clients' },
              { val: '500+', label: 'Campaigns' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-extralight text-white mb-1">{s.val}</div>
                <div className="text-xs text-white/40 tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('about')}
            className="mt-16 text-white/30 hover:text-green-400 transition-colors duration-300 animate-bounce mx-auto block"
          >
            <ArrowDown size={24} strokeWidth={1} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
