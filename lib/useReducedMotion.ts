"use client";

import { useSyncExternalStore } from "react";

function subscribeTo(query: string) {
  return (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}

function makeMediaQueryHook(query: string) {
  const subscribe = subscribeTo(query);
  const getSnapshot = () => window.matchMedia(query).matches;
  // SSR has no media query to check — assume the more common case so
  // server and first client render agree, avoiding a hydration mismatch.
  const getServerSnapshot = () => false;

  return () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const usePrefersReducedMotion = makeMediaQueryHook(
  "(prefers-reduced-motion: reduce)"
);

export const useIsTouchDevice = makeMediaQueryHook("(pointer: coarse)");
