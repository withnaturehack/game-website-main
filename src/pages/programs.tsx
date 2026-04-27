import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";

import { PROGRAMS } from "@/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { StarField, ConfettiBurst } from "@/components/ui/particles";
import { CtaBanner } from "@/components/sections/cta-banner";
import seasonHero from "@/assets/scenes/season-launch.png";
import rocket from "@/assets/characters/rocket.png";

const useCountdown = () => {
  // Aug 1 2026
  const target = new Date("2026-08-01T00:00:00Z").getTime();
  const diff = Math.max(0, target - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return [d, h, m, s];
};

export const Programs = () => {
  const [d, h, m, s] = useCountdown();

  return (
    <>
      {/* Flagship hero: Season of Creation 2026 */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-30">
          <img
            src={seasonHero}
            alt=""
            className="h-full w-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-bg/85 via-bg/50 to-bg" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
        <StarField count={80} />
        <ConfettiBurst count={20} />

        <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-2 text-xs font-display uppercase tracking-[0.3em] text-white"
          >
            <span className="size-2 rounded-full bg-pink-500 animate-pulse" />
            Flagship Program
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-black uppercase leading-[0.95] sm:text-7xl lg:text-8xl"
          >
            Season of <br />
            <span className="gradient-text">Creation 2026</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-text-dim"
          >
            12 weeks. 5 missions. One global launch night. The flagship CoLab Nation
            cohort opens this August — be on the list before the doors close.
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-10 inline-flex flex-wrap items-center gap-3 sm:gap-4"
          >
            {[
              { v: d, l: "Days" },
              { v: h, l: "Hrs" },
              { v: m, l: "Min" },
              { v: s, l: "Sec" },
            ].map((t, i) => (
              <div
                key={t.l}
                className="neon-border flex flex-col items-center justify-center rounded-2xl bg-white/5 px-5 py-3 min-w-[80px]"
              >
                <span className="font-display text-2xl sm:text-4xl font-black gradient-text">
                  {String(t.v).padStart(2, "0")}
                </span>
                <span className="font-display text-[10px] uppercase tracking-[0.3em] text-text-dim mt-1">
                  {t.l}
                </span>
                {i < 3 && null}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to="/join">
              <Button rightIcon={TiLocationArrow}>Join the Waitlist</Button>
            </Link>
            <a href="#all-programs">
              <Button variant="ghost">Explore All Programs</Button>
            </a>
          </motion.div>

          {/* Floating rocket */}
          <motion.img
            src={rocket}
            alt=""
            initial={{ opacity: 0, y: 100, x: 60 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="float-y pointer-events-none absolute right-[-2%] bottom-[-10%] hidden h-[110%] w-auto opacity-80 lg:block"
          />
        </div>
      </section>

      {/* All programs grid */}
      <section id="all-programs" className="relative py-24">
        <SectionHeading
          eyebrow="2026 Lineup"
          title="Every season, |new missions.|"
          subtitle="Pick the program that matches your fire. Some are open. Some are coming. All are real."
        />

        <div className="mx-auto mt-14 grid max-w-7xl gap-6 px-6 sm:grid-cols-2">
          {PROGRAMS.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              whileHover={{ y: -8 }}
              className="neon-border group relative overflow-hidden rounded-3xl p-6 sm:p-8"
            >
              <div
                className={`pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`}
              />
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="font-display text-xs uppercase tracking-[0.3em] text-neon-pink">
                  {p.eyebrow}
                </span>
                <span
                  className={`rounded-full bg-gradient-to-r ${p.accent} px-3 py-1 text-[10px] font-display font-black uppercase tracking-widest`}
                >
                  {p.status}
                </span>
              </div>
              <h3 className="mt-4 font-display text-3xl font-black uppercase leading-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-text-dim italic">{p.tagline}</p>
              <p className="mt-4 text-text-dim text-sm leading-relaxed">
                {p.description}
              </p>

              <ul className="mt-5 space-y-2 text-sm">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-white/90">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neon-pink" />
                    {perk}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                <div className="text-xs text-text-dim font-display uppercase tracking-widest">
                  <span className="text-white">{p.when}</span> · {p.cohort}
                </div>
                <Link to="/join">
                  <Button variant="outline" className="px-5 py-2 text-xs">
                    {p.status === "Coming Soon" ? "Notify me" : "Apply now"}
                  </Button>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
};
