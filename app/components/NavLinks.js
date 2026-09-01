"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({ sections }) {
  const pathname = usePathname();

  return (
    <>
      {sections.map((section) => (
        <div className="nav-section" key={section.title}>
          <div className="nav-section-title">{section.title}</div>
          {section.items.map((item) =>
            item.soon ? (
              <div key={item.label} className="nav-item soon">
                <span>{item.label}</span>
                <span className="nav-soon-badge">Soon</span>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={"nav-item" + (pathname === item.href ? " active" : "")}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      ))}
    </>
  );
}
