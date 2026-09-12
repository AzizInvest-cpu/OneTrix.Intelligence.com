export const metadata = {
  title: "News — OneTrix Intelligence",
};

export const revalidate = 600;

const FEEDS = [
  { url: "https://cointelegraph.com/rss", source: "Cointelegraph" },
  { url: "https://www.coindesk.com/arc/outboundfeeds/rss/", source: "CoinDesk" },
];

function decodeEntities(str) {
  if (!str) return "";
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripCdata(str) {
  if (!str) return "";
  const match = str.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return match ? match[1] : str;
}

function stripHtml(str) {
  if (!str) return "";
  return decodeEntities(str.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
}

function extractTag(block, tag) {
  const re = new RegExp("<" + tag + "[^>]*>([\\s\\S]*?)</" + tag + ">", "i");
  const m = block.match(re);
  return m ? m[1].trim() : "";
}

function extractImage(block) {
  const enclosure = block.match(/<enclosure[^>]*url=["']([^"']+)["'][^>]*>/i);
  if (enclosure) return enclosure[1];
  const media = block.match(/<media:content[^>]*url=["']([^"']+)["'][^>]*>/i);
  if (media) return media[1];
  const imgInDesc = block.match(/<img[^>]*src=["']([^"']+)["'][^>]*>/i);
  if (imgInDesc) return imgInDesc[1];
  return null;
}

function excerpt(text, maxLen) {
  if (!text) return "";
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trim() + "…";
}

function timeAgo(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return mins + " daqiqa oldin";
  const hours = Math.floor(mins / 60);
  if (hours < 24) return hours + " soat oldin";
  const days = Math.floor(hours / 24);
  return days + " kun oldin";
}

async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      next: { revalidate: 600 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; OneTrixBot/1.0)" },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
    return items.map((block) => {
      const rawTitle = extractTag(block, "title");
      const rawDesc = extractTag(block, "description");
      const link = stripCdata(extractTag(block, "link")).trim();
      const pubDate = extractTag(block, "pubDate");
      const title = stripHtml(stripCdata(rawTitle));
      const desc = stripHtml(stripCdata(rawDesc));
      const image = extractImage(block);
      return {
        title,
        link,
        pubDate,
        excerpt: excerpt(desc, 140),
        image,
        source: feed.source,
      };
    });
  } catch (err) {
    return [];
  }
}

async function getNews() {
  const results = await Promise.all(FEEDS.map(fetchFeed));
  const all = results.flat().filter((a) => a.title && a.link);
  all.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  return all;
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
          {top.map((a, i) => (
            <a href={a.link} key={a.link + i} target="_blank" rel="noopener noreferrer" className="news-card">
              {a.image ? (
                <div className="news-card-image">
                  <img src={a.image} alt="" loading="lazy" />
                </div>
              ) : null}
              <div className="news-card-body">
                <div className="news-card-meta">
                  <span className="news-card-source">{a.source}</span>
                  <span className="news-card-time">{timeAgo(a.pubDate)}</span>
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
