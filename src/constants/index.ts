import { FaDiscord, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Projects", to: "/projects" },
  { label: "Nation", to: "/nation" },
  { label: "Join", to: "/join" },
] as const;

export const SOCIAL_LINKS = [
  { href: "https://discord.com", icon: FaDiscord, label: "Discord" },
  { href: "https://x.com", icon: FaXTwitter, label: "X" },
  { href: "https://instagram.com", icon: FaInstagram, label: "Instagram" },
  { href: "https://youtube.com", icon: FaYoutube, label: "YouTube" },
  { href: "https://github.com", icon: FaGithub, label: "GitHub" },
] as const;

export const STATS = [
  { value: 0, suffix: " spots", label: "Founding Members (Fill Yours)" },
  { value: 500, suffix: "", label: "Builder Seats · Season 1" },
  { value: 12, suffix: " wks", label: "Program Duration" },
  { value: 1, suffix: " launch", label: "Global Demo Day · May 2026" },
] as const;

export const STORY_BEATS = [
  {
    chapter: "01",
    title: "The Problem",
    description:
      "A talented student sits alone in the dark — full of ideas, but no team, no proof, no path. Sound familiar?",
    accent: "from-pink-500 to-rose-500",
  },
  {
    chapter: "02",
    title: "The Build Phase",
    description:
      "You join a squad. Designers, devs, researchers — all leveling up together on real-world missions.",
    accent: "from-orange-400 to-amber-400",
  },
  {
    chapter: "03",
    title: "Verification",
    description:
      "Mentors review your work, sign off on your skills, and your contributions become impossible to fake.",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    chapter: "04",
    title: "The Launch",
    description:
      "Your project ships. Your name is on the rocket. The whole nation watches you take off.",
    accent: "from-blue-400 to-cyan-400",
  },
  {
    chapter: "05",
    title: "Success",
    description:
      "Recruiters find you. Founders DM you. You don't apply — you get drafted into the future.",
    accent: "from-emerald-400 to-cyan-400",
  },
] as const;

export const POWERS = [
  {
    title: "Contribution Engine",
    subtitle: "Your Skill Power",
    description:
      "Earn XP for every commit, design, and review. Your profile grows with proof, not promises.",
    icon: "⚡",
  },
  {
    title: "Mentor Network",
    subtitle: "Guidance System",
    description:
      "Tap into a verified network of senior builders who unlock your next level.",
    icon: "🧭",
  },
  {
    title: "Squad Missions",
    subtitle: "Team Power",
    description:
      "Join multi-disciplinary squads on real missions from real companies.",
    icon: "🛡️",
  },
  {
    title: "Verified Identity",
    subtitle: "Trust Layer",
    description:
      "Cryptographically signed contributions. Recruiters trust the badge.",
    icon: "🔐",
  },
  {
    title: "Launch Pad",
    subtitle: "Visibility Boost",
    description: "Ship-day takes your project to the entire CoLab Nation feed.",
    icon: "🚀",
  },
  {
    title: "Hire Bridge",
    subtitle: "Career Warp",
    description:
      "Top builders get drafted directly into hiring pipelines we trust.",
    icon: "🌉",
  },
] as const;

export const TIMELINE = [
  {
    year: "2023",
    title: "Origin Story",
    text: "A handful of students rejected the resume game and built the first CoLab squad.",
  },
  {
    year: "2024",
    title: "First Launch",
    text: "100 builders. 14 missions. Zero ghosted applications.",
  },
  {
    year: "2025",
    title: "Mentor Wave",
    text: "480 senior engineers and founders joined as verifiers.",
  },
  {
    year: "2026",
    title: "Nation Mode",
    text: "12.5K+ builders worldwide. The movement goes global.",
  },
] as const;

export const BADGES = [
  { name: "First Commit", color: "from-pink-500 to-orange-400", icon: "✦" },
  { name: "Squad Captain", color: "from-violet-500 to-blue-500", icon: "★" },
  { name: "Mentor's Pick", color: "from-amber-400 to-rose-500", icon: "♛" },
  { name: "Launch Hero", color: "from-cyan-400 to-violet-500", icon: "✺" },
  { name: "100x Streak", color: "from-emerald-400 to-cyan-400", icon: "⚡" },
  { name: "Verified", color: "from-fuchsia-500 to-pink-500", icon: "✓" },
] as const;

export const PROGRAMS = [
  {
    slug: "season-of-creation-2026",
    title: "Season of Creation 2026",
    tagline: "12 weeks. 5 missions. One launch.",
    status: "Coming Soon",
    when: "Opens May 2026",
    cohort: "500 builders",
    description:
      "The flagship CoLab Nation cohort. Twelve weeks of squad missions, mentor-verified milestones, and a global Demo Day at the end.",
    perks: [
      "Squad placement within 48 hours",
      "Weekly mentor verification",
      "Demo Day in front of 100+ recruiters",
      "Exclusive Season 2026 launch badge",
    ],
    accent: "from-pink-500 via-orange-400 to-violet-500",
    eyebrow: "Flagship",
  },
  {
    slug: "open-source-atlas",
    title: "Open Source Atlas",
    tagline: "Map the open web. Build the missing piece.",
    status: "Applications Open",
    when: "Rolling intake",
    cohort: "Async, global",
    description:
      "Adopt or fork a real open source repo with a verified mentor. Ship a meaningful PR. Earn a public Atlas badge.",
    perks: [
      "Mentor-pair programming",
      "Curated good-first-issue board",
      "Atlas profile contributions",
    ],
    accent: "from-emerald-400 to-cyan-400",
    eyebrow: "Open Source",
  },
  {
    slug: "ai-agent-build-week",
    title: "AI Agent Build Week",
    tagline: "From prompt to product in 7 days.",
    status: "Coming Soon",
    when: "Opens May 2026",
    cohort: "200 builders",
    description:
      "A one-week sprint to ship a real AI agent with squad-style collaboration, daily standups, and mentor reviews.",
    perks: [
      "Daily Nova-AI standups",
      "Sponsored API credits",
      "Live launch night demo",
    ],
    accent: "from-violet-500 to-blue-500",
    eyebrow: "Sprint",
  },
  {
    slug: "designlab-residency",
    title: "DesignLab Residency",
    tagline: "Where designers earn craft proof.",
    status: "Coming Soon",
    when: "Opens May 2026",
    cohort: "120 designers",
    description:
      "An eight-week residency for designers shipping real product missions, mentored by founders and design leads.",
    perks: [
      "1:1 founder mentorship",
      "Portfolio-grade case studies",
      "Cross-squad design sprints",
    ],
    accent: "from-fuchsia-500 to-pink-500",
    eyebrow: "Design",
  },
] as const;

export const PROJECTS = [
  {
    title: "Aria · AI Study Buddy",
    by: "@aria.builds",
    tags: ["AI", "Mobile", "EdTech"],
    blurb:
      "An anime-styled study buddy that quizzes you with your own notes, ships nightly insights to your inbox, and gamifies streaks.",
    accent: "from-pink-500 to-violet-500",
    img: "ai",
  },
  {
    title: "Atlas · Open Source Map",
    by: "@team-atlas",
    tags: ["Open Source", "DevTools"],
    blurb:
      "A live constellation of every CoLab repo, contributors, and mentor — explore the open source galaxy in 3D.",
    accent: "from-cyan-400 to-violet-500",
    img: "open",
  },
  {
    title: "DesignLab · Co-Drafts",
    by: "@designlab",
    tags: ["Design", "Web"],
    blurb:
      "Side-by-side design exploration with squad voting, version diffs, and mentor verification overlays.",
    accent: "from-fuchsia-500 to-pink-500",
    img: "design",
  },
  {
    title: "Forge · Tabletop Robotics",
    by: "@forge.lab",
    tags: ["Robotics", "Hardware"],
    blurb:
      "An open hardware kit for indie roboticists — modular limbs, a real-time control SDK, and a global build log.",
    accent: "from-amber-400 to-rose-500",
    img: "robotics",
  },
] as const;
