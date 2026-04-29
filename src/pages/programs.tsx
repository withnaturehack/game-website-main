import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi";

import builder from "@/assets/characters/builder.png";
import mentor from "@/assets/characters/mentor.png";
import aibot from "@/assets/characters/aibot.png";
import rocket from "@/assets/characters/rocket.png";

import { Button } from "@/components/ui/button";
import { StarField } from "@/components/ui/particles";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PROGRAMS } from "@/constants";

export const Programs = () => {
  return (
    <>
      {/* ─── HERO ────────────────────────────────────────────── */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden pt-32 pb-24">
        <StarField count={130} />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[520px] w-[820px] -translate-x-1/2 bg-gradient-to-b from-orange-400/20 via-pink-500/14 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-violet-500/15 to-transparent blur-3xl" />

        {/* Builder character — left, no dialogue */}
        <div className="float-y pointer-events-none absolute bottom-0 left-0 z-10 hidden lg:block xl:-left-12 2xl:-left-24">
          <img
            src={builder}
            alt="Builder"
            className="h-[58vh] max-h-[540px] w-auto drop-shadow-[0_0_50px_rgba(255,138,61,0.5)]"
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
          <div className="font-display mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/50 bg-orange-500/10 px-5 py-2 text-[10px] tracking-[0.45em] text-orange-200 uppercase backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-orange-400" />
            Coming May 2026 · Season 1
            <HiSparkles className="size-3 text-orange-300" />
          </div>

          <h1 className="font-impact mb-6 text-[clamp(2.6rem,8.5vw,6rem)] leading-[0.92] tracking-tight uppercase">
            <span className="block bg-gradient-to-r from-orange-400 via-pink-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,138,61,0.55)]">
              Season of
            </span>
            <span className="block bg-gradient-to-r from-pink-400 via-violet-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(139,92,246,0.55)]">
              Creation 2026.
            </span>
          </h1>

          <p className="font-display mx-auto mb-3 max-w-xl text-sm tracking-[0.22em] text-white/85 uppercase sm:text-base">
            The first season is being assembled.
          </p>
          <p className="text-text-dim mx-auto mb-8 max-w-md text-sm sm:text-base">
            Six guided programs. One verified launch. Reserve your seat for the
            founders' cohort.
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
            <Link to="/about">
              <Button variant="ghost" className="px-7 py-3.5">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PROGRAM PREVIEW ──────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <p className="font-display text-neon-orange mb-3 text-[10px] tracking-[0.45em] uppercase">
              ✦ Programs Lineup
            </p>
            <h2 className="font-display text-2xl leading-tight font-black uppercase sm:text-3xl lg:text-4xl">
              Six tracks. <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">One proof.</span>
            </h2>
            <p className="text-text-dim mx-auto mt-3 max-w-md text-sm sm:text-base">
              A peek at the cohorts launching in Season 1.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((p) => (
              <div
                key={p.title}
                className="neon-border group relative overflow-hidden rounded-2xl p-6"
              >
                <div
                  className={`pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-gradient-to-br ${p.color} opacity-15 blur-2xl transition-opacity duration-500 group-hover:opacity-35`}
                />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={`font-display flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${p.color} text-xl text-white shadow-lg`}
                    >
                      {p.icon}
                    </div>
                    <span className="font-display rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[9px] tracking-widest text-white/50 uppercase">
                      Soon
                    </span>
                  </div>
                  <h3 className="font-display mb-2 text-base font-black uppercase sm:text-lg">
                    {p.title}
                  </h3>
                  <p className="text-text-dim text-sm leading-relaxed">
                    {p.tagline}
                  </p>
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
            <div className="pointer-events-none absolute -top-32 left-1/2 size-[400px] -translate-x-1/2 rounded-full bg-gradient-to-br from-orange-400/25 via-pink-500/15 to-violet-500/20 blur-3xl" />
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
              Season 1 <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">opens soon.</span>
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
