import React, { useEffect, useRef, useState } from 'react';
import { Globe, Languages, Users, Target, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from '../router';
import { useContent } from '../content/ContentContext';
import SmartImage from './SmartImage';

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

const pillars = [
  { icon: Globe,     title: 'Global Reach',      desc: '4 Sub-continents coverage' },
  { icon: Languages, title: '10+ Languages',     desc: 'English, Arabic, Urdu, Hindi, German, Russian & more' },
  { icon: Users,     title: 'Cultural Insight',  desc: 'Deep local market expertise' },
  { icon: Target,    title: 'Precision',         desc: 'Culturally accurate messaging' },
];

const MultilingualWork: React.FC = () => {
  const { navigate } = useRouter();
  const { content } = useContent();
  const campaigns = content.multilingual.slides;
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [animating, setAnimating] = useState(false);
  const heading = useReveal();
  const grid = useReveal();
  const bottom = useReveal();

  const go = (dir: 'left' | 'right') => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setIdx(prev => dir === 'right' ? (prev + 1) % campaigns.length : (prev - 1 + campaigns.length) % campaigns.length);
      setAnimating(false);
    }, 350);
  };

  useEffect(() => {
    if (campaigns.length <= 1) return;
    const interval = setInterval(() => go('right'), 4500);
    return () => clearInterval(interval);
  }, [animating, campaigns.length]);

  if (campaigns.length === 0) return null;
  const safeIdx = idx % campaigns.length;
  const current = campaigns[safeIdx];

  return (
    <section id="multilingual" className="bg-gray-950 overflow-hidden">
      <div className="section-divider" />

      <div className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div
          ref={heading.ref}
          className={`text-center mb-20 transition-all duration-1000 ${heading.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <p className="text-green-400 text-xs tracking-[0.4em] uppercase mb-4 font-light">Across Cultures</p>
          <h2 className="text-5xl md:text-7xl font-extralight text-white mb-6 tracking-tight">
            Multilingual <span className="italic text-green-400">Excellence</span>
          </h2>
          <div className="w-12 h-px bg-green-500 mx-auto mb-8" />
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            Expert in 10+ languages, crafting compelling campaigns across cultures
            with specialized expertise across our 4 sub-continents.
          </p>
        </div>

        {/* Two-col */}
        <div ref={grid.ref} className="grid lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Left */}
          <div className={`transition-all duration-1000 ${grid.visible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h3 className="text-4xl font-extralight text-white mb-6 tracking-tight">Cultural Adaptation</h3>
            <div className="w-10 h-px bg-green-500 mb-8" />
            <p className="text-gray-400 mb-10 leading-relaxed font-light text-lg">
              Our multilingual capabilities span 10+ languages including English, Arabic, Urdu, Hindi,
              German, Russian, French, Spanish, Chinese, and Japanese, ensuring your message resonates
              authentically with every audience.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  style={{ transitionDelay: grid.visible ? `${i * 80}ms` : '0ms' }}
                  className={`group bg-white/3 border border-white/5 rounded-2xl p-5
                    hover:bg-white/8 hover:border-green-500/30 transition-all duration-500
                    ${grid.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <p.icon className="w-7 h-7 text-green-400 mb-3 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                  <div className="text-sm font-light text-white mb-1">{p.title}</div>
                  <div className="text-xs text-gray-500 font-light leading-relaxed">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image carousel */}
          <div className={`relative transition-all duration-1000 delay-300 ${grid.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-gray-900">
              {/* Language badge */}
              <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-light border border-white/10">
                {current.lang}
              </div>

              {/* Image */}
              <div
                style={{
                  opacity: animating ? 0 : 1,
                  transform: animating ? `translateX(${direction === 'right' ? '-40px' : '40px'})` : 'translateX(0)',
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                }}
                className="absolute inset-0"
              >
                <SmartImage src={current.src} alt={current.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <div className="text-white font-light text-lg mb-1">{current.title}</div>
                <div className="text-gray-400 text-xs tracking-wide font-light">{current.market}</div>
              </div>

              {/* Nav arrows */}
              <button onClick={() => go('left')}  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-green-500 hover:border-green-500 transition-all duration-300">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => go('right')} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-green-500 hover:border-green-500 transition-all duration-300">
                <ChevronRight size={16} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {campaigns.map((_, i) => (
                  <button key={i} onClick={() => { setDirection('right'); setIdx(i); }} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === safeIdx ? 'bg-green-400 scale-125' : 'bg-white/30'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom expertise strip */}
        <div
          ref={bottom.ref}
          className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 ${bottom.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          {[
            { icon: Languages, title: 'Arabic Excellence',  desc: 'Expert in Arabic, Urdu, Hindi copywriting and design for Middle Eastern, South Asian, and Saudi markets.' },
            { icon: Globe,     title: 'Global Standards',   desc: 'International quality in 10+ languages including German, Russian, French, and Spanish with local cultural sensitivity.' },
            { icon: Target,    title: 'Market Precision',   desc: 'Targeted multilingual messaging across English, Arabic, Urdu, Hindi, German, Russian markets and beyond.' },
          ].map((item, i) => (
            <div
              key={i}
              style={{ transitionDelay: bottom.visible ? `${i * 100}ms` : '0ms' }}
              className={`group bg-white/3 border border-white/5 rounded-2xl p-8 text-center hover:border-green-500/20 hover:bg-white/6 transition-all duration-500
                ${bottom.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <div className="w-14 h-14 bg-white/5 group-hover:bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-400 group-hover:scale-110">
                <item.icon className="w-7 h-7 text-green-400 group-hover:text-black transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-light text-white mb-3">{item.title}</h4>
              <p className="text-gray-500 text-sm font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className={`text-center mt-14 transition-all duration-1000 delay-500 ${bottom.visible ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={() => navigate('portfolio')}
            className="border border-green-500/40 text-green-400 hover:bg-green-500 hover:text-black px-10 py-4 rounded-full font-light text-sm tracking-widest uppercase transition-all duration-500 hover:scale-105"
          >
            View More Work
          </button>
        </div>
      </div>

      <div className="section-divider" />
    </section>
  );
};

export default MultilingualWork;
