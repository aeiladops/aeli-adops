'use client';

import { motion } from 'framer-motion';
import { BadgePrimary } from '@/src/components/shared/ui/badge';
import { fadeUp, staggerContainer } from '@/src/components/animation/motion-variants';

const ecosystemItems = [
  {
    category: 'Demand',
    color: 'from-blue-500 to-cyan-400',
    glow: 'group-hover:shadow-blue-500/30',
    borderColor: 'border-blue-500/20 group-hover:border-blue-500/50',
    icon: '🏦',
    title: 'DSPs & Demand Sources',
    items: ['Google DV360', 'The Trade Desk', 'Amazon DSP', 'Xandr (Microsoft)'],
  },
  {
    category: 'Ad Server',
    color: 'from-violet-500 to-purple-400',
    glow: 'group-hover:shadow-violet-500/30',
    borderColor: 'border-violet-500/20 group-hover:border-violet-500/50',
    icon: '⚙️',
    title: 'Ad Management Layer',
    items: ['Google Ad Manager', 'Prebid.js', 'Header Bidding', 'Floor Price Rules'],
  },
  {
    category: 'Supply',
    color: 'from-emerald-500 to-teal-400',
    glow: 'group-hover:shadow-emerald-500/30',
    borderColor: 'border-emerald-500/20 group-hover:border-emerald-500/50',
    icon: '🌐',
    title: 'Publisher Supply Stack',
    items: ['Web Inventory', 'Video Ads', 'Native Ads', 'AMP Pages'],
  },
  {
    category: 'Analytics',
    color: 'from-amber-500 to-orange-400',
    glow: 'group-hover:shadow-amber-500/30',
    borderColor: 'border-amber-500/20 group-hover:border-amber-500/50',
    icon: '📊',
    title: 'Data & Reporting',
    items: ['eCPM Tracking', 'Revenue Attribution', 'Fill Rate Reports', 'Viewability Metrics'],
  },
  {
    category: 'Operations',
    color: 'from-pink-500 to-rose-400',
    glow: 'group-hover:shadow-pink-500/30',
    borderColor: 'border-pink-500/20 group-hover:border-pink-500/50',
    icon: '🛠️',
    title: 'Ad Ops & Support',
    items: ['Tag Management', 'Trafficking', 'QA & Testing', '24/7 Technical Support'],
  },
  {
    category: 'Monetization',
    color: 'from-indigo-500 to-blue-400',
    glow: 'group-hover:shadow-indigo-500/30',
    borderColor: 'border-indigo-500/20 group-hover:border-indigo-500/50',
    icon: '💰',
    title: 'Revenue Optimization',
    items: ['Yield Optimization', 'CPM Maximization', 'Direct Deals', 'Programmatic PMPs'],
  },
];

const flowSteps = [
  { step: '01', label: 'Audit', desc: 'Publisher ad setup review', icon: '🔍' },
  { step: '02', label: 'Setup', desc: 'GAM & header bidding config', icon: '⚙️' },
  { step: '03', label: 'Optimize', desc: 'Floor prices & demand stack', icon: '📈' },
  { step: '04', label: 'Scale', desc: 'Revenue growth & reporting', icon: '🚀' },
];

const AdTechEcosystem = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.15)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(16,185,129,0.08)_0%,_transparent_60%)]" />

      {/* Animated grid dots */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="main-container relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-4 mb-16"
        >
          <motion.div variants={fadeUp}>
            <BadgePrimary>AdTech Ecosystem</BadgePrimary>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mx-auto max-w-[700px] text-white">
            The Complete Publisher Monetization Stack
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 mx-auto max-w-[580px] text-lg leading-relaxed">
            Aeli AdOps connects every layer of the programmatic ecosystem — from DSPs and demand sources through your ad server to maximum publisher revenue.
          </motion.p>
        </motion.div>

        {/* Ecosystem cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
        >
          {ecosystemItems.map((item, idx) => (
            <motion.div
              key={item.category}
              variants={fadeUp}
              custom={idx}
              transition={{ delay: idx * 0.08 }}
              className={`group relative rounded-2xl border bg-slate-900/60 backdrop-blur-sm p-6 cursor-default transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${item.borderColor} ${item.glow}`}
            >
              {/* Gradient top bar */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r ${item.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Category badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-gradient-to-r ${item.color} text-white shadow-sm`}>
                  {item.category}
                </span>
                <span className="text-2xl">{item.icon}</span>
              </div>

              <h3 className="text-white font-bold text-base mb-3 leading-snug">{item.title}</h3>

              <ul className="space-y-1.5">
                {item.items.map((tech) => (
                  <li key={tech} className="flex items-center gap-2 text-slate-400 text-sm group-hover:text-slate-300 transition-colors">
                    <span className={`size-1.5 rounded-full bg-gradient-to-r ${item.color} flex-shrink-0`} />
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Publisher Flow Steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative"
        >
          {/* connecting line */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent hidden lg:block" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {flowSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                transition={{ delay: idx * 0.1 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step circle */}
                <div className="relative mb-4 z-10">
                  <div className="size-16 rounded-full bg-slate-800 border-2 border-primary-500/40 flex items-center justify-center text-2xl shadow-lg shadow-primary-500/10 group-hover:border-primary-500 group-hover:shadow-primary-500/30 transition-all duration-300">
                    {step.icon}
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 size-6 rounded-full bg-primary-600 text-white text-[10px] font-extrabold flex items-center justify-center shadow-md">
                    {step.step}
                  </span>
                </div>
                <h4 className="text-white font-bold text-base mb-1">{step.label}</h4>
                <p className="text-slate-500 text-xs leading-relaxed max-w-[140px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: '10+', label: 'Demand Partners', color: 'text-blue-400' },
            { value: '100%', label: 'GAM Expertise', color: 'text-violet-400' },
            { value: '3x', label: 'Avg. eCPM Uplift', color: 'text-emerald-400' },
            { value: '24/7', label: 'Ops Coverage', color: 'text-amber-400' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm p-5 text-center hover:bg-white/8 transition-colors"
            >
              <p className={`text-3xl font-extrabold ${stat.color} mb-1`}>{stat.value}</p>
              <p className="text-slate-400 text-xs font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdTechEcosystem;
