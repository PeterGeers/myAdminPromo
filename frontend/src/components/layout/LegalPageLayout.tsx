"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Container from "@/components/ui/Container";

interface TocItem {
  id: string;
  label: string;
}

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  lastUpdated: string;
  effectiveDate?: string;
  intro: string;
  tocTitle: string;
  tocItems: TocItem[];
  children: React.ReactNode;
}

export default function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  effectiveDate,
  intro,
  tocTitle,
  tocItems,
  children,
}: LegalPageLayoutProps) {
  const [activeId, setActiveId] = useState(tocItems[0]?.id ?? "");
  const [tocOpen, setTocOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });
  }, [tocItems]);

  useEffect(() => {
    setupObserver();
    return () => observerRef.current?.disconnect();
  }, [setupObserver]);

  const scrollTo = (id: string) => {
    setTocOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-off-white">
      {/* Header */}
      <div className="bg-off-white py-12">
        <Container>
          <h1 className="font-heading text-3xl font-extrabold text-deep-blue sm:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-lg text-gray-500">{subtitle}</p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            {lastUpdated}
            {effectiveDate && <> · {effectiveDate}</>}
          </p>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            {intro}
          </p>
        </Container>
      </div>

      <div className="bg-white py-12">
        <Container>
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
            {/* Mobile TOC dropdown */}
            <div className="mb-8 lg:hidden">
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700"
                aria-expanded={tocOpen}
              >
                {tocTitle}
                <svg
                  className={`h-5 w-5 transition-transform ${tocOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {tocOpen && (
                <nav className="mt-2 rounded-lg border border-gray-200 bg-white p-3">
                  <ul className="space-y-1">
                    {tocItems.map(({ id, label }) => (
                      <li key={id}>
                        <button
                          onClick={() => scrollTo(id)}
                          className={`block w-full rounded px-3 py-1.5 text-left text-sm transition-colors ${
                            activeId === id
                              ? "bg-brand-blue/10 font-medium text-brand-blue"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>

            {/* Desktop sticky sidebar */}
            <aside className="hidden lg:block">
              <nav className="sticky top-24">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {tocTitle}
                </p>
                <ul className="space-y-1 border-l border-gray-200">
                  {tocItems.map(({ id, label }) => (
                    <li key={id}>
                      <button
                        onClick={() => scrollTo(id)}
                        className={`block w-full border-l-2 py-1.5 pl-4 text-left text-sm transition-colors ${
                          activeId === id
                            ? "border-brand-blue font-medium text-brand-blue"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Content */}
            <div className="max-w-3xl space-y-12">{children}</div>
          </div>
        </Container>
      </div>
    </main>
  );
}
