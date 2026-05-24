import React, { useRef, useState, useEffect } from 'react';
import { Quote, ArrowRight } from 'lucide-react';
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

const clients = ['Netflix','Toyota','Nestle','Emirates','Visa','Petromin','Auto Care','Express','NCMC','paklaunch.com','GovaciTravels','National','GADITEK','JHGURS','ABTECH','Zeeko','KFC','BOLT','Siena','BOLD','ABACUS','ARY Family','ARENA Multimedia','UrbanxRural','zameen.com'];

const testimonials = [
  { quote: "The Link Agency transformed our brand presence across the Middle East. Their deep understanding of regional culture combined with international standards delivered exceptional results.", author: "Marketing Director", role: "Saudi Automotive Brand", project: "Brand Campaign Launch" },
  { quote: "Outstanding creative work and professional execution. They managed our complete rebranding project across multiple sub-continents seamlessly, with particular excellence in our Middle Eastern markets.", author: "CEO", role: "Regional Retail Chain", project: "Complete Brand Identity" },
  { quote: "Their POS materials significantly improved our in-store sales across our Saudi and UAE locations. The cultural adaptation and attention to detail exceeded our expectations.", author: "Operations Manager", role: "MENA Electronics Company", project: "Point of Sale Campaign" },
];

const Clients: React.FC = () => {
  const { navigate } = useRouter();
  const heading = useReveal();
  const ticker = useReveal();
  const tms = useReveal();
  const cta = useReveal();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="clients" className="bg-white overflow-hidden">
      <div className="section-divider" />

      <div className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div
          ref={heading.ref}
          className={`text-center mb-20 transition-all duration-1000 ${heading.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <p className="text-green-500 text-xs tracking-[0.4em] uppercase mb-4 font-light">Our Clients</p>
          <h2 className="text-5xl md:text-7xl font-extralight text-gray-900 mb-6 tracking-tight">
            Trusted <span className="italic text-green-500">Partners</span>
          </h2>
          <div className="w-12 h-px bg-green-500 mx-auto mb-8" />
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            Proud to work with leading brands across 4 sub-continents, delivering results that exceed expectations.
          </p>
        </div>

        {/* Marquee */}
        <div
          ref={ticker.ref}
          className={`mb-20 transition-all duration-1000 ${ticker.visible ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Row 1 */}
          <div className="relative overflow-hidden py-4 mb-3">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
            <div className="flex animate-marquee">
              {[...clients, ...clients].map((c, i) => (
                <div key={i} className="flex-shrink-0 mx-4 px-6 py-3 bg-gray-50 border border-gray-100 rounded-xl hover:border-green-500/30 hover:bg-green-50 transition-all duration-300 cursor-default">
                  <span className="text-gray-700 font-light text-sm whitespace-nowrap">{c}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Row 2 reversed */}
          <div className="relative overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
            <div className="flex animate-marquee-reverse">
              {[...clients.slice().reverse(), ...clients.slice().reverse()].map((c, i) => (
                <div key={i} className="flex-shrink-0 mx-4 px-6 py-3 bg-gray-50 border border-gray-100 rounded-xl hover:border-green-500/30 hover:bg-green-50 transition-all duration-300 cursor-default">
                  <span className="text-gray-700 font-light text-sm whitespace-nowrap">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div ref={tms.ref} className={`transition-all duration-1000 ${tms.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h3 className="text-3xl font-extralight text-center text-gray-900 mb-12 tracking-tight">
            What Our <span className="italic text-green-500">Clients Say</span>
          </h3>

          {/* Featured testimonial */}
          <div className="relative max-w-4xl mx-auto mb-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${i === activeTestimonial ? 'opacity-100 translate-y-0' : 'absolute inset-0 opacity-0 translate-y-4 pointer-events-none'}`}
              >
                <div className="bg-white border border-gray-100 rounded-3xl p-10 md:p-14 text-center shadow-sm hover:shadow-xl transition-shadow duration-500">
                  <Quote className="w-10 h-10 text-green-500/20 mx-auto mb-6" strokeWidth={1} />
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light mb-8 max-w-3xl mx-auto">
                    "{t.quote}"
                  </p>
                  <div className="inline-flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-light">
                      {t.author[0]}
                    </div>
                    <div className="text-left">
                      <div className="text-gray-900 font-light text-sm">{t.author}</div>
                      <div className="text-gray-400 text-xs font-light">{t.role}</div>
                    </div>
                    <div className="ml-4 pl-4 border-l border-gray-100">
                      <div className="text-green-600 text-xs font-light">{t.project}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mb-16">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'bg-green-500 scale-125' : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div
          ref={cta.ref}
          className={`relative overflow-hidden rounded-3xl bg-gray-950 p-12 md:p-16 text-center transition-all duration-1000 ${cta.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-green-500/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-extralight text-white mb-4 tracking-tight">
              Ready to Join Our <span className="italic text-green-400">Success Stories?</span>
            </h3>
            <p className="text-xl text-gray-500 mb-10 font-light max-w-2xl mx-auto">
              Let's discuss how we can help your brand achieve its goals.
            </p>
            <button
              onClick={() => navigate('contact')}
              className="group inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-10 py-4 rounded-full font-light text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
            >
              Start Your Project
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      <div className="section-divider" />
    </section>
  );
};

export default Clients;
