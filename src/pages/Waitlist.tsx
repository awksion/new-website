import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const faqItems = [
  {
    q: 'When can I enter the contest?',
    a: 'Pre-selection begins June 1st 2026 and ends August 31st 2026. Entries will be reviewed by a panel at Awksion. Winning entries will be added to a pool of content fans will be able to scroll and vote on.',
  },
  {
    q: 'When will the general public get to view and vote on my video?',
    a: 'Q1 begins January 1st 2027 and ends March 31st 2027. Votes will be counted and the top music videos, short films, and feature films will be showcased at Awksion\'s first ever Viewers Choice Festival airing live online on April 30th 2027.',
  },
  {
    q: 'Will my entry be considered for an award?',
    a: 'Ending the evening on April 30 2027 will be an awards ceremony for the winner of each category.',
  },
  {
    q: 'Is the festival online or in-person?',
    a: 'Yes to both! Viewers choice festivals will air online quarterly after public voting rounds. To keep it fresh each quarter there will be a batch of new content for the general public to vote on. There will be a grand in-person festival and ceremony occurring in Canada in Spring 2028 for the top 10 winners of 2027.',
  },
  {
    q: 'I missed the deadline to apply. Can I still enter the contest?',
    a: 'Stay tuned for the next submission period. Q2 entries will be open soon, with further entries being accepted on a rolling basis.',
  },
  {
    q: 'Are there other considerations for me to qualify?',
    a: 'In order for your videos to qualify, musicians must pledge a tour in 2027/2028 and filmmakers must be actively working on a new project that will be in production in 2027/2028. Fan-funding options will be available for those who generate enough interest. Please include your merch stores in your application if you have one.',
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

const WORDPRESS_URL = 'https://api.awksion.ai';

export default function Waitlist() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${WORDPRESS_URL}/wp-json/waitlist/v1/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Submission failed');
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
              Launching Soon
            </span>
          </motion.div>

          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-none mb-3 text-white">
              Viewers Choice
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic font-normal text-white/80 mb-6">
              Competition.
            </h2>
          </motion.div>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
            <p className="text-white/50 text-base mb-2">Submissions will be open June 1st 2026.</p>
            <p className="text-white/50 text-base mb-4">
              April 30th, 2027 will be Awksion&apos;s first ever Film and Music Festival, showcasing Canadian and International talent.
            </p>
            <p className="text-white/40 text-sm mb-10">
              Talented artists don&apos;t always have the marketing budget to promote their work — it will be the fans that make you famous.
            </p>
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
              <>
                {error && (
                  <p className="text-red-400 text-sm mb-3">{error}</p>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0 max-w-md mx-auto w-full">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    className="flex-1 bg-white/5 border border-white/20 rounded-full sm:rounded-l-full sm:rounded-r-none px-6 py-3.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#B4FF00]/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-white text-black font-bold text-sm px-6 py-3.5 rounded-full sm:rounded-l-none sm:rounded-r-full hover:bg-[#B4FF00] transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Joining...' : 'Join The Waitlist'}
                  </button>
                </form>
              </>
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
      <section className="py-12 sm:py-20 md:py-24 bg-[#070707]">
        <div className="section-container max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">FAQ</h2>
          <p className="text-center text-white/50 mb-12">
            Everything you need to know about the Viewers Choice Competition
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
