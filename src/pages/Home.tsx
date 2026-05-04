import { lazy, Suspense } from 'react';
import { HeroGeometric } from '@/components/ui/shape-landing-hero';
const HowItWorksTabs = lazy(() => import('@/components/ui/HowItWorksTabs').then(m => ({ default: m.HowItWorksTabs })));

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
        <Suspense fallback={<div className="h-64 bg-[#050505]" />}>
          <HowItWorksTabs />
        </Suspense>
      </section>
    </div>
  );
}
