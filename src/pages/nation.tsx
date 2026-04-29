import squad from "@/assets/characters/squad.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StarField } from "@/components/ui/particles";

export const Nation = () => {
  return (
    <>
      {/* ─── NATION COMING SOON ──────────────────────────────── */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center py-32">
        <StarField count={60} />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-15" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-100 w-150 -translate-x-1/2 bg-linear-to-b from-violet-500/15 via-pink-500/10 to-transparent blur-3xl" />
        {/* Animated character */}
        <img
          src={squad}
          alt="Squad Character"
          className="animate-float pointer-events-none absolute bottom-0 left-10 hidden h-64 w-auto drop-shadow-xl md:block"
          style={{ animationDuration: "4s" }}
        />
        <div className="relative z-10 text-center">
          <h1 className="font-impact gradient-text mb-6 text-5xl font-black tracking-tight uppercase sm:text-7xl">
            Nation Section
          </h1>
          <p className="text-text-dim mb-8 text-xl sm:text-2xl">
            Launching May 2026. The next era of community is almost here.
          </p>
          <Link to="/join">
            <Button className="px-8 py-4 text-lg">Get Early Access</Button>
          </Link>
        </div>
      </section>
    </>
  );
};
