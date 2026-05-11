import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollText, Heart, Ticket } from "lucide-react";
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
    value: "scroll",
    icon: <ScrollText className="h-auto w-4 shrink-0" />,
    label: "Scroll & Discover",
    content: {
      badge: "Step 01 — Explore",
      title: "Scroll through new music and film from independent artists.",
      description:
        "Browse a curated platform of original content submitted by musicians and filmmakers from around the world. Every scroll surfaces undiscovered talent ready for your attention.",
      imageSrc:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=560&fit=crop",
      imageAlt: "Person scrolling through music content on a phone",
    },
  },
  {
    value: "back",
    icon: <Heart className="h-auto w-4 shrink-0" />,
    label: "Back the Project",
    content: {
      badge: "Step 02 — Support",
      title: "Vote for the projects you want brought to life.",
      description:
        "When you find an artist or filmmaker you believe in, back them. Your pledge is a vote that tells the world — and the creator — this work deserves to exist. Fan support determines what gets made.",
      imageSrc:
        "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=560&fit=crop",
      imageAlt: "Fans cheering for an artist at a live event",
    },
  },
  {
    value: "ticket",
    icon: <Ticket className="h-auto w-4 shrink-0" />,
    label: "Get Your Access",
    content: {
      badge: "Step 03 — Reward",
      title: "When the art is made, your access is waiting.",
      description:
        "Backers of successful projects receive early access, exclusive content, or tickets to the premiere or live event. Your support turns into a front-row seat to something new.",
      imageSrc:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=560&fit=crop",
      imageAlt: "Fan at a live music event close to the stage",
    },
  },
];

export function HowItWorksTabs({
  heading = "How It Works",
  description = "Scroll. Back what you believe in. Get access when it's made.",
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
