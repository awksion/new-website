import { Check, X, Star } from 'lucide-react';

interface Tier {
  name: string;
  popular: boolean;
  description: string;
  cta: string;
  ctaStyle: string;
  features: Record<string, string | boolean>;
}

const tiers: Tier[] = [
  {
    name: 'Starter',
    popular: false,
    description: 'Essential data for independent venues.',
    cta: 'Get Started',
    ctaStyle: 'btn-outline',
    features: {
      'Fan Intelligence': true,
      'Heatmap Density': 'Basic',
      'Risk Mitigation Data': false,
      'Demand Forecasting': false,
      'Demographic Insights': false,
      'Post Available Dates': '5/mo',
      'Artist Bid Access': false,
      'Prepaid Crowd Guarantee': false,
      'Direct App Bookings': false,
      'Zero Platform Fees': true,
      'Priority Support': false,
      'Multi-Venue Support': false,
      'Custom API Access': false,
      'AI Matching': 'Basic',
      'Support Level': 'Standard',
    },
  },
  {
    name: 'Pro',
    popular: true,
    description: 'AI-driven insights for high-traffic clubs.',
    cta: 'Start Free Trial',
    ctaStyle: 'btn-neon',
    features: {
      'Fan Intelligence': true,
      'Heatmap Density': 'Neighborhood-level',
      'Risk Mitigation Data': true,
      'Demand Forecasting': true,
      'Demographic Insights': true,
      'Post Available Dates': 'Unlimited',
      'Artist Bid Access': true,
      'Prepaid Crowd Guarantee': true,
      'Direct App Bookings': true,
      'Zero Platform Fees': true,
      'Priority Support': true,
      'Multi-Venue Support': false,
      'Custom API Access': false,
      'AI Matching': 'Advanced',
      'Support Level': 'Priority',
    },
  },
  {
    name: 'Enterprise',
    popular: false,
    description: 'Enterprise tools for festival promoters.',
    cta: 'Contact Sales',
    ctaStyle: 'btn-outline',
    features: {
      'Fan Intelligence': true,
      'Heatmap Density': 'Street-level',
      'Risk Mitigation Data': true,
      'Demand Forecasting': true,
      'Demographic Insights': true,
      'Post Available Dates': 'Unlimited',
      'Artist Bid Access': true,
      'Prepaid Crowd Guarantee': true,
      'Direct App Bookings': true,
      'Zero Platform Fees': true,
      'Priority Support': true,
      'Multi-Venue Support': true,
      'Custom API Access': true,
      'AI Matching': 'Predictive',
      'Support Level': 'Dedicated account manager',
    },
  },
];

const featureKeys = Object.keys(tiers[0].features);

function FeatureValue({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="w-5 h-5 text-[#B4FF00] mx-auto" />;
  if (value === false) return <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />;
  return <span className="text-sm text-foreground">{value}</span>;
}

export default function VenueIntelligence() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="section-container text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400 mb-4 block">
            Venue Intelligence
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none mb-4"
            style={{ fontFamily: 'Archivo Black, Impact, sans-serif' }}
          >
            Never Book an Empty Room Again
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Access Awksion AI and fill your calendar with guaranteed, prepaid crowds. Choose the subscription that fits your venue's capacity and scale.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-lg border p-8 flex flex-col ${
                  tier.popular
                    ? 'border-[#B4FF00]/50 bg-card shadow-[0_0_30px_rgba(180,255,0,0.1)]'
                    : 'border-border bg-card'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#B4FF00] text-black text-xs font-semibold">
                    <Star className="w-3 h-3" /> Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
                <button className={`${tier.ctaStyle} w-full mb-6`}>{tier.cta}</button>
                <ul className="space-y-3 flex-1">
                  {featureKeys.slice(0, 8).map((key) => (
                    <li key={key} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{key}</span>
                      <FeatureValue value={tier.features[key]} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Compare Intelligence</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Feature</th>
                    {tiers.map((t) => (
                      <th key={t.name} className="text-center py-3 px-4 font-semibold">{t.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureKeys.map((key) => (
                    <tr key={key} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4 text-muted-foreground">{key}</td>
                      {tiers.map((t) => (
                        <td key={t.name} className="py-3 px-4 text-center">
                          <FeatureValue value={t.features[key]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
