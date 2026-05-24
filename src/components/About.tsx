import React, { useEffect, useRef, useState } from 'react';
import { Globe, Users, Trophy, Target, ArrowRight } from 'lucide-react';
import { useRouter } from '../router';
import { useContent } from '../content/ContentContext';
import SmartImage from './SmartImage';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const stat = [
  { icon: Globe, label: 'Sub-Continents', value: '4', suffix: '' },
  { icon: Users, label: 'Happy Clients', value: '150', suffix: '+' },
  { icon: Trophy, label: 'Awards Won', value: '25', suffix: '+' },
  { icon: Target, label: 'Campaigns', value: '500', suffix: '+' },
];

const About: React.FC = () => {
  const { navigate } = useRouter();
  const { content } = useContent();
  const hero = useReveal();
  const grid = useReveal();
  const stats = useReveal();

  return (
    <section id="about" className="bg-white overflow-hidden">
      {/* Top accent bar */}
      <div className="section-divider" />

      <div className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div
          ref={hero.ref}
          className={`text-center mb-24 transition-all duration-1000 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <p className="text-green-500 text-xs tracking-[0.4em] uppercase mb-4 font-light">Our Story</p>
          <h2 className="text-5xl md:text-7xl font-extralight text-gray-900 mb-6 tracking-tight leading-tight">
            About <span className="italic text-green-500">The Link</span>
          </h2>
          <div className="w-12 h-px bg-green-500 mx-auto mb-8" />
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            A global creative and technology agency spanning 4 sub-continents, rooted in the Middle East &amp; Saudi Arabia,
            building brands and autonomous systems that compound results.
          </p>
        </div>

        {/* Two-col */}
        <div
          ref={grid.ref}
          className="grid md:grid-cols-2 gap-16 items-start mb-24"
        >
          <div className={`space-y-6 transition-all duration-1000 delay-100 ${grid.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
            <h3 className="text-4xl font-extralight text-gray-900 tracking-tight">10 Years of<br />Creative &amp; Tech Excellence</h3>
            <div className="w-10 h-px bg-green-500" />
            <p className="text-gray-500 leading-relaxed font-light text-lg">
              Founded to connect brands with their audiences through the power of both creativity and technology,
              The Link has grown from a regional startup to a global creative and tech agency across four sub-continents.
            </p>
            <p className="text-gray-500 leading-relaxed font-light text-lg">
              We build award-winning campaigns, brand identities, and autonomous AI systems, combining
              deep cultural insight with cutting-edge technology to deliver work that doesn't just look great
              but performs relentlessly.
            </p>
            <button
              onClick={() => navigate('portfolio')}
              className="inline-flex items-center gap-2 text-green-600 font-light text-sm tracking-widest uppercase hover:gap-4 transition-all duration-300 group mt-4"
            >
              See Our Work
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${grid.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
            <div className="relative">
              {/* Card stack effect */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 bg-green-500/10 rounded-3xl" />
              <div className="absolute inset-0 translate-x-2 translate-y-2 bg-green-500/5 rounded-3xl" />
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-10 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="text-green-400 text-xs tracking-[0.4em] uppercase mb-6 font-light">Mission & Vision</div>
                  <h4 className="text-2xl font-extralight mb-4 tracking-tight">Our Mission</h4>
                  <p className="text-gray-400 mb-8 font-light leading-relaxed text-sm">
                    To be the link between brands and their audiences across 4 sub-continents,
                    delivering creative campaigns and intelligent technology systems that drive growth and build lasting competitive advantages.
                  </p>
                  <div className="h-px bg-white/10 mb-8" />
                  <h4 className="text-2xl font-extralight mb-4 tracking-tight">Our Vision</h4>
                  <p className="text-gray-400 font-light leading-relaxed text-sm">
                    To become the leading global creative and technology agency, known for marrying brand storytelling with autonomous systems,
                    rooted in the Middle East and operating at a world-class standard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* CEO Message: full bleed */}
      <div className={`relative bg-gray-950 overflow-hidden transition-all duration-1000 delay-200 ${grid.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        {/* subtle green accent glow top-right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-0 items-stretch min-h-[680px]">

            {/* Photo: sits flush left, no fade, clear silhouette */}
            <div className="relative flex items-end justify-center md:justify-start order-2 md:order-1 pt-16 md:pt-0">
              {/* Subtle floor shadow so figure has ground */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-black/40 blur-2xl rounded-full" />
              <SmartImage
                src={content.about.ceoPhoto.src}
                alt={content.about.ceoPhoto.alt || 'CEO'}
                className="relative z-10 w-full max-w-sm md:max-w-none md:w-auto md:h-full object-contain object-bottom"
                style={{ maxHeight: '680px' }}
              />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center py-16 md:py-20 md:pl-16 order-1 md:order-2">
              <p className="text-green-400 text-xs tracking-[0.4em] uppercase mb-8 font-light">From The CEO</p>

              <blockquote className="space-y-5 mb-10">
                <p className="text-white font-light leading-relaxed text-xl md:text-2xl italic">
                  "For years, creativity and technology lived in separate rooms. One made you feel something. The other made things work. I built The Link to tear down that wall."
                </p>
                <p className="text-gray-400 font-light leading-relaxed">
                  Today, the brands that win aren't choosing between a beautiful idea and an intelligent system. They're demanding both. A story that moves people, and an engine that never stops working behind it. That's the space we own.
                </p>
                <p className="text-gray-400 font-light leading-relaxed">
                  We don't sell campaigns or code. We build advantages: brand worlds that command attention and autonomous systems that compound while you sleep. From luxury houses in Europe to ambitious challengers across the Middle East and South Asia, the mandate is always the same: make it unforgettable, and make it work.
                </p>
                <p className="text-gray-300 font-light leading-relaxed">
                  The next decade belongs to those who can imagine boldly and execute relentlessly. We're here to do both, for the few who refuse to settle.
                </p>
              </blockquote>

              <div className="flex items-center gap-5">
                <div className="w-10 h-px bg-green-500 shrink-0" />
                <div>
                  <p className="text-white font-light text-lg tracking-wide">Syed Ahmed Ul Hassan</p>
                  <p className="text-green-400 text-xs tracking-[0.3em] uppercase font-light mt-1">CEO & Global Tech & Creative Head</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden">
      <div className="py-28 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-0" />

        {/* Stats */}
        <div
          ref={stats.ref}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 stagger transition-all duration-1000 ${stats.visible ? 'opacity-100' : 'opacity-0'}`}
        >
          {stat.map((s, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`group relative overflow-hidden bg-white border border-gray-100 rounded-2xl p-8 text-center cursor-default
                hover:border-green-500/30 hover:shadow-2xl transition-all duration-500
                ${stats.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-50 group-hover:to-white transition-all duration-500" />
              <div className="relative z-10">
                <s.icon className="w-8 h-8 text-green-500/60 group-hover:text-green-500 mx-auto mb-4 transition-colors duration-300" strokeWidth={1.5} />
                <div className="text-4xl md:text-5xl font-extralight text-gray-900 mb-2 tracking-tight">
                  {s.value}<span className="text-green-500">{s.suffix}</span>
                </div>
                <div className="text-gray-400 font-light text-sm tracking-wide">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      <div className="section-divider" />
    </section>
  );
};

export default About;
