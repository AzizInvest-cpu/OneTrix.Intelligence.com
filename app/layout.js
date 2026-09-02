import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";
import NavLinks from "./components/NavLinks";
import IntroSplash from "./components/IntroSplash";

export const metadata = {
  title: "OneTrix Intelligence",
  description: "AI-powered crypto and stock market intelligence platform.",
};

const navSections = [
  {
    title: "OVERVIEW",
    items: [
      { label: "Dashboard", href: "/" },
      { label: "Markets", soon: true },
      { label: "Watchlist", soon: true },
    ],
  },
  {
    title: "RESEARCH",
    items: [
      { label: "News", href: "/news" },
      { label: "Intelligence", soon: true },
    ],
  },
  {
    title: "ANALYTICS",
    items: [
      { label: "Signals", soon: true },
      { label: "Correlation", soon: true },
    ],
  },
];

const themeInitScript = `
(function() {
  try {
    var saved = localStorage.getItem("onetrix-theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon-32.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <IntroSplash />
        <div className="app-shell">
          <aside className="sidebar">
            <div className="brand">
              <img src="/logo.png" alt="OneTrix Intelligence" className="brand-mark" />
              <div>
                <div className="brand-name">OneTrix Intelligence</div>
                <div className="brand-tagline">ONE PLATFORM. EVERY MARKET.</div>
              </div>
            </div>
            <NavLinks sections={navSections} />
          </aside>

          <div className="content">
            <header className="topbar">
              <input className="search" placeholder="Search markets, assets, signals" />
              <div className="topbar-right">
                <span className="status-dot"></span>
                <span className="status-text">MARKETS OPEN</span>
                <ThemeToggle />
              </div>
            </header>

            <main className="main">{children}</main>

            <footer className="footer">
              <div>OneTrix Intelligence — demo data, real-time feeds coming soon</div>
              <div className="footer-credit">
                Azizbek Mehmonov · Founder &amp; Researcher · Telegram:{" "}
                <a href="https://t.me/AzizbekMehmonov" target="_blank" rel="noopener noreferrer">
                  @AzizbekMehmonov
                </a>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
