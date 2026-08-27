const tickers = [
  { symbol: "BTC", price: "$118,420", change: 2.41 },
  { symbol: "ETH", price: "$4,320", change: 1.82 },
  { symbol: "NASDAQ", price: "23,450", change: 0.71 },
  { symbol: "GOLD", price: "$3,420", change: -0.24 },
];

const news = [
  {
    id: "1",
    headline: "Fed keeps interest rates unchanged",
    time: "2 soat oldin",
    tags: [
      { label: "Stocks", sentiment: "bullish" },
      { label: "Crypto", sentiment: "neutral" },
      { label: "USD", sentiment: "bearish" },
    ],
  },
  {
    id: "2",
    headline: "Bitcoin ETF inflows hit weekly high",
    time: "4 soat oldin",
    tags: [
      { label: "BTC", sentiment: "bullish" },
      { label: "Altcoins", sentiment: "bullish" },
    ],
  },
  {
    id: "3",
    headline: "Oil prices slip on oversupply concerns",
    time: "6 soat oldin",
    tags: [
      { label: "Energy", sentiment: "bearish" },
      { label: "Inflation", sentiment: "neutral" },
    ],
  },
];

const signals = [
  { label: "Risk sentiment", value: "72 / 100", sentiment: "bullish" },
  { label: "BTC trend", value: "Bullish", sentiment: "bullish" },
  { label: "Stock trend", value: "Bullish", sentiment: "bullish" },
  { label: "USD trend", value: "Bearish", sentiment: "bearish" },
];

const whaleEvents = [
  { id: "1", description: "$250M BTC transferred to Binance", time: "18 daqiqa oldin", impact: "bearish" },
  { id: "2", description: "50M USDT minted on Tron", time: "1 soat oldin", impact: "neutral" },
  { id: "3", description: "1,200 BTC moved from exchange to cold wallet", time: "3 soat oldin", impact: "bullish" },
];

export default function Home() {
  return (
    <div>
      <header className="header">
        <div className="logo">
          OneTrix <span>Intelligence</span>
        </div>
        <nav className="nav">
          <span style={{ color: "#f1f5f9" }}>Crypto</span>
          <span>Stocks</span>
          <span>News</span>
        </nav>
      </header>

      <main className="main">
        <section className="ticker-grid">
          {tickers.map((t) => (
            <div key={t.symbol} className="card">
              <div className="ticker-symbol">{t.symbol}</div>
              <div className="ticker-price">{t.price}</div>
              <div className={"ticker-change " + (t.change >= 0 ? "up" : "down")}>
                {t.change >= 0 ? "+" : ""}
                {t.change}%
              </div>
            </div>
          ))}
        </section>

        <section className="panel">
          <div className="panel-title">Top market news</div>
          {news.map((n) => (
            <div key={n.id} className="panel-row">
              <div className="row-top">
                <p className="headline">{n.headline}</p>
                <span className="time">{n.time}</span>
              </div>
              <div className="tags">
                {n.tags.map((tag) => (
                  <span key={tag.label} className={"tag " + tag.sentiment}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="two-col">
          <section className="panel">
            <div className="panel-title">Market signals</div>
            {signals.map((s) => (
              <div key={s.label} className="signal-row">
                <span className="signal-label">{s.label}</span>
                <span className="signal-value">
                  <span className={"dot " + s.sentiment}></span>
                  {s.value}
                </span>
              </div>
            ))}
          </section>

          <section className="panel">
            <div className="panel-title">Whale activity</div>
            {whaleEvents.map((w) => (
              <div key={w.id} className="panel-row">
                <div className="row-top">
                  <span className="headline">{w.description}</span>
                  <span className={"dot " + w.impact}></span>
                </div>
                <span className="time">{w.time}</span>
              </div>
            ))}
          </section>
        </div>
      </main>

      <footer className="footer">
        OneTrix Intelligence — demo data, real-time feeds coming soon
      </footer>
    </div>
  );
}
