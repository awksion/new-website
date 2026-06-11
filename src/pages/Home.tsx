import { Link } from 'react-router-dom';
import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import { HowItWorksCards } from '@/components/ui/HowItWorksCards';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <HeroGeometric
        badge="Fan-Powered Music"
        badge2="Fan-Powered Films"
        title1="Stop Waiting For The Tour."
        title2="Bring The Tour To You."
      />

      {/* How It Works */}
      <section id="how-it-works">
        <HowItWorksCards />
      </section>

      {/* Call for Subscribers */}
      <section className="py-12 sm:py-20 md:py-24 bg-[#050505]">
        <div className="section-container max-w-3xl text-center">
          <p className="text-white/50 text-base mb-4 italic">
            Think you have what it takes to be a critic?
          </p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-widest text-white mb-8">
            Call for Subscribers
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-4">
            We are looking for people like you to watch, scroll, and vote in our Viewers Choice Awards.
          </p>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-6">
            Have early access to thousands of hours of new music and film.
          </p>
          <p className="text-[#B4FF00]/80 text-sm font-mono uppercase tracking-widest mb-10">
            Voting begins January 1st 2027 &mdash; ends March 31st 2027
          </p>
          <Link to="/waitlist" className="btn-neon text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 inline-block">
            Join The Waitlist
          </Link>
        </div>
      </section>
    </div>
  );
}
