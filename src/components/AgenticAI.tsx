import React, { useEffect, useRef, useState } from 'react';
import { Bot, Building2, ShoppingCart, Truck, TrendingUp, Stethoscope, DollarSign, Zap, ArrowRight, Cpu, Activity, Globe as Globe2 } from 'lucide-react';
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

interface Deployment {
  icon: React.ElementType;
  name: string;
  client: string;
  location: string;
  result: string;
  metric: string;
  description: string;
  color: string;
}

const deployments: Deployment[] = [
  {
    icon: Building2,
    name: 'Partner Host Workspace',
    client: 'Naquist',
    location: 'Italy',
    result: '4x partnerships',
    metric: '70% less coordination',
    description: 'An agentic workspace that runs luxury partnerships on autopilot, drafting bespoke outreach, orchestrating host engagements, and surfacing the intelligence that turns relationships into revenue.',
    color: 'from-blue-500/20 to-blue-500/5',
  },
  {
    icon: Bot,
    name: 'AI CRM & Autonomous Receptionist',
    client: 'Sana Sarah',
    location: 'Pakistan',
    result: '100% inbound captured',
    metric: '38% more appointments',
    description: 'A front desk that never sleeps. Every call, every message, every appointment handled instantly and logged perfectly. Zero missed leads after hours.',
    color: 'from-green-500/20 to-green-500/5',
  },
  {
    icon: TrendingUp,
    name: 'Autonomous Sales Development Agent',
    client: 'Meridian Realty',
    location: 'UAE',
    result: '2.5x qualified meetings',
    metric: 'Pipeline in 48hrs vs 3 weeks',
    description: 'A tireless prospector that researches buyers, personalises outreach at scale, and nurtures every lead until it\'s sales-ready.',
    color: 'from-amber-500/20 to-amber-500/5',
  },
  {
    icon: Zap,
    name: 'Intelligent Procurement & Negotiation Agent',
    client: 'Falcon Industries',
    location: 'Saudi Arabia',
    result: '60% faster procurement',
    metric: '12% avg vendor savings',
    description: 'An agent that tracks supplier pricing, drafts RFQs, negotiates standard terms, and flags risk buried deep in contracts.',
    color: 'from-orange-500/20 to-orange-500/5',
  },
  {
    icon: Stethoscope,
    name: 'Clinical Intake & Patient Triage Assistant',
    client: 'Lumière Clinique',
    location: 'France',
    result: '80% less admin per patient',
    metric: '45% faster intake',
    description: 'A multilingual agent handling onboarding, pre-visit forms, insurance checks, and smart triage, in any language, at any hour.',
    color: 'from-teal-500/20 to-teal-500/5',
  },
  {
    icon: DollarSign,
    name: 'Financial Operations & Reconciliation Agent',
    client: 'Aster Capital',
    location: 'United Kingdom',
    result: '5 days → 4 hours month-end',
    metric: '99.8% reconciliation accuracy',
    description: 'An autonomous back office that reconciles transactions, catches discrepancies, and prepares audit-ready reporting without lifting a finger.',
    color: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    icon: ShoppingCart,
    name: 'E-Commerce Growth & Retention Agent',
    client: 'Bloom & Co.',
    location: 'Germany',
    result: '27% more repeat revenue',
    metric: '3.1x recovered cart ROI',
    description: 'A lifecycle engine that segments customers, builds campaigns, recovers abandoned carts, and personalises every touch, autonomously.',
    color: 'from-pink-500/20 to-pink-500/5',
  },
  {
    icon: Truck,
    name: 'Logistics & Fleet Coordination Agent',
    client: 'TransNova Logistics',
    location: 'Turkey',
    result: '22% lower fuel cost',
    metric: '35% fewer late deliveries',
    description: 'A dispatch brain that optimises routes in real time, predicts delays before they hit, and keeps drivers and clients in sync automatically.',
    color: 'from-cyan-500/20 to-cyan-500/5',
  },
  {
    icon: Globe2,
    name: 'Autonomous Lead Generation Engine',
    client: 'Vortex Media Group',
    location: 'United States',
    result: '3x qualified pipeline',
    metric: 'Our highest-performing deployment',
    description: 'A self-running growth machine that finds high-intent prospects, enriches and scores them live, then fires off personalised multi-touch outreach on its own.',
    color: 'from-red-500/20 to-red-500/5',
  },
];

const AgenticAI: React.FC = () => {
  const { navigate } = useRouter();
  const heading = useReveal();
  const poweredBy = useReveal(0.1);
  const grid = useReveal(0.04);
  const cta = useReveal(0.1);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="agentic-ai" className="bg-black overflow-hidden">
      <div className="section-divider" />

      <div className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div
          ref={heading.ref}
          className={`text-center mb-6 transition-all duration-1000 ${heading.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <p className="text-green-400 text-xs tracking-[0.4em] uppercase mb-4 font-light">Autonomous Digital Workers</p>
          <h2 className="text-5xl md:text-7xl font-extralight text-white mb-6 tracking-tight">
            Agentic <span className="italic text-green-400">AI Solutions</span>
          </h2>
          <div className="w-12 h-px bg-green-500 mx-auto mb-8" />
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-4">
            Stop hiring for tasks. Start deploying agents that crush them.
          </p>
          <p className="text-base text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Forget chatbots. Forget "AI features." We build autonomous digital workers that run your operations 24/7,
            make decisions, take action, and only tap a human when it actually matters. No coffee breaks. No after-hours gaps.
            No dropped balls. Just relentless, around-the-clock execution.
          </p>
        </div>

        {/* Powered-by strip */}
        <div
          ref={poweredBy.ref}
          className={`mt-12 mb-20 transition-all duration-1000 delay-200 ${poweredBy.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative rounded-2xl border border-white/8 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 p-8 md:p-10 overflow-hidden">
            {/* bg glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,197,94,0.08),transparent_60%)] pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Icon cluster */}
              <div className="flex-shrink-0 flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <Cpu className="w-7 h-7 text-green-400" strokeWidth={1.5} />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
                  <Activity className="w-7 h-7 text-gray-400" strokeWidth={1.5} />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
                  <Bot className="w-7 h-7 text-gray-400" strokeWidth={1.5} />
                </div>
              </div>

              <div className="text-center md:text-left">
                <p className="text-green-400 text-xs tracking-[0.35em] uppercase mb-2 font-light">Under The Hood</p>
                <p className="text-white text-lg md:text-xl font-light tracking-tight mb-2">
                  Our agentic models are powered by cutting-edge tools, keeping them high-performance while keeping them low-priced.
                </p>
                <p className="text-gray-500 text-sm font-light leading-relaxed">
                  We built custom agents from the ground up: purpose-engineered, fine-tuned for your industry, and wired directly into your stack. No off-the-shelf wrappers. No bloated subscriptions. Just pure operational leverage.
                </p>
              </div>

              {/* Pill tags */}
              <div className="flex-shrink-0 flex flex-wrap gap-2 justify-center md:justify-end">
                {['Custom-Built', 'Low-Latency', 'Scalable', '24/7 Active', 'Cost-Efficient'].map(tag => (
                  <span key={tag} className="text-[10px] px-3 py-1.5 rounded-full border border-green-500/20 text-green-400/70 tracking-widest uppercase font-light whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Deployments grid */}
        <p className={`text-center text-gray-500 text-sm tracking-widest uppercase font-light mb-10 transition-all duration-700 ${grid.visible ? 'opacity-100' : 'opacity-0'}`}>
          Here's what we've built for businesses that refused to settle for slow
        </p>

        <div ref={grid.ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {deployments.map((d, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ transitionDelay: grid.visible ? `${i * 55}ms` : '0ms' }}
              className={`group relative bg-gray-950 border border-white/5 rounded-2xl p-7 overflow-hidden cursor-default
                hover:border-white/12 transition-all duration-700
                ${grid.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              {/* gradient bg on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${d.color} transition-opacity duration-500 ${hovered === i ? 'opacity-100' : 'opacity-0'}`} />

              {/* Top bar animation */}
              <div className={`absolute top-0 left-0 h-px bg-green-500 transition-all duration-500 ${hovered === i ? 'w-full' : 'w-0'}`} />

              <div className="relative">
                {/* Icon + location */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-400 ${hovered === i ? 'bg-green-500 scale-110' : 'bg-white/5'}`}>
                    <d.icon className={`w-5 h-5 transition-colors duration-300 ${hovered === i ? 'text-black' : 'text-green-400'}`} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] text-gray-600 font-light tracking-wide bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    {d.client} · {d.location}
                  </span>
                </div>

                <h3 className="text-white font-light text-base mb-3 leading-snug tracking-tight">{d.name}</h3>
                <p className="text-gray-500 text-xs font-light leading-relaxed mb-5">{d.description}</p>

                {/* Result metrics */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    <span className="text-green-400 text-xs font-light">{d.result}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0" />
                    <span className="text-gray-500 text-xs font-light">{d.metric}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          ref={cta.ref}
          className={`mt-20 transition-all duration-1000 ${cta.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="relative rounded-3xl border border-white/8 overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(34,197,94,0.1),transparent_65%)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black pointer-events-none" />

            <div className="relative px-8 py-16 md:py-20 text-center">
              <p className="text-green-400 text-xs tracking-[0.4em] uppercase mb-5 font-light">Your competitors are still doing this by hand</p>
              <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6 tracking-tight max-w-3xl mx-auto leading-tight">
                Let's put agents<br />
                <span className="italic text-green-400">on your payroll.</span>
              </h3>
              <p className="text-gray-500 text-base font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                Every system here started as a bottleneck someone wrote off as "just the cost of doing business."
                It wasn't. If any part of your operation runs on repetition, waiting, or after-hours silence,
                there's an agent for that, and we'll build it.
              </p>
              <button
                onClick={() => navigate('contact')}
                className="group inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-black px-10 py-4 rounded-full font-light text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(34,197,94,0.35)]"
              >
                Let's Discuss Your Project
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className="section-divider" />
    </section>
  );
};

export default AgenticAI;
