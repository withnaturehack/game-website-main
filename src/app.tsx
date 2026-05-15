import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState, lazy, Suspense } from "react";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageShell } from "@/components/layout/page-shell";
import { OpeningAnimation } from "@/components/intro/opening-animation";

const Landing = lazy(() => import("@/pages/landing").then((m) => ({ default: m.Landing })));
const About = lazy(() => import("@/pages/about").then((m) => ({ default: m.About })));
const Platform = lazy(() => import("@/pages/platform").then((m) => ({ default: m.Platform })));
const Nation = lazy(() => import("@/pages/nation").then((m) => ({ default: m.Nation })));
const Join = lazy(() => import("@/pages/join").then((m) => ({ default: m.Join })));
const Programs = lazy(() => import("@/pages/programs").then((m) => ({ default: m.Programs })));
const Projects = lazy(() => import("@/pages/projects").then((m) => ({ default: m.Projects })));
const Admin = lazy(() => import("@/pages/admin").then((m) => ({ default: m.Admin })));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const wrap = (node: React.ReactNode) => <PageShell>{node}</PageShell>;

const AnimatedRoutes = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdmin && <Navbar />}
      <Suspense fallback={null}>
        <AnimatePresence mode="sync">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={wrap(<Landing />)} />
            <Route path="/about" element={wrap(<About />)} />
            <Route path="/platform" element={wrap(<Platform />)} />
            <Route path="/programs" element={wrap(<Programs />)} />
            <Route path="/projects" element={wrap(<Projects />)} />
            <Route path="/nation" element={wrap(<Nation />)} />
            <Route path="/join" element={wrap(<Join />)} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      {!isAdmin && <Footer />}
    </>
  );
};

const App = () => {
  const [introDone, setIntroDone] = useState(false);
  const isAdminRoute = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen w-full overflow-x-hidden bg-bg text-white">
        {!isAdminRoute && <OpeningAnimation onComplete={() => setIntroDone(true)} />}
        <div
          className={
            !isAdminRoute && !introDone
              ? "pointer-events-none opacity-0 transition-opacity duration-700"
              : "opacity-100 transition-opacity duration-700"
          }
        >
          <AnimatedRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
