"use client";

import { useLayoutEffect, useState } from "react";

const STORAGE_KEY = "onetrix-intro-seen";

const navItems = ["Dashboard", "Markets", "Watchlist", "News", "Intelligence", "Signals", "Correlation"];

export default function IntroSplash() {
  const [phase, setPhase] = useState("visible");

  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        setPhase("hidden");
        return;
      }
    } catch (e) {}
  }, []);

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {}
    setPhase("hiding");
    setTimeout(() => setPhase("hidden"), 600);
  }

  if (phase === "hidden") return null;

  return (
    <div className={"intro-splash" + (phase === "hiding" ? " intro-splash-hide" : "")}>
      <header className="intro-nav">
        <div className="intro-nav-brand">
          <img src="/logo.png" alt="OneTrix Intelligence" className="intro-nav-logo" />
          <span>OneTrix</span>
        </div>
        <nav className="intro-nav-links">
          {navItems.map((item) => (
            <button key={item} className="intro-nav-link" onClick={dismiss}>
              {item}
            </button>
          ))}
        </nav>
      </header>

      <div className="intro-content">
        <button className="intro-cta" onClick={dismiss}>
          Platformaga kirish
        </button>
      </div>
    </div>
  );
}
