"use client";

import { useState } from "react";

const TABS = [
  { id: "all", label: "All" },
  { id: "crypto", label: "Crypto" },
  { id: "stock", label: "Stock" },
  { id: "watchlist", label: "Watchlist", soon: true },
];

export default function NewsFeed({ articles }) {
  const [tab, setTab] = useState("all");

  const filtered = tab === "all" ? articles : articles.filter((a) => a.category === tab);

  return (
    <>
      <div className="news-tabs">
        {TABS.map((t) =>
          t.soon ? (
            <span key={t.id} className="news-tab soon" title="Tez orada">
              {t.label}
            </span>
          ) : (
            <button
              key={t.id}
              className={"news-tab" + (tab === t.id ? " active" : "")}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          )
        )}
      </div>

      {filtered.length === 0 ? (
        <section className="panel">
          <div className="panel-empty">Bu bo'limda hozircha yangilik yo'q.</div>
        </section>
      ) : (
        <section className="news-grid">
          {filtered.map((a, i) => (
            <a href={a.link} key={a.link + i} target="_blank" rel="noopener noreferrer" className="news-card">
              {a.image ? (
                <div className="news-card-image">
                  <img src={a.image} alt="" loading="lazy" />
                </div>
              ) : null}
              <div className="news-card-body">
                <div className="news-card-meta">
                  <span className="news-card-source">{a.source}</span>
                  <span className="news-card-time">{a.timeAgo}</span>
                </div>
                <h3 className="news-card-title">{a.title}</h3>
                <p className="news-card-excerpt">{a.excerpt}</p>
              </div>
            </a>
          ))}
        </section>
      )}
    </>
  );
}
