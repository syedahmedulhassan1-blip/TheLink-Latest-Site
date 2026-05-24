import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, X, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  client: string;
  category: string;
  images: string[];
  description: string;
  featured?: boolean;
}

function useReveal(threshold = 0.08) {
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

// ── Lightbox ─────────────────────────────────────────────
interface LightboxProps {
  item: PortfolioItem;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ item, onClose }) => {
  const [idx, setIdx] = useState(0);

  const prev = useCallback(() => setIdx(i => (i - 1 + item.images.length) % item.images.length), [item.images.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % item.images.length), [item.images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, prev, next]);

  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);

  const catColors: Record<string, string> = {
    creative: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    print:    'text-green-400 bg-green-400/10 border-green-400/20',
    pos:      'text-amber-400 bg-amber-400/10 border-amber-400/20',
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl mx-4 flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all duration-200 z-10"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        {/* Image area */}
        <div className="relative bg-gray-950 rounded-2xl overflow-hidden flex items-center justify-center" style={{ minHeight: '60vh' }}>
          {item.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${item.title} ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
              style={{ maxHeight: '65vh' }}
            />
          ))}

          {/* Nav arrows */}
          {item.images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 w-11 h-11 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white hover:bg-black/80 hover:border-white/40 transition-all duration-200 z-10"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
              <button
                onClick={next}
                className="absolute right-4 w-11 h-11 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white hover:bg-black/80 hover:border-white/40 transition-all duration-200 z-10"
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            </>
          )}

          {/* Featured badge */}
          {item.featured && (
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/95 backdrop-blur-sm shadow-lg">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-black shrink-0">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-black text-[10px] font-semibold tracking-widest uppercase">Globally Featured</span>
            </div>
          )}
        </div>

        {/* Dots + counter */}
        {item.images.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {item.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`rounded-full transition-all duration-300 ${i === idx ? 'w-5 h-1.5 bg-green-400' : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'}`}
              />
            ))}
          </div>
        )}

        {/* Info */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-xs px-3 py-1 rounded-full border font-light tracking-wide ${catColors[item.category] || catColors.creative}`}>
                {item.category.toUpperCase()}
              </span>
              {item.images.length > 1 && (
                <span className="text-gray-600 text-xs font-light">{idx + 1} / {item.images.length}</span>
              )}
            </div>
            <h3 className="text-white font-light text-xl tracking-tight mb-1">{item.title}</h3>
            <p className="text-green-400/80 text-sm font-light mb-2">{item.client}</p>
            <p className="text-gray-500 text-sm font-light leading-relaxed">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Card ─────────────────────────────────────────────────
const PortfolioCard: React.FC<{ item: PortfolioItem; delay: number; visible: boolean; onOpen: () => void }> = ({ item, delay, visible, onOpen }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (item.images.length <= 1) return;
    const iv = setInterval(() => setImgIdx(p => (p + 1) % item.images.length), 3500);
    return () => clearInterval(iv);
  }, [item.images.length]);

  const catColors: Record<string, string> = {
    creative: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    print:    'text-green-400 bg-green-400/10 border-green-400/20',
    pos:      'text-amber-400 bg-amber-400/10 border-amber-400/20',
  };

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative bg-gray-950 border border-white/5 rounded-2xl overflow-hidden cursor-pointer
        hover:border-white/15 transition-all duration-700
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5]">
        {item.images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === imgIdx ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={img}
              alt={`${item.title} ${i + 1}`}
              className={`w-full h-full object-cover transition-transform duration-[1.2s] ${hovered ? 'scale-105' : 'scale-100'}`}
            />
          </div>
        ))}

        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center">
              <ChevronRight size={18} className="text-white" strokeWidth={1.5} />
            </div>
            <span className="text-white/70 text-xs tracking-widest uppercase font-light">View Gallery</span>
          </div>
        </div>

        {/* Featured badge */}
        {item.featured && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/95 backdrop-blur-sm shadow-lg">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-black shrink-0">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-black text-[10px] font-semibold tracking-widest uppercase">Globally Featured</span>
          </div>
        )}

        {/* Image count badge */}
        {item.images.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm">
            <span className="text-white/60 text-[10px] font-light">{item.images.length} images</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs px-3 py-1 rounded-full border font-light tracking-wide ${catColors[item.category] || catColors.creative}`}>
            {item.category.toUpperCase()}
          </span>
        </div>
        <h3 className="text-base font-light text-white mb-1 tracking-tight">{item.title}</h3>
        <p className="text-green-500/80 text-xs font-light mb-3">{item.client}</p>
        <p className="text-gray-600 text-xs font-light leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
};

// ── Video Hero ────────────────────────────────────────────
const showreelVideos = [
  { src: '/videos/showreel-1.mp4', label: 'Showreel 01' },
  { src: '/videos/showreel-2.mp4', label: 'Showreel 02' },
  { src: '/videos/showreel-3.mp4', label: 'Showreel 03' },
];

const VideoHero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const goTo = useCallback((idx: number) => {
    const prev = videoRefs.current[current];
    if (prev) { prev.pause(); prev.currentTime = 0; }
    setCurrent(idx);
  }, [current]);

  const prev = () => goTo((current - 1 + showreelVideos.length) % showreelVideos.length);
  const next = () => goTo((current + 1) % showreelVideos.length);

  useEffect(() => {
    const vid = videoRefs.current[current];
    if (!vid) return;
    vid.muted = muted;
    vid.play().catch(() => {});
  }, [current, muted]);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => { if (v) v.muted = muted; if (i === current && v) v.play().catch(() => {}); });
  }, [muted, current]);

  return (
    <div className="relative w-full bg-black overflow-hidden" style={{ height: '100vh', maxHeight: '900px', minHeight: '500px' }}>
      {showreelVideos.map((v, i) => (
        <video
          key={v.src}
          ref={el => { videoRefs.current[i] = el; }}
          src={v.src}
          loop
          playsInline
          muted={muted}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        />
      ))}

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />

      {/* Top label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <div className="w-8 h-px bg-green-400/60" />
        <span className="text-green-400/80 text-xs tracking-[0.4em] uppercase font-light">Our Showreel</span>
        <div className="w-8 h-px bg-green-400/60" />
      </div>

      {/* Center title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        <h2 className="text-white text-6xl md:text-8xl font-extralight tracking-tight leading-none">
          Our <span className="italic text-green-400">Work</span>
        </h2>
        <p className="text-white/40 text-sm font-light tracking-widest uppercase mt-4">
          {showreelVideos[current].label}
        </p>
      </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
      >
        <ChevronLeft size={22} strokeWidth={1.5} />
      </button>
      <button
        onClick={next}
        className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
      >
        <ChevronRight size={22} strokeWidth={1.5} />
      </button>

      {/* Mute toggle */}
      <button
        onClick={() => setMuted(m => !m)}
        className="absolute bottom-8 right-6 md:right-10 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all duration-300"
      >
        {muted ? <VolumeX size={16} strokeWidth={1.5} /> : <Volume2 size={16} strokeWidth={1.5} />}
      </button>

      {/* Dot indicators + counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="flex gap-2.5">
          {showreelVideos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-400 ${i === current ? 'w-7 h-1.5 bg-green-400' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'}`}
            />
          ))}
        </div>
        <span className="text-white/30 text-xs font-light tracking-widest">
          {String(current + 1).padStart(2, '0')} / {String(showreelVideos.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

// ── Data ─────────────────────────────────────────────────
const portfolioItems: PortfolioItem[] = [
  { id: 12, title: 'Red Bull "Crazier Than Reality" Campaign', client: 'Red Bull', category: 'creative', featured: true, images: ['/Redbull Campaign/Redbull1.png', '/Redbull Campaign/Redbull2.png', '/Redbull Campaign/Redbull3.png', '/Redbull Campaign/Redbull4.png', '/Redbull Campaign/Redbull5.png'], description: '"If you see something crazier than reality, it\'s either AI or Red Bull." A globally featured campaign pairing jaw-dropping extreme sports photography with the brand\'s iconic irreverence.' },
  { id: 8,  title: 'Volkswagen Precision Campaign', client: 'Volkswagen', category: 'print', featured: true, images: ['/Wolkswagon Precision Campaign/1.png', '/Wolkswagon Precision Campaign/2.png', '/Wolkswagon Precision Campaign/3.png'], description: "A precision-led print campaign placing the VW badge against the world's most enduring structures, the Parthenon, the Great Pyramid, and Incan stonework, to communicate engineering that stands the test of time." },
  { id: 7,  title: 'AlBaik Saudi Founding Day Campaign', client: 'AlBaik', category: 'creative', featured: true, images: ['/Super Crisp with the name of AlBaik Campaign/Untitled-1.png', '/Super Crisp with the name of AlBaik Campaign/Untitled-1_copy.png', '/Super Crisp with the name of AlBaik Campaign/Book.png', '/Super Crisp with the name of AlBaik Campaign/horse.png', '/Super Crisp with the name of AlBaik Campaign/shop.png'], description: 'AlBaik Saudi Founding Day campaign featuring outdoor murals, heritage street placements, and bold cultural visual identity.' },
  { id: 1,  title: 'Almarai Saudi National Day Campaign', client: 'Almarai', category: 'creative', featured: true, images: ['/Almarai Saudi National Day Campaign/1.webp', '/Almarai Saudi National Day Campaign/2.webp', '/Almarai Saudi National Day Campaign/3.webp', '/Almarai Saudi National Day Campaign/4.webp', '/Almarai Saudi National Day Campaign/5.webp'], description: 'Saudi National Day campaign featuring traditional cultural elements, heritage murals, and Times Square billboard.' },
  { id: 2,  title: 'Super Crisp Mixed Campaigns', client: 'Super Crisp', category: 'creative', images: ['/Super Crisp Mixed Campaigns/1.webp', '/Super Crisp Mixed Campaigns/2.webp', '/Super Crisp Mixed Campaigns/3.webp', '/Super Crisp Mixed Campaigns/4.webp'], description: 'Multi-campaign portfolio including cricket sports marketing, seasonal celebrations, and 43-year anniversary.' },
  { id: 3,  title: 'Volvo Electric Vehicle Launch', client: 'Volvo, Saudi Arabia and Russia', category: 'creative', images: ['/1.webp', '/2.webp', '/3.webp', '/4.webp', '/5.webp', '/russian.png', '/russian copy.png'], description: 'Multi-market EV launch campaign for Saudi Arabia and Russia with dramatic cityscape billboard executions.' },
  { id: 4,  title: 'Emirates Comfort Campaign', client: 'Emirates Airlines', category: 'creative', images: ['/Gemini_Generated_Image_ixm98sixm98sixm9 copy copy copy.png', '/Gemini_Generated_Image_ixm98sixm98sixm9 copy copy.png', '/Gemini_Generated_Image_ixm98sixm98sixm9 copy.png', '/Gemini_Generated_Image_ixm98sixm98sixm9.png'], description: 'German market airline comfort campaign showcasing premium travel experience.' },
  { id: 5,  title: 'Petromin Autocare Campaigns', client: 'Petromin Autocare', category: 'creative', images: ['/Toyota Brake Pads Campaign/1.webp', '/Toyota Brake Pads Campaign/2.webp', '/Toyota Brake Pads Campaign/3.webp', '/Toyota Brake Pads Campaign/4.webp', '/Toyota Brake Pads Campaign/5.webp'], description: 'Multilingual automotive service campaigns for Arabic and English markets featuring Toyota repair services.' },
  { id: 6,  title: 'Automotive Campaign', client: 'Yousuf Naghi Motors', category: 'creative', images: ['/Automotive Campaign/1.png', '/Automotive Campaign/2.png', '/Automotive Campaign/Final.png', '/Automotive Campaign/Final_Arabic.png'], description: 'Complete brand campaign for automotive market entry.' },
  { id: 10, title: 'Jaguar Rebrand Campaign', client: 'Jaguar', category: 'creative', images: ['/Jaguar Campaign/kv.png', '/Jaguar Campaign/kv_2.png', '/Jaguar Campaign/Kv_3.png', '/Jaguar Campaign/helmet.png', '/Jaguar Campaign/helmetw3.png', '/Jaguar Campaign/bag.png', '/Jaguar Campaign/Comparison.png', '/Jaguar Campaign/Improved_logo.png', '/Jaguar Campaign/Jaguar_logo.png', '/Jaguar Campaign/Label.png', '/Jaguar Campaign/logo_2.png'], description: 'Comprehensive Jaguar rebrand concept with custom logo redesign, electric vehicle campaign visuals, branded merchandise mockups including helmets and bags, and futuristic key visual compositions.' },
  { id: 9,  title: 'Intel Inside Campaign', client: 'Intel', category: 'creative', images: ['/Intel Campaign/1.png', '/Intel Campaign/2.png', '/Intel Campaign/3.png', '/Intel Campaign/4.png'], description: 'Humorous "Without Intel Inside" concept campaign revealing the human effort hidden behind everyday smart machines: ATMs, vending machines, recycling kiosks, and coffee dispensers.' },
  { id: 11, title: 'JazzCash Brand Campaign', client: 'JazzCash', category: 'creative', images: ['/Jazz Cash Campaign/Accessibility.png', '/Jazz Cash Campaign/Arrow.png', '/Jazz Cash Campaign/Bag.png', '/Jazz Cash Campaign/Cash_Flow.png', '/Jazz Cash Campaign/Convenience.png', '/Jazz Cash Campaign/Credit_Card.png', '/Jazz Cash Campaign/Envelope.png', '/Jazz Cash Campaign/innovation.png', '/Jazz Cash Campaign/Letter_C_and_J.png', '/Jazz Cash Campaign/Logo.png', '/Jazz Cash Campaign/Mockup.png', '/Jazz Cash Campaign/Post_1.png', '/Jazz Cash Campaign/Post_design_white.png', '/Jazz Cash Campaign/Shirt.png'], description: 'Full brand identity and campaign for JazzCash, including logo design, social media posts, OOH mockups, and branded merchandise such as T-shirts, tote bags, credit cards, and envelope stationery.' },
];

const filters = [
  { id: 'all',      label: 'All Work' },
  { id: 'creative', label: 'Creative' },
  { id: 'print',    label: 'Print' },
  { id: 'pos',      label: 'POS' },
];

// ── Page ─────────────────────────────────────────────────
const Portfolio: React.FC = () => {
  const [active, setActive] = useState('all');
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);
  const heading = useReveal();
  const grid = useReveal(0.04);

  const filtered = active === 'all' ? portfolioItems : portfolioItems.filter(i => i.category === active);

  return (
    <section id="portfolio" className="bg-black overflow-hidden">
      {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}

      {/* Full-bleed video showreel */}
      <VideoHero />

      <div className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div
          ref={heading.ref}
          className={`text-center mb-16 transition-all duration-1000 ${heading.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <p className="text-green-400 text-xs tracking-[0.4em] uppercase mb-4 font-light">Selected Work</p>
          <h2 className="text-5xl md:text-7xl font-extralight text-white mb-6 tracking-tight">
            Our <span className="italic text-green-400">Portfolio</span>
          </h2>
          <div className="w-12 h-px bg-green-500 mx-auto mb-8" />
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Campaigns, print materials, and POS solutions spanning 4 sub-continents.
          </p>
        </div>

        {/* Filters */}
        <div className={`flex flex-wrap justify-center gap-3 mb-14 transition-all duration-1000 delay-200 ${heading.visible ? 'opacity-100' : 'opacity-0'}`}>
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`px-7 py-2.5 rounded-full text-sm font-light tracking-widest uppercase transition-all duration-400 ${
                active === f.id
                  ? 'bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                  : 'border border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={grid.ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((item, i) => (
            <PortfolioCard
              key={item.id}
              item={item}
              delay={i * 60}
              visible={grid.visible}
              onOpen={() => setLightbox(item)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-600 ${grid.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block border border-white/5 rounded-3xl p-8 md:p-12 max-w-2xl w-full">
            <h3 className="text-3xl font-extralight text-white mb-3 tracking-tight">View Complete Portfolios</h3>
            <p className="text-gray-600 mb-8 font-light text-sm">Explore our full creative and print collections</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://heyzine.com/flip-book/78082d7c30.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 justify-center bg-green-500 hover:bg-green-400 text-black px-8 py-3.5 rounded-full font-light text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105"
              >
                Creative Portfolio
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://heyzine.com/flip-book/e74033d778.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 justify-center border border-white/15 text-gray-400 hover:border-white/40 hover:text-white px-8 py-3.5 rounded-full font-light text-sm tracking-widest uppercase transition-all duration-300"
              >
                Print &amp; POS Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider" />
    </section>
  );
};

export default Portfolio;
