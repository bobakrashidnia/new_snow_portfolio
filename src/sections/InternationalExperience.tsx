import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import Globe from "../components/Globe";
import { asset } from "../utils/asset";

interface JobData {
  period: string;
  role: string;
  company?: string;
  description?: string;
}

interface CountryInfo {
  countryKey: string;
  jobsKey: string;
  images: string[];
}

const COUNTRIES: Record<string, CountryInfo> = {
  brazil: {
    countryKey: "intl.brazil",
    jobsKey: "intl.brazil.jobs",
    images: [
      asset("images/international/shopping.jpg"),
      asset("images/international/chocolate.jpg"),
      asset("images/international/cacaushow.jpg"),
    ],
  },
  portugal: {
    countryKey: "intl.portugal",
    jobsKey: "intl.portugal.jobs",
    images: [
      asset("images/international/talenter1.jpg"),
      asset("images/international/talenter2.jpg"),
      asset("images/international/talenter3.jpg"),
      asset("images/international/talenter4.jpg"),
      asset("images/international/hanon1.jpg"),
      asset("images/international/hanon2.jpg"),
      asset("images/international/hanon3.jpg"),
      asset("images/international/hanon4.webp"),
    ],
  },
  germany: {
    countryKey: "intl.germany",
    jobsKey: "intl.germany.jobs",
    images: [
      asset("images/international/amzfoto.jpg"),
    ],
  },
};

// "2023-24" -> [2023, 2024]; "2022" -> [2022, 2022]
const parsePeriod = (period: string): [number, number] => {
  const [a, b] = period.split("-");
  const start = Number(a);
  const end = b ? Number(b.length === 2 ? a.slice(0, 2) + b : b) : start;
  return [start, end];
};

const periodRange = (jobs: JobData[]) => {
  if (!Array.isArray(jobs) || jobs.length === 0) return "";
  const years = jobs.flatMap((j) => parsePeriod(j.period)).filter((n) => !Number.isNaN(n));
  const min = Math.min(...years);
  const max = Math.max(...years);
  return min === max ? String(min) : `${min} – ${max}`;
};

// "Empresa — Cidade" vira empresa e local separados
const splitCompany = (company = "") => {
  const i = company.lastIndexOf(" — ");
  return i < 0 ? { name: company, place: "" } : { name: company.slice(0, i), place: company.slice(i + 3) };
};

const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const InternationalExperience: React.FC = () => {
  const { t } = useTranslation();
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [globeSize, setGlobeSize] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 640 ? 320 : 600
  );

  useEffect(() => {
    const onResize = () => setGlobeSize(window.innerWidth < 640 ? 320 : 600);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const active = activeCountry ? COUNTRIES[activeCountry] : null;
  const jobs = useMemo(
    () => (active ? (t(active.jobsKey, { returnObjects: true }) as JobData[]) : []),
    [active, t]
  );

  const handleMarkerClick = useCallback((id: string) => {
    setActiveCountry(id);
    setSlideIndex(0);
  }, []);

  const closeModal = useCallback(() => setActiveCountry(null), []);

  const total = active?.images.length ?? 0;
  const step = useCallback(
    (delta: number) => setSlideIndex((i) => (total ? (i + delta + total) % total : 0)),
    [total]
  );

  // Trava o scroll da página e liga os atalhos de teclado enquanto o painel está aberto
  useEffect(() => {
    if (!activeCountry) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeCountry, closeModal, step]);

  const yearRange = useMemo(() => periodRange(jobs), [jobs]);
  const globeLabels = useMemo(
    () => Object.fromEntries(Object.entries(COUNTRIES).map(([id, c]) => [id, t(c.countryKey)])),
    [t]
  );

  return (
    <section
      id="international"
      className="py-32 flex flex-col items-center"
      style={{ backgroundColor: "var(--background)", position: "relative", zIndex: 1 }}
    >
      <div className="text-center px-8" data-reveal>
        <h2 className="text-4xl font-bold tracking-tighter" style={{ color: "var(--foreground)" }}>
          {t("intl.title")} <span className="text-blue-400 italic">{t("intl.subtitle")}</span>
        </h2>
      </div>

      <div className="flex justify-center px-4" data-reveal>
        <Globe size={globeSize} onMarkerClick={handleMarkerClick} labels={globeLabels} />
      </div>

      {/* Painel do país: fotos em formato stories + experiências em cards */}
      {active && createPortal(
        <div className="intl-modal" onClick={closeModal} role="dialog" aria-modal="true" aria-label={t(active.countryKey)}>
          <div className="intl-modal__card" onClick={(e) => e.stopPropagation()}>
            <button className="intl-modal__close" onClick={closeModal} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <div
              className="intl-story"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {active.images.map((src, i) => {
                const d = (i - slideIndex + total) % total;
                if (d !== 0 && d !== 1 && d !== total - 1) return null;
                return (
                  <img
                    key={src}
                    src={src}
                    alt={`${t(active.countryKey)} ${i + 1}`}
                    decoding="async"
                    draggable={false}
                    className={`intl-story__img${i === slideIndex ? " is-active" : ""}`}
                  />
                );
              })}

              {total > 1 && (
                <>
                  <div className="intl-story__bars">
                    {active.images.map((src, i) => (
                      <span key={src} className="intl-story__bar">
                        <span
                          key={i === slideIndex ? `run-${slideIndex}` : "idle"}
                          className={`intl-story__fill${i < slideIndex ? " is-done" : ""}${i === slideIndex ? " is-running" : ""}`}
                          style={{ animationPlayState: paused ? "paused" : "running" }}
                          onAnimationEnd={i === slideIndex ? () => step(1) : undefined}
                        />
                      </span>
                    ))}
                  </div>
                  <button className="intl-story__tap intl-story__tap--prev" onClick={() => step(-1)} aria-label="Previous photo" />
                  <button className="intl-story__tap intl-story__tap--next" onClick={() => step(1)} aria-label="Next photo" />
                </>
              )}

              <div className="intl-story__caption">
                <p className="intl-story__eyebrow"><PinIcon /> {yearRange}</p>
                <h3 className="intl-story__country">{t(active.countryKey)}</h3>
                <p className="intl-story__meta">
                  {jobs.length} {t("intl.experiences")}
                </p>
              </div>
            </div>

            <div className="intl-jobs no-scrollbar">
              {Array.isArray(jobs) && jobs.map((job, i) => {
                const { name, place } = splitCompany(job.company);
                return (
                  <article key={`${job.role}-${i}`} className="intl-job" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
                    <div className="intl-job__top">
                      <span className="intl-job__period">{job.period}</span>
                      {place && <span className="intl-job__place"><PinIcon /> {place}</span>}
                    </div>
                    <h4 className="intl-job__role">{job.role}</h4>
                    {name && <p className="intl-job__company">{name}</p>}
                    {job.description && (
                      <ul className="intl-job__list">
                        {job.description.split(". ").filter(Boolean).map((s, j) => (
                          <li key={j}>{s.endsWith(".") ? s : `${s}.`}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default InternationalExperience;
