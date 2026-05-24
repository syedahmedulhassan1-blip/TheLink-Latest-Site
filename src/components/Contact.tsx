import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';

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

const offices = [
  { label: 'South Asia Office', phone: '+92 304 223 9907', flag: '🇵🇰' },
  { label: 'Middle East Office', phone: '+971 50 726 4698', flag: '🇦🇪' },
  { label: 'Saudi Arabia Office', phone: 'Expanding Soon', flag: '🇸🇦' },
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', location: 'south-asia', message: '' });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const heading = useReveal();
  const content = useReveal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', subject: '', location: 'south-asia', message: '' });
    }, 4000);
  };

  const inputClass = (field: string) =>
    `w-full bg-white/3 border rounded-xl px-5 py-4 text-white font-light text-sm placeholder-gray-600 outline-none transition-all duration-300 ${
      focused === field ? 'border-green-500/60 bg-white/6' : 'border-white/8 hover:border-white/15'
    }`;

  return (
    <section id="contact" className="bg-gray-950 overflow-hidden">
      <div className="section-divider" />

      <div className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div
          ref={heading.ref}
          className={`text-center mb-20 transition-all duration-1000 ${heading.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <p className="text-green-400 text-xs tracking-[0.4em] uppercase mb-4 font-light">Let's Talk</p>
          <h2 className="text-5xl md:text-7xl font-extralight text-white mb-6 tracking-tight">
            Get In <span className="italic text-green-400">Touch</span>
          </h2>
          <div className="w-12 h-px bg-green-500 mx-auto mb-8" />
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            Ready to start your next project? We're here to help across 4 sub-continents,
            with specialized expertise in Middle Eastern and Saudi markets.
          </p>
        </div>

        <div
          ref={content.ref}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Left */}
          <div className={`space-y-5 transition-all duration-1000 ${content.visible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h3 className="text-2xl font-extralight text-white mb-8 tracking-tight">Contact Information</h3>

            {offices.map((o, i) => (
              <div
                key={i}
                style={{ transitionDelay: content.visible ? `${i * 80}ms` : '0ms' }}
                className="group bg-white/3 border border-white/5 rounded-2xl p-5 hover:border-green-500/25 hover:bg-white/5 transition-all duration-500 flex items-center gap-4"
              >
                <div className="text-2xl">{o.flag}</div>
                <div>
                  <div className="text-white/80 text-sm font-light mb-1 flex items-center gap-2">
                    <MapPin size={12} className="text-green-400" strokeWidth={1.5} />
                    {o.label}
                  </div>
                  <div className="text-gray-500 text-xs font-light flex items-center gap-2">
                    <Phone size={10} className="text-green-400" strokeWidth={1.5} />
                    {o.phone}
                  </div>
                </div>
              </div>
            ))}

            <div className={`group bg-white/3 border border-white/5 rounded-2xl p-5 hover:border-green-500/25 hover:bg-white/5 transition-all duration-500 flex items-center gap-4 transition-all duration-700 ${content.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <Mail size={16} className="text-green-400" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-white/60 text-xs font-light mb-1">Email</div>
                <a href="mailto:contact@thelinkadvertizing.com" className="text-white/80 text-sm font-light hover:text-green-400 transition-colors duration-200">
                  contact@thelinkadvertizing.com
                </a>
              </div>
            </div>

            <div
              style={{ transitionDelay: '380ms' }}
              className={`relative overflow-hidden bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 transition-all duration-700 ${content.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-black/15 rounded-full" />
              <h4 className="text-xl font-extralight text-white mb-4 tracking-tight">Business Hours</h4>
              <div className="space-y-1.5 text-white/75 font-light text-sm">
                <div>Monday to Friday: 9:00 AM to 6:00 PM</div>
                <div>Saturday: 10:00 AM to 4:00 PM</div>
                <div className="text-white/40">Sunday: Closed</div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div
            style={{ transitionDelay: '150ms' }}
            className={`relative bg-white/3 border border-white/5 rounded-3xl p-8 md:p-10 transition-all duration-1000 ${content.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          >
            {sent ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-gray-950/95 backdrop-blur-sm z-10 gap-4">
                <CheckCircle className="w-16 h-16 text-green-400 animate-scaleIn" strokeWidth={1} />
                <h3 className="text-2xl font-extralight text-white tracking-tight">Message Sent!</h3>
                <p className="text-gray-500 font-light text-sm">We'll get back to you soon.</p>
              </div>
            ) : null}

            <h3 className="text-2xl font-extralight text-white mb-8 tracking-tight">Send Us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-gray-500 font-light tracking-widest uppercase mb-2">Your Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} placeholder="Enter your name" className={inputClass('name')} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-light tracking-widest uppercase mb-2">Email</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} placeholder="your@email.com" className={inputClass('email')} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-gray-500 font-light tracking-widest uppercase mb-2">Subject</label>
                  <input type="text" name="subject" required value={formData.subject} onChange={handleChange} onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)} placeholder="Project subject" className={inputClass('subject')} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-light tracking-widest uppercase mb-2">Region</label>
                  <select name="location" value={formData.location} onChange={handleChange} onFocus={() => setFocused('location')} onBlur={() => setFocused(null)} className={`${inputClass('location')} cursor-pointer`}>
                    <option value="south-asia" className="bg-gray-900">South Asia</option>
                    <option value="middle-east" className="bg-gray-900">Middle East</option>
                    <option value="saudi-arabia" className="bg-gray-900">Saudi Arabia</option>
                    <option value="global" className="bg-gray-900">Global Project</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 font-light tracking-widest uppercase mb-2">Message</label>
                <textarea name="message" required value={formData.message} onChange={handleChange} onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} rows={5} placeholder="Tell us about your project..." className={`${inputClass('message')} resize-none`} />
              </div>

              <button
                type="submit"
                className="group w-full bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-full font-light text-sm tracking-widest uppercase transition-all duration-400 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2"
              >
                <Send size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="section-divider" />
    </section>
  );
};

export default Contact;
