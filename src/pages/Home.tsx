import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import { HowItWorksTabs } from '@/components/ui/HowItWorksTabs';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <HeroGeometric
        badge="Fan-Powered Live Music"
        title1="Stop Waiting for the Tour."
        title2="Bring the Tour to You."
      />

      {/* How It Works */}
      <section id="how-it-works" className="bg-[#050505]">
        <HowItWorksTabs />
      </section>
    </div>
  );
}
