export const metadata = {
  title: "News — OneTrix Intelligence",
};

export const revalidate = 300;

function timeAgo(unixSeconds) {
  const diffMs = Date.now() - unixSeconds * 1000;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return mins + " daqiqa oldin";
  const hours = Math.floor(mins / 60);
  if (hours < 24) return hours + " soat oldin";
  const days = Math.floor(hours / 24);
  return days + " kun oldin";
}

function excerpt(text, maxLen) {
  if (!text) return "";
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen).trim() + "…";
}

async function getNews() {
  try {
    const res = await fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN", {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.Data || [];
  } catch (err) {
    return [];
  }
}

export default async function NewsPage() {
  const articles = await getNews();
  const top = articles.slice(0, 24);

  return (
    <>
      <div className="page-heading">
        <h1>Market News</h1>
        <p className="page-sub">LIVE FEED · AGGREGATED FROM CRYPTO NEWS SOURCES</p>
      </div>

      {top.length === 0 ? (
        <section className="panel">
          <div className="panel-empty">
            Yangiliklarni yuklab bo'lmadi. Birozdan so'ng qayta urinib ko'ring.
          </div>
        </section>
      ) : (
        <section className="news-grid">
          {top.map((a) => (
            <a href={a.url} key={a.id || a.guid} target="_blank" rel="noopener noreferrer" className="news-card">
              {a.imageurl ? (
                <div className="news-card-image">
                  <img src={a.imageurl} alt="" loading="lazy" />
                </div>
              ) : null}
              <div className="news-card-body">
                <div className="news-card-meta">
                  <span className="news-card-source">{a.source_info?.name || a.source}</span>
                  <span className="news-card-time">{timeAgo(a.published_on)}</span>
                </div>
                <h3 className="news-card-title">{a.title}</h3>
                <p className="news-card-excerpt">{excerpt(a.body, 140)}</p>
              </div>
            </a>
          ))}
        </section>
      )}
    </>
  );
}
