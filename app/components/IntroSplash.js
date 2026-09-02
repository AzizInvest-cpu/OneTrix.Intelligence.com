"use client";

import { useLayoutEffect, useState } from "react";

const STORAGE_KEY = "onetrix-intro-seen";

export default function IntroSplash() {
  const [phase, setPhase] = useState("visible");

  useLayoutEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) {
        setPhase("hidden");
        return;
      }
    } catch (e) {}

    const timer = setTimeout(dismiss, 4000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {}
    setPhase("hiding");
    setTimeout(() => setPhase("hidden"), 600);
  }

  if (phase === "hidden") return null;

  return (
    <div
      className={"intro-splash" + (phase === "hiding" ? " intro-splash-hide" : "")}
      onClick={dismiss}
    >
      <div className="intro-stars"></div>
      <div className="intro-horizon"></div>
      <div className="intro-content">
        <img src="/logo.png" alt="OneTrix Intelligence" className="intro-logo" />
        <div className="intro-title">
          <span className="intro-title-one">One</span>
          <span className="intro-title-trix">Trix</span>
        </div>
        <div className="intro-subtitle">INTELLIGENCE</div>
        <div className="intro-tagline">See The Market Deeper.</div>
        <div className="intro-hint">Tap anywhere to continue</div>
      </div>
    </div>
  );
}
