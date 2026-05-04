import { motion } from "framer-motion";
import { FaStar, FaTrophy, FaPalette, FaFilm } from "react-icons/fa";
import whatsappLogo from "@/assets/whatsapp comunity logo.jpg";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const communityFeatures = [
  {
    icon: FaTrophy,
    title: "Best Posters",
    description:
      "Showcase the most creative and engaging posters from our community members.",
    color: "from-yellow-400 to-orange-500",
    glow: "rgba(255,193,7,0.4)",
  },
  {
    icon: FaPalette,
    title: "Art Gallery",
    description:
      "Explore stunning artwork and designs inspired by our games and universe.",
    color: "from-pink-500 to-purple-500",
    glow: "rgba(236,72,153,0.4)",
  },
  {
    icon: FaFilm,
    title: "Anime Vibes",
    description:
      "Dive into anime-inspired content, characters, and storytelling from our creators.",
    color: "from-blue-500 to-cyan-400",
    glow: "rgba(56,189,248,0.4)",
  },
  {
    icon: FaStar,
    title: "Community Spotlight",
    description:
      "Highlight the best contributions and achievements from our active members.",
    color: "from-emerald-400 to-green-500",
    glow: "rgba(34,197,94,0.4)",
  },
];

export const Community = () => {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-15" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-[700px] -translate-x-1/2 bg-linear-to-b from-pink-500/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp()} className="mb-10 text-center">
          <p className="font-display text-neon-cyan mb-3 text-xs tracking-[0.4em] uppercase">
            Community
          </p>
          <h2 className="font-display text-3xl leading-[0.95] font-black uppercase sm:text-4xl lg:text-5xl">
            Join the{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#4fb7ff,#ff3da0,#8b5cf6)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Creative Hub
            </span>
          </h2>
          <p className="text-text-dim mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
            Share your poster art, anime-inspired content, and community
            highlights in the place where the best creators connect.
          </p>
        </motion.div>

        <motion.a
          {...fadeUp(0.08)}
          href="https://chat.whatsapp.com/HU089UzJDs4Er5LeRjME2x"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mb-12 block max-w-4xl cursor-pointer rounded-[2rem] border border-white/[0.08] bg-gradient-to-r from-white/[0.05] to-white/[0.02] p-8 text-left shadow-[0_0_45px_rgba(255,255,255,0.05)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_80px_rgba(255,255,255,0.1)]"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="lg:max-w-xl">
              <p className="font-display text-neon-pink mb-2 text-[10px] tracking-[0.35em] uppercase">
                Featured Showcase
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={whatsappLogo}
                  alt="WhatsApp Community"
                  className="h-12 w-12 rounded-xl object-contain"
                />
                <h3 className="font-display text-3xl font-black text-white uppercase sm:text-4xl">
                  Join our WhatsApp Community
                </h3>
              </div>
            </div>
            <p className="text-text-dim max-w-xl text-sm leading-relaxed sm:text-base">
              Connect with fellow creators, share your best posters,
              anime-inspired art, and get featured in our weekly showcases.
            </p>
          </div>
        </motion.a>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {communityFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              {...fadeUp(0.1 + i * 0.1)}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
            >
              <div
                className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${feature.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                style={{ boxShadow: `0 0 28px ${feature.glow}` }}
              >
                <feature.icon className="text-2xl text-white" />
              </div>
              <h3 className="font-display mb-3 text-xl font-black tracking-[0.02em] text-white uppercase">
                {feature.title}
              </h3>
              <p className="text-text-dim text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeUp(0.5)}
          className="mt-12 flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
        >
          <img
            src={whatsappLogo}
            alt="WhatsApp Community"
            className="h-16 w-16 rounded-2xl object-contain"
          />
          <div className="text-center">
            <p className="font-display text-neon-cyan mb-2 text-[10px] tracking-[0.35em] uppercase">
              Community Link
            </p>
            <p className="text-lg font-semibold text-white sm:text-xl">
              Join our WhatsApp community
            </p>
            <a
              href="https://chat.whatsapp.com/HU089UzJDs4Er5LeRjME2x"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center rounded-full border border-pink-500/30 bg-pink-500/10 px-5 py-3 text-sm font-semibold tracking-[0.22em] text-pink-200 uppercase transition hover:border-pink-400 hover:bg-pink-500/20 hover:text-white"
            >
              Join Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
