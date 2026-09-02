"use client";

import { useLayoutEffect, useState } from "react";

const STORAGE_KEY = "onetrix-intro-seen";

const navItems = ["Dashboard", "Markets", "Watchlist", "News", "Intelligence", "Signals", "Correlation"];

export default function IntroSplash() {
  const [phase, setPhase] = useState("visible");

  useLayoutEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) {
        setPhase("hidden");
        return;
      }
    } catch (e) {}
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
    <div className={"intro-splash" + (phase === "hiding" ? " intro-splash-hide" : "")}>
      <div className="intro-stars"></div>
      <div className="intro-horizon"></div>

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
        <img src="/logo.png" alt="OneTrix Intelligence" className="intro-logo" />
        <div className="intro-title">
          <span className="intro-title-one">One</span>
          <span className="intro-title-trix">Trix</span>
        </div>
        <div className="intro-subtitle">INTELLIGENCE</div>
        <div className="intro-tagline">See The Market Deeper.</div>
        <button className="intro-cta" onClick={dismiss}>
          Platformaga kirish
        </button>
      </div>
    </div>
  );
}
