import { useEffect, useState } from "react";

export interface MotionBudget {
  prefersReducedMotion: boolean;
  isLowPowerDevice: boolean;
  shouldReduceEffects: boolean;
  shouldReduceVideo: boolean;
}

const getNavigatorBoolean = (value: unknown): boolean =>
  typeof value === "boolean" ? value : false;

const getNavigatorNumber = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value) ? value : null;

export const useMotionBudget = (): MotionBudget => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;

    const update = () => setPrefersReducedMotion(mql.matches);
    update();

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mql as any).addListener?.(update);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return () => (mql as any).removeListener?.(update);
  }, []);

  useEffect(() => {
    if (typeof navigator === "undefined") return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navAny = navigator as any;

    const saveData = getNavigatorBoolean(navAny?.connection?.saveData);
    const deviceMemory = getNavigatorNumber(navAny?.deviceMemory);
    const hardwareConcurrency = getNavigatorNumber(navAny?.hardwareConcurrency);

    const lowMemory = deviceMemory !== null ? deviceMemory <= 2 : false;
    const lowCpu =
      hardwareConcurrency !== null ? hardwareConcurrency <= 2 : false;
    const mobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    setIsMobile(mobile);
    setIsLowPowerDevice(Boolean(saveData || lowMemory || lowCpu));
  }, []);

  return {
    prefersReducedMotion,
    isLowPowerDevice,
    shouldReduceEffects: prefersReducedMotion || isLowPowerDevice,
    shouldReduceVideo: prefersReducedMotion || isLowPowerDevice || isMobile,
  };
};
