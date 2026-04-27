import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageShell } from "@/components/layout/page-shell";
import { OpeningAnimation } from "@/components/intro/opening-animation";

import { Landing } from "@/pages/landing";
import { About } from "@/pages/about";
import { Platform } from "@/pages/platform";
import { Nation } from "@/pages/nation";
import { Join } from "@/pages/join";
import { Programs } from "@/pages/programs";
import { Projects } from "@/pages/projects";
import { Admin } from "@/pages/admin";

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
      <AnimatePresence mode="wait">
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
