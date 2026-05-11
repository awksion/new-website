import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.1 + i * 0.15, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  }),
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070707]">
      {/* Neon radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(180,255,0,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-xl mx-auto">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#B4FF00]/30 text-[#B4FF00] text-xs font-mono uppercase tracking-wider mb-8">
            Error 404
          </span>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <h1 className="text-[5rem] sm:text-[8rem] md:text-[10rem] font-black leading-none text-white/5 select-none">
            404
          </h1>
        </motion.div>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="-mt-8">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-10">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="btn-neon text-sm px-6 py-3 inline-block">
            Back to Home
          </Link>
          <Link
            to="/waitlist"
            className="text-sm font-medium text-white/50 hover:text-white transition-colors"
          >
            Join the Waitlist →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
