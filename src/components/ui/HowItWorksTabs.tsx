import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Trophy, Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface HowItWorksTabsProps {
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const defaultTabs: Tab[] = [
  {
    value: "bid",
    icon: <DollarSign className="h-auto w-4 shrink-0" />,
    label: "Bid on Your City",
    content: {
      badge: "Step 01 — Fan Action",
      title: "Vote with your wallet. Show your city wants it.",
      description:
        "Choose your city and place your bid (minimum $10 CAD). Bid as high as you want to prove the demand is real. Every dollar is a vote that pushes your city up the leaderboard.",
      imageSrc:
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=560&fit=crop",
      imageAlt: "Crowd at a concert cheering",
    },
  },
  {
    value: "win",
    icon: <Trophy className="h-auto w-4 shrink-0" />,
    label: "Win the Show",
    content: {
      badge: "Step 02 — The Awksion",
      title: "The city that bids the most brings the artist home.",
      description:
        "When the Awksion timer ends, the city that raised the most wins the concert. Real demand, real data — no more artists guessing where to go. No more empty rooms.",
      imageSrc:
        "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=560&fit=crop",
      imageAlt: "Artist on stage in front of a packed crowd",
    },
  },
  {
    value: "ticket",
    icon: <Ticket className="h-auto w-4 shrink-0" />,
    label: "Secure Your Ticket",
    content: {
      badge: "Step 03 — Your Reward",
      title: "Top bidders get the front row. Every bidder gets in.",
      description:
        "If your city wins, you get a ticket. For intimate venues, the highest bidders lock in VIP front-row access. Your bid directly determines how close you are to the stage.",
      imageSrc:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=560&fit=crop",
      imageAlt: "Fan at a live music event close to the stage",
    },
  },
];

export function HowItWorksTabs({
  heading = "How It Works",
  description = "Vote with your wallet. Bring the tour to you. Three steps — zero guessing.",
  tabs = defaultTabs,
}: HowItWorksTabsProps) {
  return (
    <section className="py-20 bg-[#050505]">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">{heading}</h2>
          <p className="text-white/50 text-sm max-w-xl">{description}</p>
        </div>

        <Tabs defaultValue={tabs[0].value}>
          {/* Tab triggers */}
          <TabsList className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 bg-transparent mb-8 h-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold border border-white/10 text-white/50 data-[state=active]:border-[#B4FF00]/40 data-[state=active]:bg-[#B4FF00]/10 data-[state=active]:text-[#B4FF00] transition-all duration-200 w-full sm:w-auto"
              >
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab panels */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 lg:p-14">
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
                  className="grid place-items-center gap-12 lg:grid-cols-2 lg:gap-16"
                >
                  {/* Text side */}
                  <div className="flex flex-col gap-5">
                    <Badge
                      variant="outline"
                      className="w-fit border-[#B4FF00]/30 bg-[#B4FF00]/10 text-[#B4FF00] text-xs tracking-widest uppercase"
                    >
                      {tab.content.badge}
                    </Badge>
                    <h3 className="text-2xl lg:text-4xl font-bold text-white leading-tight">
                      {tab.content.title}
                    </h3>
                    <p className="text-white/50 lg:text-lg leading-relaxed">
                      {tab.content.description}
                    </p>
                  </div>

                  {/* Image side */}
                  <img
                    src={tab.content.imageSrc}
                    alt={tab.content.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="rounded-2xl w-full object-cover max-h-72 lg:max-h-80 border border-white/10 shadow-2xl"
                  />
                </motion.div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
