import { motion } from "framer-motion";
import { BADGES } from "@/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import squad from "@/assets/characters/squad.png";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ConfettiBurst, StarField } from "@/components/ui/particles";

const MISSIONS = [
  {
    title: "Operation: Open Source Atlas",
    squad: "8 builders · 2 mentors",
    type: "Open Source",
    status: "Active",
    accent: "from-pink-500 to-orange-400",
  },
  {
    title: "AI Agent Build Week",
    squad: "12 builders · 3 mentors",
    type: "Hackathon",
    status: "48h left",
    accent: "from-violet-500 to-blue-500",
  },
  {
    title: "Indie Founders Studio",
    squad: "6 builders · 1 mentor",
    type: "Startup Sprint",
    status: "Recruiting",
    accent: "from-emerald-400 to-cyan-400",
  },
  {
    title: "DesignLab Residency",
    squad: "5 builders · 2 mentors",
    type: "Design",
    status: "Active",
    accent: "from-fuchsia-500 to-pink-500",
  },
];

export const Nation = () => {
  return (
    <>
      <section className="relative overflow-hidden py-24">
        <StarField count={70} />
        <ConfettiBurst count={18} />
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="The Nation"
            title="A community that |actually ships.|"
            subtitle="Open source vibes, gamified missions, real friendships. Less Slack noise, more launches."
          />
        </div>
      </section>

      {/* Missions */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase">
              Live Missions
            </h3>
            <p className="text-text-dim text-sm">
              <span className="text-emerald-400">●</span> 84 missions across 27 timezones
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {MISSIONS.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group neon-border relative overflow-hidden rounded-2xl p-6"
              >
                <div
                  className={`pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-gradient-to-br ${m.accent} opacity-20 blur-3xl group-hover:opacity-50 transition-opacity`}
                />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-xs uppercase tracking-[0.3em] text-neon-pink">
                      {m.type}
                    </p>
                    <h4 className="mt-1 font-display text-2xl font-black">
                      {m.title}
                    </h4>
                    <p className="mt-3 text-sm text-text-dim">{m.squad}</p>
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-display uppercase tracking-widest">
                    {m.status}
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span
                        key={idx}
                        className={`grid size-8 place-items-center rounded-full border-2 border-bg bg-gradient-to-br ${m.accent} text-[10px] font-display font-black text-white`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                    ))}
                  </div>
                  <button className="text-sm font-display uppercase tracking-widest text-white hover:text-neon-pink transition-colors">
                    Enlist →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Badges / Achievements */}
      <section className="relative py-24">
        <SectionHeading
          eyebrow="Achievements"
          title="Earn |badges.| Unlock the future."
          subtitle="Every milestone unlocks a permanent, verifiable badge on your profile."
        />
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-5 px-6 sm:grid-cols-3 lg:grid-cols-6">
          {BADGES.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, type: "spring" }}
              whileHover={{ y: -8, rotate: 4 }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className={`relative grid size-24 place-items-center clip-hex bg-gradient-to-br ${b.color} text-3xl text-white pulse-glow`}
              >
                {b.icon}
              </div>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-center text-white/85">
                {b.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community feed */}
      <section className="relative py-24">
        <SectionHeading
          eyebrow="Live Feed"
          title="The nation moves |out loud.|"
        />
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 px-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-1"
          >
            <img
              src={squad}
              alt="Squad"
              className="float-y w-full drop-shadow-[0_0_50px_rgba(255,61,160,0.4)]"
              draggable={false}
            />
          </motion.div>

          <div className="lg:col-span-2 space-y-4">
            {[
              {
                user: "@aria.builds",
                text: "Just shipped my AI study buddy MVP 🎉 Mentor said it's production-ready!",
                time: "2m",
                tag: "LAUNCH",
                color: "from-pink-500 to-orange-400",
              },
              {
                user: "@kenji.codes",
                text: "Squad locked in for AI Agent Build Week. 12 humans. 1 mission. LET'S GO 🚀",
                time: "14m",
                tag: "SQUAD",
                color: "from-violet-500 to-blue-500",
              },
              {
                user: "@nova.research",
                text: "Mentor's Pick badge unlocked! Months of papers paid off.",
                time: "1h",
                tag: "BADGE",
                color: "from-amber-400 to-rose-500",
              },
              {
                user: "@team-atlas",
                text: "Open Source Atlas hit 1.2k stars overnight. The nation showed up ⚡",
                time: "3h",
                tag: "MILESTONE",
                color: "from-emerald-400 to-cyan-400",
              },
            ].map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="neon-border flex items-start gap-4 rounded-2xl p-5"
              >
                <div className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${post.color} font-display text-sm font-black`}>
                  {post.user[1]?.toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="font-display font-semibold">{post.user}</p>
                    <span className="text-xs text-text-dim">{post.time}</span>
                  </div>
                  <p className="mt-1 text-text-dim">{post.text}</p>
                  <span className={`mt-3 inline-block rounded-full bg-gradient-to-r ${post.color} px-3 py-1 text-[10px] font-display uppercase tracking-widest`}>
                    {post.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};
