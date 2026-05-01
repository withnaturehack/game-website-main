import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles, HiCheckCircle } from "react-icons/hi";
import {
  FaRocket,
  FaUsers,
  FaMedal,
  FaBolt,
  FaStar,
  FaCode,
  FaPen,
  FaPaintBrush,
  FaComments,
} from "react-icons/fa";

import squad from "@/assets/characters/squad.png";
import mentor from "@/assets/characters/mentor.png";
import aibot from "@/assets/characters/aibot.png";

import { Button } from "@/components/ui/button";
import { StarField } from "@/components/ui/particles";
import { CtaBanner } from "@/components/sections/cta-banner";
import { BADGES } from "@/constants";

const logo = "/img/logo.png";

const ROLES = [
  {
    icon: FaCode,
    title: "Builder",
    desc: "Engineers, researchers, and makers who ship real products during the season.",
    color: "from-pink-500 to-orange-400",
    border: "border-pink-500/30",
    glow: "rgba(255,61,160,0.3)",
  },
  {
    icon: FaPaintBrush,
    title: "Designer",
    desc: "Visual artists, UI/UX designers, and brand specialists who make ideas beautiful.",
    color: "from-violet-500 to-blue-500",
    border: "border-violet-500/30",
    glow: "rgba(139,92,246,0.3)",
  },
  {
    icon: FaPen,
    title: "Content Creator",
    desc: "Writers, video producers, and social storytellers who amplify the mission.",
    color: "from-cyan-400 to-violet-500",
    border: "border-cyan-500/30",
    glow: "rgba(56,240,255,0.3)",
  },
  {
    icon: FaComments,
    title: "Community Manager",
    desc: "Connectors, discord leads, and event organizers who keep the squad thriving.",
    color: "from-orange-400 to-pink-500",
    border: "border-orange-500/30",
    glow: "rgba(255,138,61,0.3)",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Apply & Get Accepted",
    desc: "Submit your role, skills, and vision. Our team reviews every application. No résumé needed — we evaluate based on what you want to build.",
    icon: FaRocket,
    color: "from-pink-500 to-orange-400",
  },
  {
    step: "02",
    title: "Join Your Squad",
    desc: "Get matched with builders, designers, and mentors who complement your skills. Collaborate on real missions across 12 weeks of the founding season.",
    icon: FaUsers,
    color: "from-violet-500 to-blue-500",
  },
  {
    step: "03",
    title: "Earn Verified Badges",
    desc: "Every mission you complete earns cryptographically signed badges. Permanent proof of your skills that recruiters and companies actually trust.",
    icon: FaMedal,
    color: "from-cyan-400 to-violet-500",
  },
];

const STATS = [
  { value: "500", label: "Founding Seats", icon: FaStar, color: "text-pink-400" },
  { value: "12", label: "Week Season", icon: FaBolt, color: "text-violet-400" },
  { value: "May 2026", label: "Launch Date", icon: FaRocket, color: "text-cyan-400" },
  { value: "100%", label: "Proof-based", icon: FaMedal, color: "text-orange-400" },
];

const PERKS = [
  "Access to live mission queue from day one",
  "Direct mentor pairing with verified industry experts",
  "Cryptographic badges for every mission completed",
  "Public portfolio auto-generated from your work",
  "Priority access to company draft pipeline",
  "Season 1 Founder status — permanent recognition",
];

export const Nation = () => {
  return (
    <>
      {/* ─── HERO ────────────────────────────────────────────── */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden pt-32 pb-24">
        <StarField count={50} />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-20" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 bg-gradient-to-b from-violet-500/20 via-pink-500/10 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-pink-500/12 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tl from-violet-500/12 to-transparent blur-3xl" />

        {/* Characters — desktop only */}
        <div className="float-slow pointer-events-none absolute -bottom-4 left-0 z-10 hidden lg:block xl:-left-20 2xl:-left-32">
          <img
            src={squad}
            alt="Squad"
            className="h-[52vh] max-h-[480px] w-auto drop-shadow-[0_0_40px_rgba(255,61,160,0.4)]"
            draggable={false}
          />
        </div>
        <div className="float-y pointer-events-none absolute right-0 bottom-0 z-10 hidden lg:block xl:-right-10 2xl:-right-20">
          <img
            src={mentor}
            alt="Mentor"
            className="h-[54vh] max-h-[500px] w-auto drop-shadow-[0_0_40px_rgba(139,92,246,0.45)]"
            draggable={false}
          />
        </div>

        <div className="relative z-20 mx-auto max-w-3xl px-6 text-center">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 scale-110 rounded-2xl bg-gradient-to-tr from-pink-500 via-orange-400 to-violet-500 opacity-50 blur-xl" />
              <img
                src={logo}
                alt="CoLab Nation"
                className="relative h-16 w-16 rounded-2xl object-contain sm:h-20 sm:w-20"
              />
            </div>
          </div>

          <div className="font-display mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-5 py-2 text-[10px] tracking-[0.4em] text-violet-200 uppercase backdrop-blur-md">
            <span className="size-1.5 animate-pulse rounded-full bg-violet-400" />
            Founding Season · May 2026
            <HiSparkles className="size-3 text-violet-300" />
          </div>

          <h1 className="font-impact mb-5 text-[clamp(2.8rem,9vw,6.5rem)] leading-[0.9] tracking-tight uppercase">
            <span className="block bg-gradient-to-r from-pink-400 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
              Build Together.
            </span>
            <span className="block bg-gradient-to-r from-violet-400 via-pink-300 to-violet-400 bg-clip-text text-transparent">
              Prove Everything.
            </span>
          </h1>

          <p className="text-text-dim mx-auto mb-8 max-w-lg text-sm leading-relaxed sm:text-base">
            CoLab Nation is where ambitious builders, designers, and creators
            join real squads, ship real work, and earn verified proof of their
            skills — no résumé required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/join">
              <Button
                rightIcon={TiLocationArrow}
                className="px-7 py-3.5 shadow-[0_0_40px_rgba(255,61,160,0.4)]"
              >
                Claim Your Seat
              </Button>
            </Link>
            <Link to="/programs">
              <Button variant="ghost" className="px-7 py-3.5">
                Explore Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ────────────────────────────────────── */}
      <section className="border-y border-white/[0.07] bg-white/[0.02] py-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2 text-center">
                <s.icon className={`text-xl ${s.color}`} />
                <p className={`font-impact text-3xl sm:text-4xl ${s.color}`}>{s.value}</p>
                <p className="font-display text-text-dim text-[10px] tracking-[0.3em] uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMMUNITY ROLES ────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <p className="font-display text-neon-pink mb-3 text-[10px] tracking-[0.45em] uppercase">
              ✦ Who Belongs Here
            </p>
            <h2 className="font-impact mb-4 text-3xl leading-tight uppercase sm:text-4xl lg:text-5xl">
              Every role.{" "}
              <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                One nation.
              </span>
            </h2>
            <p className="text-text-dim mx-auto max-w-md text-sm sm:text-base">
              CoLab Nation isn't just for coders. We're building a full creative
              ecosystem where every skill matters.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ROLES.map((r) => (
              <div
                key={r.title}
                className={`neon-border group relative overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-gradient-to-br ${r.color} opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-25`}
                />
                <div
                  className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${r.color}`}
                >
                  <r.icon className="text-base text-white" />
                </div>
                <h3 className="font-display mb-2 text-base font-black uppercase">
                  {r.title}
                </h3>
                <p className="text-text-dim text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ───────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/3 to-transparent" />
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <p className="font-display text-neon-violet mb-3 text-[10px] tracking-[0.45em] uppercase">
              ✦ The Process
            </p>
            <h2 className="font-impact text-3xl leading-tight uppercase sm:text-4xl lg:text-5xl">
              From application{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                to legend.
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {HOW_IT_WORKS.map((h, idx) => (
              <div key={h.step} className="neon-border relative overflow-hidden rounded-2xl p-7">
                <div
                  className={`pointer-events-none absolute -top-12 -left-12 size-40 rounded-full bg-gradient-to-br ${h.color} opacity-10 blur-3xl`}
                />
                <div className="relative">
                  <div className="mb-5 flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${h.color} shadow-lg`}
                    >
                      <h.icon className="text-lg text-white" />
                    </div>
                    <span className="font-impact text-5xl leading-none text-white/[0.07]">
                      {h.step}
                    </span>
                  </div>
                  <h3 className="font-display mb-3 text-base font-black uppercase sm:text-lg">
                    {h.title}
                  </h3>
                  <p className="text-text-dim text-sm leading-relaxed">{h.desc}</p>
                </div>
                {idx < HOW_IT_WORKS.length - 1 && (
                  <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 text-white/20 md:block">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PERKS LIST ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="font-display text-neon-cyan mb-3 text-[10px] tracking-[0.45em] uppercase">
                ✦ Founder Benefits
              </p>
              <h2 className="font-impact mb-5 text-3xl leading-tight uppercase sm:text-4xl">
                What you get as a{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                  founding member.
                </span>
              </h2>
              <p className="text-text-dim mb-8 text-sm leading-relaxed sm:text-base">
                Season 1 members get permanent Founder status and exclusive
                access to every future feature we ship. This is the ground
                floor — and there are only 500 seats.
              </p>
              <Link to="/join">
                <Button
                  rightIcon={TiLocationArrow}
                  className="px-7 py-3.5 shadow-[0_0_30px_rgba(255,61,160,0.35)]"
                >
                  Apply Now
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {PERKS.map((perk) => (
                <div
                  key={perk}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 py-4"
                >
                  <HiCheckCircle className="mt-0.5 shrink-0 text-lg text-emerald-400" />
                  <p className="text-sm leading-relaxed text-white/85">{perk}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BADGE PREVIEW ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/3 to-transparent" />
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <p className="font-display text-neon-cyan mb-3 text-[10px] tracking-[0.45em] uppercase">
              ✦ Proof System
            </p>
            <h2 className="font-impact text-3xl leading-tight uppercase sm:text-4xl lg:text-5xl">
              Badges recruiters{" "}
              <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                actually trust.
              </span>
            </h2>
            <p className="text-text-dim mx-auto mt-4 max-w-md text-sm sm:text-base">
              Cryptographically signed. Permanently on-chain. Every badge is
              tied to real work you shipped — not a quiz you passed.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {BADGES.map((b) => (
              <div
                key={b.name}
                className="neon-border group relative overflow-hidden rounded-2xl p-5 text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className={`pointer-events-none absolute -top-10 left-1/2 size-24 -translate-x-1/2 rounded-full bg-gradient-to-br ${b.color} opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-45`}
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
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="neon-border relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-500/8 via-violet-500/5 to-blue-500/8" />
            <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-500/25 to-violet-500/15 blur-3xl" />

            <img
              src={aibot}
              alt="Nova"
              className="float-y pointer-events-none mx-auto mb-6 h-20 w-auto drop-shadow-[0_0_30px_rgba(56,240,255,0.6)]"
              draggable={false}
            />

            <div className="relative">
              <p className="font-display text-neon-pink mb-3 text-[10px] tracking-[0.45em] uppercase">
                <HiSparkles className="mr-1.5 inline" />
                Only 500 Founder Seats
              </p>
              <h3 className="font-impact mb-4 text-3xl leading-tight uppercase sm:text-5xl">
                Citizenship opens{" "}
                <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                  May 2026.
                </span>
              </h3>
              <p className="text-text-dim mx-auto mb-8 max-w-md text-sm sm:text-base">
                Verified work. Direct draft to companies that hire on proof —
                not promises. Reserve your spot before they're gone.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/join">
                  <Button
                    rightIcon={TiLocationArrow}
                    className="px-8 py-4 shadow-[0_0_40px_rgba(255,61,160,0.45)]"
                  >
                    Reserve My Seat
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="ghost" className="px-8 py-4">
                    Our Story
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};
