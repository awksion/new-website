import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const faqItems = [
  {
    q: "What if my city doesn't win?",
    a: "If your city doesn't raise the most funds, your bid is released. No money is charged unless the show is confirmed for your location. Your support still helps artists see where their fans are for future tour planning.",
  },
  {
    q: 'How do I get my ticket?',
    a: "Once an Awksion ends and your city wins, tickets are automatically assigned to the highest bidders based on venue capacity. You'll receive a digital ticket directly in your Awksion account and via email immediately.",
  },
  {
    q: 'What is the minimum bid?',
    a: 'The minimum bid to participate in an Awksion is $10 CAD. You can bid higher to increase your city\'s chances of winning and to secure your spot if the venue has a limited capacity leaderboard.',
  },
  {
    q: 'How does the AI help venues?',
    a: 'Venues use our AI dashboard to access real-time fan density heatmaps and bidding data. This ensures every show is a guaranteed sell-out, removing the financial risk of booking empty rooms or guessing local demand.',
  },
  {
    q: 'Can I change my bid once placed?',
    a: 'Yes. You can increase your bid at any time while the Awksion is active. This helps your city stay in the lead and ensures you remain at the top of the list for tickets in smaller, high-demand venues.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  }),
};

export default function Waitlist() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div>
      {/* Hero — inspired by inspo: dark bg with teal gradient, centered form */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070707]">
        {/* Teal radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 100%, #527209 0%, transparent 70%)',
          }}
        />
        {/* Subtle grid columns like inspo */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 120px)',
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#B4FF00]/30 text-[#B4FF00] text-xs font-mono uppercase tracking-wider mb-8">
              In Development — Launching Soon
            </span>
          </motion.div>

          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-none mb-3 text-white">
              Bringing the Tour
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic font-normal text-white/80 mb-6">
              To Your City.
            </h2>
          </motion.div>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
            <p className="text-white/50 text-base mb-2">Be the first to know when we go live.</p>
            <p className="text-white/50 text-base mb-10">Join the waitlist for exclusive early access.</p>
          </motion.div>

          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
            {submitted ? (
              <div className="p-8 rounded-2xl border border-[#B4FF00]/30 bg-[#B4FF00]/5">
                <h3 className="text-2xl font-bold text-[#B4FF00] mb-2">YOU'RE IN THE QUEUE</h3>
                <p className="text-sm text-white/60">
                  First 500 fans get a VIP badge and their first $20 bid matched. We'll be in touch.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex items-center gap-0 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="flex-1 bg-white/5 border border-white/20 rounded-l-full px-6 py-3.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#B4FF00]/50 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-white text-black font-bold text-sm px-6 py-3.5 rounded-r-full hover:bg-[#B4FF00] transition-colors whitespace-nowrap"
                >
                  Join The Waitlist
                </button>
              </form>
            )}
          </motion.div>

          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="mt-10 flex items-center justify-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#070707]">
        <div className="section-container max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">FAQ</h2>
          <p className="text-center text-white/50 mb-12">
            Everything you need to know about flipping the touring model
          </p>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div key={i} className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-white">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-white/40 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-white/60 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
