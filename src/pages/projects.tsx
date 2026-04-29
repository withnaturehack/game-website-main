import aibot from "@/assets/characters/aibot.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi";

import { PROJECTS } from "@/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBanner } from "@/components/sections/cta-banner";
import { StarField } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import logo from "@assets/45375_1777311860118.png";
import projAi from "@/assets/projects/project-ai.png";
import projOpen from "@/assets/projects/project-open.png";
import projDesign from "@/assets/projects/project-design.png";
import projRobotics from "@/assets/projects/project-robotics.png";

const IMG_MAP: Record<string, string> = {
  ai: projAi,
  open: projOpen,
  design: projDesign,
  robotics: projRobotics,
};

const COMING_SOON_PROGRAMS = [
  {
    title: "Season of Creation 2026",
    eyebrow: "Flagship",
    when: "Opens May 2026",
    desc: "12 weeks. 5 missions. One global launch night. The flagship CoLab cohort where builders get verified and hired.",
    accent: "from-pink-500 via-orange-400 to-violet-500",
    icon: "🚀",
  },
  {
    title: "AI Agent Build Week",
    eyebrow: "Sprint",
    when: "Q3 2026",
    desc: "From prompt to product in 7 days. A one-week sprint with daily mentor reviews and a live launch night demo.",
    accent: "from-violet-500 to-blue-500",
    icon: "🤖",
  },
  {
    title: "DesignLab Residency",
    eyebrow: "Design",
    when: "Winter 2026",
    desc: "An 8-week residency for designers shipping real product missions, mentored by founders and design leads.",
    accent: "from-fuchsia-500 to-pink-500",
    icon: "🎨",
  },
];

export const Projects = () => {
  return (
    <>
      {/* ─── PROJECTS COMING SOON ──────────────────────────────── */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center py-32">
        <StarField count={60} />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-15" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-100 w-150 -translate-x-1/2 bg-linear-to-b from-pink-500/15 via-violet-500/10 to-transparent blur-3xl" />
        {/* Animated character */}
        <img
          src={aibot}
          alt="AI Bot Character"
          className="animate-float pointer-events-none absolute right-10 bottom-0 hidden h-64 w-auto drop-shadow-xl md:block"
          style={{ animationDuration: "4.5s" }}
        />
        <div className="relative z-10 text-center">
          <h1 className="font-impact gradient-text mb-6 text-5xl font-black tracking-tight uppercase sm:text-7xl">
            Projects Section
          </h1>
          <p className="text-text-dim mb-8 text-xl sm:text-2xl">
            Coming May 2026. Stay tuned for the most ambitious builds.
          </p>
          <Link to="/join">
            <Button className="px-8 py-4 text-lg">Get Early Access</Button>
          </Link>
        </div>
      </section>
      <CtaBanner />
    </>
  );
};
