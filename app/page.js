import Link from "next/link";

const instruments = [
  { symbol: "BTC", name: "Bitcoin", category: "Crypto", price: "$71,482.40", change: 2.41, spread: "$28.35", trend: [40, 42, 41, 45, 43, 48, 50, 49, 53, 55, 58, 60] },
  { symbol: "ETH", name: "Ethereum", category: "Crypto", price: "$3,894.16", change: 1.62, spread: "$17.40", trend: [30, 31, 33, 32, 35, 34, 37, 39, 38, 41, 42, 44] },
  { symbol: "NDX", name: "Nasdaq 100", category: "Equity", price: "$20,418.70", change: 0.74, spread: "$9.85", trend: [50, 49, 51, 53, 52, 54, 53, 56, 55, 57, 58, 59] },
  { symbol: "SPX", name: "S&P 500", category: "Equity", price: "$5,623.11", change: 0.38, spread: "$16.30", trend: [45, 46, 45, 47, 46, 48, 47, 49, 48, 50, 49, 51] },
  { symbol: "XAU", name: "Gold", category: "Commodity", price: "$2,412.85", change: 0.92, spread: "$62.00", trend: [55, 54, 56, 55, 58, 57, 60, 59, 62, 61, 64, 65] },
  { symbol: "WTI", name: "Crude Oil", category: "Commodity", price: "$78.41", change: -1.84, spread: "$21.55", trend: [60, 58, 57, 55, 53, 54, 52, 50, 48, 47, 45, 44] },
  { symbol: "DXY", name: "US Dollar Index", category: "FX", price: "103.28", change: -0.31, spread: "$0.31", trend: [52, 51, 52, 50, 51, 49, 50, 48, 49, 47, 48, 46] },
  { symbol: "US10Y", name: "US 10Y Treasury Yield", category: "Rates", price: "4.182%", change: -0.62, spread: "0.03", trend: [58, 57, 58, 56, 57, 55, 56, 54, 55, 53, 54, 52] },
];

function Sparkline({ data, positive }) {
  const w = 100, h = 32;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return x + "," + y;
    })
    .join(" ");
  const color = positive ? "#34d399" : "#fb7185";
  const areaPoints = "0," + h + " " + points + " " + w + "," + h;
  return (
    <svg viewBox={"0 0 " + w + " " + h} className="sparkline" preserveAspectRatio="none">
      <polygon points={areaPoints} fill={color} opacity="0.12" />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

const advancers = instruments.filter((i) => i.change >= 0).length;
const decliners = instruments.length - advancers;

export default function Home() {
  return (
    <>
      <div className="page-heading">
        <h1>Market Dashboard</h1>
        <p className="page-sub">
          CROSS-ASSET OVERVIEW · SIMULATED DATASET &nbsp;·&nbsp; ADVANCERS {advancers} / DECLINERS {decliners}
        </p>
      </div>

      <section className="instrument-grid">
        {instruments.map((inst) => (
          <div key={inst.symbol} className="instrument-card">
            <div className="instrument-top">
              <div>
                <div className="instrument-symbol">{inst.symbol}</div>
                <div className="instrument-name">{inst.name}</div>
              </div>
              <span className={"badge " + (inst.change >= 0 ? "up" : "down")}>
                {inst.change >= 0 ? "▲" : "▼"}
              </span>
            </div>
            <div className="instrument-price">{inst.price}</div>
            <div className={"instrument-change " + (inst.change >= 0 ? "up" : "down")}>
              {inst.change >= 0 ? "+" : ""}
              {inst.change}%
            </div>
            <Sparkline data={inst.trend} positive={inst.change >= 0} />
            <div className="instrument-foot">
              <span>{inst.category}</span>
              <span>{inst.spread}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="panel">
        <div className="panel-title">Market overview</div>
        <table className="overview-table">
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Trend</th>
              <th>Last</th>
              <th>Chg 24h</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {instruments.map((inst) => (
              <tr key={inst.symbol}>
                <td>
                  <span className={"table-dot " + (inst.change >= 0 ? "up" : "down")}></span>
                  <span className="table-symbol">{inst.symbol}</span>
                  <span className="table-name">{inst.name}</span>
                </td>
                <td className="table-trend">
                  <Sparkline data={inst.trend} positive={inst.change >= 0} />
                </td>
                <td>{inst.price}</td>
                <td className={inst.change >= 0 ? "up" : "down"}>
                  {inst.change >= 0 ? "+" : ""}
                  {inst.change}%
                </td>
                <td className="table-category">{inst.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <div className="panel-title-row">
          <div className="panel-title">Latest market news</div>
          <Link href="/news" className="panel-link">
            View all →
          </Link>
        </div>
        <div className="panel-empty">
          Full news feed with live articles is on the <Link href="/news">News</Link> page.
        </div>
      </section>
    </>
  );
}
