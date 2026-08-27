import "./globals.css";

export const metadata = {
  title: "OneTrix Intelligence",
  description: "AI-powered crypto and stock market intelligence platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
