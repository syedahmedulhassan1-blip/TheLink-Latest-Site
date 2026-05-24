import React, { useEffect, useRef, useState } from 'react';
import { Palette, Video, Sparkles, Code, TrendingUp, PenTool, Users, Clock, DollarSign, Globe, ArrowRight } from 'lucide-react';
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

const creativeTypes = [
  { icon: Palette,     title: 'Designers',              count: '800+' },
  { icon: Video,       title: 'Video Editors',           count: '400+' },
  { icon: Sparkles,    title: 'Animators',               count: '350+' },
  { icon: Code,        title: 'Developers',              count: '600+' },
  { icon: TrendingUp,  title: 'Marketing Specialists',   count: '500+' },
  { icon: PenTool,     title: 'Content Creators',        count: '450+' },
];

const benefits = [
  { icon: Users,      title: 'Managed Teams',      description: 'Fully vetted professionals ready to deliver from day one' },
  { icon: TrendingUp, title: 'Scalable Workforce',  description: 'Scale up or down seamlessly based on project needs' },
  { icon: DollarSign, title: 'Cost Effective',      description: 'Premium talent without the overhead costs of hiring' },
  { icon: Clock,      title: 'Timezone Aligned',    description: 'Work seamlessly with creatives in your timezone' },
];

const RentACreative: React.FC = () => {
  const { navigate } = useRouter();
  const heading = useReveal();
  const types = useReveal(0.05);
  const bens = useReveal(0.1);
  const cta = useReveal(0.1);
  const [activeType, setActiveType] = useState<number | null>(null);

  return (
    <section id="rent-creative" className="bg-white overflow-hidden">
      <div className="section-divider" />

      <div className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div
          ref={heading.ref}
          className={`text-center mb-20 transition-all duration-1000 ${heading.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <span className="inline-block bg-green-500 text-black text-xs font-light tracking-[0.3em] uppercase px-5 py-2 rounded-full mb-6">
            New Service
          </span>
          <h2 className="text-5xl md:text-7xl font-extralight text-gray-900 mb-6 tracking-tight leading-tight">
            Rent a Creative<br />
            <span className="italic text-green-500">In Your Timezone</span>
          </h2>
          <div className="w-12 h-px bg-green-500 mx-auto mb-8" />
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            Access <span className="text-green-600 font-normal">3,000+</span> vetted creatives across the globe,
            ready to elevate your projects at any scale.
          </p>
        </div>

        {/* Creative types */}
        <div ref={types.ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {creativeTypes.map((c, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveType(i)}
              onMouseLeave={() => setActiveType(null)}
              style={{ transitionDelay: types.visible ? `${i * 60}ms` : '0ms' }}
              className={`group relative bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center cursor-default
                hover:border-green-500/30 hover:shadow-xl transition-all duration-500
                ${types.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${activeType === i ? 'opacity-100' : 'opacity-0'} bg-gradient-to-b from-green-50 to-white`} />
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-400 ${activeType === i ? 'bg-green-500 scale-110' : 'bg-white'}`}>
                  <c.icon className={`w-7 h-7 transition-colors duration-300 ${activeType === i ? 'text-black' : 'text-gray-500'}`} strokeWidth={1.5} />
                </div>
                <div className="text-xs font-light text-gray-600 mb-1">{c.title}</div>
                <div className="text-lg font-extralight text-green-600">{c.count}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div
          ref={bens.ref}
          className={`bg-gray-950 rounded-3xl p-10 md:p-14 mb-16 transition-all duration-1000 ${bens.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <h3 className="text-3xl md:text-4xl font-extralight text-white mb-12 text-center tracking-tight">
            Why Choose Our <span className="italic text-green-400">Creative Network</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <div
                key={i}
                style={{ transitionDelay: bens.visible ? `${i * 100}ms` : '0ms' }}
                className={`group text-center transition-all duration-700 ${bens.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-green-500 flex items-center justify-center mx-auto mb-6 transition-all duration-400 group-hover:scale-110">
                  <b.icon className="w-7 h-7 text-green-400 group-hover:text-black transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h4 className="text-base font-light text-white mb-3">{b.title}</h4>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          ref={cta.ref}
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 to-green-700 p-12 md:p-16 text-center transition-all duration-1000 ${cta.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          {/* Decorative orbs */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-black/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <Globe className="w-12 h-12 text-white/60 mx-auto mb-6 animate-float" strokeWidth={1} />
            <h3 className="text-4xl md:text-5xl font-extralight text-white mb-6 tracking-tight">
              Ready to Build Your <span className="italic">Dream Team?</span>
            </h3>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Connect with expert creatives who understand your vision and work in your timezone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('contact')}
                className="group bg-black text-white px-10 py-4 rounded-full font-light text-sm tracking-widest uppercase hover:bg-gray-900 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 justify-center"
              >
                Hire Talent Now
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => navigate('contact')}
                className="border-2 border-white/40 hover:border-white text-white px-10 py-4 rounded-full font-light text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105"
              >
                Learn More
              </button>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-10 text-white">
              {[['3,000+', 'Creatives'], ['24/7', 'Availability'], ['Global', 'Coverage']].map(([val, lbl]) => (
                <div key={lbl} className="text-center">
                  <div className="text-3xl md:text-4xl font-extralight mb-1">{val}</div>
                  <div className="text-xs text-white/60 tracking-widest uppercase">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider" />
    </section>
  );
};

export default RentACreative;
