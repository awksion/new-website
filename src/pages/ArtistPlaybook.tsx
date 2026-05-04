import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import NeonWaves from '@/components/NeonWaves';

const genres = ['Rock', 'Hip-Hop', 'Pop', 'R&B', 'Electronic', 'Country', 'Jazz', 'Other'];

const arcImages = [
  '/artist-images/badbunny.jpg',
  '/artist-images/drake.webp',
  '/artist-images/ed sheeran.webp',
  '/artist-images/IMAGINE-DRAGONS-2019-by-Eric-Ray-Davidson.webp',
  '/artist-images/justin bieber.jpg',
  '/artist-images/olivia.jpg',
  '/artist-images/rihanna.webp',
  '/artist-images/sabrina.webp',
  '/artist-images/sombr.jpg',
  '/artist-images/taylor.jpg',
];

// 10 cards spread across a wide arc; transformOrigin=bottom-center means rotation fans them out
const arcConfig = [
  { rotate: -40, x: -450, scale: 0.68, z: 1 },
  { rotate: -30, x: -340, scale: 0.74, z: 2 },
  { rotate: -20, x: -235, scale: 0.80, z: 3 },
  { rotate: -10, x: -125, scale: 0.88, z: 4 },
  { rotate:  -3, x:  -42, scale: 0.95, z: 5 },
  { rotate:   3, x:   42, scale: 0.95, z: 5 },
  { rotate:  10, x:  125, scale: 0.88, z: 4 },
  { rotate:  20, x:  235, scale: 0.80, z: 3 },
  { rotate:  30, x:  340, scale: 0.74, z: 2 },
  { rotate:  40, x:  450, scale: 0.68, z: 1 },
];

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ArtistPlaybook() {
  const [formData, setFormData] = useState({
    name: '', email: '', spotify: '', genre: '', fanbase: '', ambitions: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const arcRef = useRef(null);
  const arcInView = useInView(arcRef, { once: true, margin: '-40px' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.spotify && formData.fanbase) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#050505]">
      {/* Arc of artist images — continuously floating + drifting */}
      <section ref={arcRef} className="relative overflow-hidden bg-[#050505]" style={{ height: 520, marginTop: 20 }}>
        {/* Bottom fade into hero */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
        {/* Side fades */}
        <div className="absolute left-0 inset-y-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-40 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />
        {/* Slow horizontal drift wrapper for the whole arc */}
        <motion.div
          animate={arcInView ? { x: [-18, 18, -18] } : {}}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {arcImages.map((src, i) => {
            const cfg = arcConfig[i];
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  bottom: 140,
                  left: '50%',
                  zIndex: cfg.z,
                  transform: `translateX(calc(-50% + ${cfg.x}px)) rotate(${cfg.rotate}deg) scale(${cfg.scale})`,
                  transformOrigin: 'bottom center',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 80 }}
                  animate={arcInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.1 + i * 0.1, ease: [0.23, 0.86, 0.39, 0.96] }}
                >
                  <motion.div
                    animate={arcInView ? { y: [0, -14, 0] } : {}}
                    transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
                  >
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ width: 155, height: 225 }}>
                      <img src={src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#050505]">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#B4FF00]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/5 rounded-full blur-[100px]" />
        </div>

        {/* Hero text — in front */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#B4FF00]/10 border border-[#B4FF00]/25 backdrop-blur-sm mb-8"
          >
            <div className="w-2 h-2 bg-[#B4FF00] rounded-full animate-pulse" />
            <span className="text-sm font-bold text-[#B4FF00] tracking-wider uppercase">Artist Playbook</span>
            <div className="w-2 h-2 bg-[#B4FF00] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-4"
          >
            <span className="block text-white/70 font-light text-3xl sm:text-4xl md:text-5xl mb-3 tracking-wide">
              Tour Smarter,
            </span>
            <span className="relative block">
              <span className="bg-gradient-to-br from-[#B4FF00] via-white to-[#B4FF00]/70 bg-clip-text text-transparent">
                Not Harder.
              </span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, delay: 1.4, ease: 'easeOut' }}
                className="absolute -bottom-3 left-0 h-1 bg-gradient-to-r from-[#B4FF00] via-[#B4FF00]/80 to-transparent rounded-full"
              />
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl sm:text-2xl text-white font-bold mt-6 mb-4"
          >
            Guarantee Your Bag.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg text-white/50 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Let your fans prove where they are. Bid on cities, sell out rooms, secure your payout before you even pack your gear.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('artist-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#B4FF00] text-black rounded-xl font-bold text-base shadow-xl shadow-[#B4FF00]/20 overflow-hidden transition-all duration-300"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Create Your First Awksion</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <Link
              to="/waitlist"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white rounded-xl font-semibold text-base hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              Join the Waitlist
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/70">
              <Sparkles className="w-3.5 h-3.5 text-[#B4FF00]" /> AI-Driven Fan Intelligence
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/70">
              <Shield className="w-3.5 h-3.5 text-[#B4FF00]" /> Verified Venue Network
            </span>
          </motion.div>
        </div>
      </section>

      {/* Artist Journey */}
      <section className="py-24 bg-[#050505]">
        <div className="section-container">
          <FadeInSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 text-white">The Artist Journey</h2>
            <p className="text-center text-white/50 mb-16 max-w-xl mx-auto">
              Stop guessing. Start touring where your fans already are.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-[#B4FF00]" />,
                step: '01',
                label: 'Launch',
                desc: 'Create your Awksion campaign and set your timeframe.',
                tip: 'Pro-tip: Hype the exclusive nature of limited capacity to drive early bidding wars.',
              },
              {
                icon: <Sparkles className="w-8 h-8 text-[#B4FF00]" />,
                step: '02',
                label: 'Battle',
                desc: 'Fans in different cities battle to bring you to their hometown.',
                tip: 'Pro-tip: Use real-time AI heatmaps to target social ads where the energy is highest.',
              },
              {
                icon: <Shield className="w-8 h-8 text-[#B4FF00]" />,
                step: '03',
                label: 'Secure',
                desc: 'The winning city is locked and your payout is guaranteed before you pack.',
                tip: 'Pro-tip: Reward top bidders with VIP perks to build long-term loyalty.',
              },
            ].map((item, i) => (
              <FadeInSection key={item.step} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -6, borderColor: 'rgba(180,255,0,0.3)' }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-default h-full"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#B4FF00]/60 mb-4 block">Step {item.step}</span>
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.label}</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">{item.desc}</p>
                  <p className="text-xs text-cyan-400/80 italic">{item.tip}</p>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Launch Inquiry — centered form over neon waves */}
      <section id="artist-form" className="relative bg-[#09090e] py-16 overflow-hidden" style={{ minHeight: '560px' }}>
        {/* Full-bleed neon ribbon waves */}
        <div className="absolute inset-0 pointer-events-none">
          <NeonWaves />
        </div>
        {/* Centered frosted form card */}
        <div className="relative z-10 max-w-lg mx-auto px-4">
          <div className="rounded-2xl backdrop-blur-md bg-black/60 border border-white/8 px-8 py-10">
            <FadeInSection>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400 mb-2 block">
                Encrypted Artist Submission Gate
              </span>
              <h2 className="text-2xl font-black text-white mb-1">
                Welcome to <span className="text-[#B4FF00]">Awksion,</span>
              </h2>
              <p className="text-xs text-white/50 mb-5">
                Apply to join our roster of artists flipping the traditional touring model upside down.
              </p>
            </FadeInSection>

            <FadeInSection delay={0.1}>
              {submitted ? (
                <div className="p-8 rounded-xl border border-[#B4FF00]/30 bg-[#B4FF00]/5 text-center">
                  <h3 className="text-2xl font-bold text-[#B4FF00] mb-2">Inquiry Received</h3>
                  <p className="text-sm text-white/50">
                    Our artist relations team will reach out within 48 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="mt-4 text-xs text-white/40 underline underline-offset-4">
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {[
                    { key: 'name', label: 'Artist / Band Name', type: 'text', required: true, placeholder: 'THE ELECTRIC SHADOWS' },
                    { key: 'email', label: 'Management Email', type: 'email', required: true, placeholder: 'mgmt@artist.com' },
                    { key: 'spotify', label: 'Spotify / EPK Link', type: 'text', required: true, placeholder: 'https://open.spotify.com/...' },
                    { key: 'fanbase', label: 'Fanbase Size', type: 'text', required: true, placeholder: 'e.g. 50k monthly Spotify listeners' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs font-medium mb-1 text-white/60">{field.label}</label>
                      <input
                        type={field.type}
                        required={field.required}
                        placeholder={field.placeholder}
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="w-full bg-white/5 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/25 outline-none border border-white/10 focus:border-[#B4FF00]/50 transition-colors"
                      />
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-white/60">Genre</label>
                      <select
                        value={formData.genre}
                        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                        className="w-full bg-white/5 rounded-lg px-3 py-2 text-sm text-white outline-none border border-white/10 focus:border-[#B4FF00]/50 transition-colors"
                      >
                        <option value="" className="bg-[#0a0a0a]">Select</option>
                        {genres.map((g) => <option key={g} value={g} className="bg-[#0a0a0a]">{g}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-white/60">Touring Ambitions</label>
                      <input
                        type="text"
                        placeholder="Dream tour cities..."
                        value={formData.ambitions}
                        onChange={(e) => setFormData({ ...formData, ambitions: e.target.value })}
                        className="w-full bg-white/5 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/25 outline-none border border-white/10 focus:border-[#B4FF00]/50 transition-colors"
                      />
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#B4FF00] text-black font-bold text-sm tracking-wider uppercase hover:bg-[#c8ff33] transition-colors"
                  >
                    Launch Inquiry
                  </motion.button>
                </form>
              )}
            </FadeInSection>
          </div>
        </div>
      </section>
    </div>
  );
}


  