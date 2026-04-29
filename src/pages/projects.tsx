import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi";

import builder from "@/assets/characters/builder.png";
import mentor from "@/assets/characters/mentor.png";
import aibot from "@/assets/characters/aibot.png";
import rocket from "@/assets/characters/rocket.png";

import { CtaBanner } from "@/components/sections/cta-banner";
import { StarField } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";

const PREVIEW = [
  {
    code: "01",
    label: "AI",
    title: "AI Squad Drops",
    desc: "Indie agents, copilots, and AI-native tools — built by verified squads.",
    accent: "from-pink-500 to-violet-500",
  },
  {
    code: "02",
    label: "OPEN",
    title: "Open-Source Atlas",
    desc: "Real PRs, mentor-paired forks, and contribution badges that recruiters trust.",
    accent: "from-cyan-400 to-violet-500",
  },
  {
    code: "03",
    label: "DESIGN",
    title: "DesignLab Co-Drafts",
    desc: "Side-by-side design exploration with squad voting and mentor reviews.",
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    code: "04",
    label: "HARDWARE",
    title: "Forge · Tabletop Robotics",
    desc: "Open-hardware kits, modular limbs, and a global build log.",
    accent: "from-amber-400 to-rose-500",
  },
];

export const Projects = () => {
  return (
    <>
      {/* ─── HERO ────────────────────────────────────────────── */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden pt-32 pb-24">
        <StarField count={120} />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[520px] w-[820px] -translate-x-1/2 bg-gradient-to-b from-pink-500/22 via-violet-500/12 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-cyan-500/15 to-transparent blur-3xl" />

        {/* Builder character — left, no dialogue */}
        <div className="float-y pointer-events-none absolute bottom-0 left-0 z-10 hidden lg:block xl:-left-12 2xl:-left-24">
          <img
            src={builder}
            alt="Builder"
            className="h-[58vh] max-h-[540px] w-auto drop-shadow-[0_0_50px_rgba(255,61,160,0.55)]"
            draggable={false}
          />
        </div>

        {/* Mentor character — right, no dialogue */}
        <div className="float-slow pointer-events-none absolute right-0 bottom-0 z-10 hidden lg:block xl:-right-12 2xl:-right-24">
          <img
            src={mentor}
            alt="Mentor"
            className="h-[58vh] max-h-[540px] w-auto drop-shadow-[0_0_50px_rgba(139,92,246,0.55)]"
            draggable={false}
          />
        </div>

        {/* Nova bot peeking */}
        <img
          src={aibot}
          alt="Nova"
          className="float-y pointer-events-none absolute top-28 right-[26%] z-10 hidden h-24 w-auto opacity-90 drop-shadow-[0_0_30px_rgba(56,240,255,0.7)] md:block"
          style={{ animationDuration: "4s" }}
          draggable={false}
        />

        <div className="relative z-20 mx-auto max-w-3xl px-6 text-center">
          <div className="font-display mb-6 inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-pink-500/10 px-5 py-2 text-[10px] tracking-[0.45em] text-pink-200 uppercase backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-pink-400" />
            Coming May 2026
            <HiSparkles className="size-3 text-pink-300" />
          </div>

          <h1 className="font-impact mb-6 text-[clamp(2.6rem,8.5vw,6rem)] leading-[0.92] tracking-tight uppercase">
            <span className="block bg-gradient-to-r from-pink-400 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,61,160,0.55)]">
              Real squads.
            </span>
            <span className="block bg-gradient-to-r from-violet-400 via-pink-300 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(139,92,246,0.55)]">
              Real ships.
            </span>
          </h1>

          <p className="font-display mx-auto mb-3 max-w-xl text-sm tracking-[0.22em] text-white/85 uppercase sm:text-base">
            The drop room is being built.
          </p>
          <p className="text-text-dim mx-auto mb-8 max-w-md text-sm sm:text-base">
            Verified squad projects launch with Season 1 in May 2026. Get on the
            list to see the first wave.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/join">
              <Button
                rightIcon={TiLocationArrow}
                className="px-7 py-3.5 shadow-[0_0_40px_rgba(255,61,160,0.45)]"
              >
                Get Early Access
              </Button>
            </Link>
            <Link to="/programs">
              <Button variant="ghost" className="px-7 py-3.5">
                See Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PREVIEW · WHAT'S DROPPING ─────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <p className="font-display text-neon-violet mb-3 text-[10px] tracking-[0.45em] uppercase">
              ✦ Preview
            </p>
            <h2 className="font-display text-2xl leading-tight font-black uppercase sm:text-3xl lg:text-4xl">
              What's <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">dropping.</span>
            </h2>
            <p className="text-text-dim mx-auto mt-3 max-w-md text-sm sm:text-base">
              A taste of the squad-built work landing in Season 1.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {PREVIEW.map((p) => (
              <div
                key={p.code}
                className="neon-border group relative overflow-hidden rounded-2xl p-5 sm:p-6"
              >
                <div
                  className={`pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-gradient-to-br ${p.accent} opacity-15 blur-2xl transition-opacity duration-500 group-hover:opacity-35`}
                />
                <div className="relative flex items-start gap-4">
                  <div
                    className={`font-display flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${p.accent} text-xs font-black text-white shadow-lg`}
                  >
                    {p.code}
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-text-dim mb-1 text-[10px] tracking-[0.3em] uppercase">
                      {p.label}
                    </p>
                    <h3 className="font-display text-base font-black uppercase sm:text-lg">
                      {p.title}
                    </h3>
                    <p className="text-text-dim mt-2 text-sm leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                  <span className="font-display rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[9px] tracking-widest text-white/50 uppercase">
                    Soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ROCKET CTA ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="neon-border relative overflow-hidden rounded-3xl p-10 text-center sm:p-14">
            <div className="pointer-events-none absolute -top-32 left-1/2 size-[400px] -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-500/25 via-orange-400/15 to-violet-500/20 blur-3xl" />
            <img
              src={rocket}
              alt="Rocket"
              className="float-y mx-auto mb-6 h-40 w-auto drop-shadow-[0_0_50px_rgba(255,138,61,0.6)]"
              draggable={false}
            />
            <p className="font-display text-neon-pink mb-2 text-[10px] tracking-[0.45em] uppercase">
              <HiSparkles className="mr-1.5 inline" />
              May 2026 · T-minus
            </p>
            <h3 className="font-impact mb-4 text-2xl font-black uppercase sm:text-4xl">
              Be on the <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">first rocket.</span>
            </h3>
            <p className="text-text-dim mx-auto mb-8 max-w-md text-sm sm:text-base">
              500 founder seats. One Demo Day. Verified work that opens doors.
            </p>
            <Link to="/join">
              <Button
                rightIcon={TiLocationArrow}
                className="px-8 py-4 shadow-[0_0_40px_rgba(255,61,160,0.45)]"
              >
                Reserve My Seat
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};
