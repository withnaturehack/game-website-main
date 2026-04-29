import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi";

import squad from "@/assets/characters/squad.png";
import mentor from "@/assets/characters/mentor.png";
import aibot from "@/assets/characters/aibot.png";

import { Button } from "@/components/ui/button";
import { StarField } from "@/components/ui/particles";
import { CtaBanner } from "@/components/sections/cta-banner";
import { BADGES } from "@/constants";

const PREVIEW_BEATS = [
  {
    code: "01",
    title: "Citizens Onboarding",
    desc: "Builders, designers, mentors — all welcomed in one feed.",
    accent: "from-pink-500 to-orange-400",
  },
  {
    code: "02",
    title: "Live Mission Queue",
    desc: "Pitch, build, verify, launch — five missions, one cohort.",
    accent: "from-violet-500 to-blue-500",
  },
  {
    code: "03",
    title: "Public Badge Wall",
    desc: "Cryptographically signed proof. Permanent. Verifiable.",
    accent: "from-cyan-400 to-violet-500",
  },
];

export const Nation = () => {
  return (
    <>
      {/* ─── HERO ────────────────────────────────────────────── */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden pt-32 pb-24">
        <StarField count={130} />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[520px] w-[820px] -translate-x-1/2 bg-gradient-to-b from-violet-500/22 via-pink-500/12 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-pink-500/15 to-transparent blur-3xl" />

        {/* Squad character left — no dialogue */}
        <div className="float-slow pointer-events-none absolute -bottom-4 left-0 z-10 hidden lg:block xl:-left-32 2xl:-left-40">
          <img
            src={squad}
            alt="Squad"
            className="h-[58vh] max-h-[540px] w-auto drop-shadow-[0_0_50px_rgba(255,61,160,0.45)]"
            draggable={false}
          />
        </div>

        {/* Mentor character right — no dialogue */}
        <div className="float-y pointer-events-none absolute right-0 bottom-0 z-10 hidden lg:block xl:-right-12 2xl:-right-24">
          <img
            src={mentor}
            alt="Mentor"
            className="h-[60vh] max-h-[560px] w-auto drop-shadow-[0_0_50px_rgba(139,92,246,0.55)]"
            draggable={false}
          />
        </div>

        <div className="relative z-20 mx-auto max-w-3xl px-6 text-center">
          <div className="font-display mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/50 bg-violet-500/10 px-5 py-2 text-[10px] tracking-[0.45em] text-violet-200 uppercase backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-violet-400" />
            Coming May 2026
            <HiSparkles className="size-3 text-violet-300" />
          </div>

          <h1 className="font-impact mb-6 text-[clamp(2.6rem,8.5vw,6rem)] leading-[0.92] tracking-tight uppercase">
            <span className="block bg-gradient-to-r from-pink-400 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,61,160,0.55)]">
              Find your squad.
            </span>
            <span className="block bg-gradient-to-r from-violet-400 via-pink-300 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(139,92,246,0.55)]">
              Join the nation.
            </span>
          </h1>

          <p className="font-display mx-auto mb-3 max-w-xl text-sm tracking-[0.22em] text-white/85 uppercase sm:text-base">
            The citizen layer goes live in May.
          </p>
          <p className="text-text-dim mx-auto mb-8 max-w-md text-sm sm:text-base">
            A live launch room of builders, mentors, and missions. Get early
            access — citizenship slots are limited.
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

      {/* ─── PREVIEW BEATS ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <p className="font-display text-neon-violet mb-3 text-[10px] tracking-[0.45em] uppercase">
              ✦ What's Coming
            </p>
            <h2 className="font-display text-2xl leading-tight font-black uppercase sm:text-3xl lg:text-4xl">
              The nation, <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">step by step.</span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {PREVIEW_BEATS.map((b) => (
              <div
                key={b.code}
                className="neon-border group relative overflow-hidden rounded-2xl p-6"
              >
                <div
                  className={`pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-gradient-to-br ${b.accent} opacity-15 blur-2xl transition-opacity duration-500 group-hover:opacity-35`}
                />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={`font-display flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${b.accent} text-xs font-black text-white shadow-lg`}
                    >
                      {b.code}
                    </div>
                    <span className="font-display rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[9px] tracking-widest text-white/50 uppercase">
                      Soon
                    </span>
                  </div>
                  <h3 className="font-display mb-2 text-base font-black uppercase sm:text-lg">
                    {b.title}
                  </h3>
                  <p className="text-text-dim text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BADGE PREVIEW ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/4 to-transparent" />
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <p className="font-display text-neon-cyan mb-3 text-[10px] tracking-[0.45em] uppercase">
              ✦ Badge Preview
            </p>
            <h2 className="font-display text-2xl leading-tight font-black uppercase sm:text-3xl lg:text-4xl">
              Earn what <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">recruiters trust.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {BADGES.map((b) => (
              <div
                key={b.name}
                className="neon-border group relative overflow-hidden rounded-2xl p-5 text-center"
              >
                <div
                  className={`pointer-events-none absolute -top-10 left-1/2 size-24 -translate-x-1/2 rounded-full bg-gradient-to-br ${b.color} opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-55`}
                />
                <div
                  className={`mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${b.color} text-xl text-white shadow-lg`}
                >
                  {b.icon}
                </div>
                <p className="font-display text-[11px] font-black tracking-wider uppercase">
                  {b.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CITIZENSHIP CTA ─────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="neon-border relative overflow-hidden rounded-3xl p-10 sm:p-14">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-500/8 via-violet-500/5 to-blue-500/8" />
            <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-gradient-to-br from-pink-500/25 to-transparent blur-3xl" />
            <img
              src={aibot}
              alt="Nova"
              className="float-y pointer-events-none absolute -top-6 right-8 hidden h-32 w-auto drop-shadow-[0_0_40px_rgba(56,240,255,0.6)] sm:block"
              draggable={false}
            />

            <div className="relative max-w-xl">
              <p className="font-display text-neon-pink mb-3 text-[10px] tracking-[0.45em] uppercase">
                <HiSparkles className="mr-1.5 inline" />
                Founders' Cohort
              </p>
              <h3 className="font-impact mb-4 text-2xl leading-tight font-black uppercase sm:text-4xl">
                Citizenship opens{" "}
                <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">May 2026.</span>
              </h3>
              <p className="text-text-dim mb-7 max-w-md text-sm sm:text-base">
                500 founder seats. Verified work. Direct draft to companies that
                hire on proof — not promises.
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
        </div>
      </section>

      <CtaBanner />
    </>
  );
};
