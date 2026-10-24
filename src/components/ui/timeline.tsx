import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !lineRef.current) return;

    const container = ref.current;
    const line = lineRef.current;

    gsap.set(line, { scaleY: 0, opacity: 0, transformOrigin: "top" });

    // scaleY em vez de height: evita recalcular layout a cada frame do scroll
    const scaleTween = gsap.to(line, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "bottom center",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    const fadeTween = gsap.to(line, {
      opacity: 1,
      duration: 0.5,
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(refreshTimeout);
      scaleTween.scrollTrigger?.kill();
      scaleTween.kill();
      fadeTween.scrollTrigger?.kill();
      fadeTween.kill();
    };
  }, []);

  return (
    <div
      className="w-full font-sans md:px-10"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Título */}
      <div className="max-w-7xl mx-auto pt-20 px-4 md:px-8 lg:px-10 text-center" style={{ marginBottom: '40px' }} data-reveal>
        <h2 className="text-4xl font-bold tracking-tighter" style={{ color: 'var(--foreground)' }}>
          {t("exp.title")} <span className="text-blue-400 italic">{t("exp.subtitle")}</span>
        </h2>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 px-4 md:px-8 lg:px-10">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10 relative"
          >
            <div className="relative flex flex-col md:flex-row z-40 items-center top-0 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Bolinha */}
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center md:mr-10"
                style={{ backgroundColor: 'var(--background)' }}
              >
                <div
                  className="h-4 w-4 rounded-full border p-2"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--text-muted)'
                  }}
                />
              </div>

              {/* Ano */}
              <h3
                className="hidden md:block text-xl md:text-5xl font-bold"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full" data-reveal>
              <h3
                className="md:hidden block text-2xl mb-4 text-left font-bold"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Linha animada com GSAP */}
        <div
          ref={lineRef}
          style={{ left: "19px" }}
          className="absolute top-0 h-full w-0.5 bg-linear-to-t from-purple-500 via-blue-500 to-transparent rounded-full"
        />
      </div>
    </div>
  );
};
