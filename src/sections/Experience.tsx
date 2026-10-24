import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Timeline } from "../components/ui/timeline";
import { asset } from "../utils/asset";
import { PolaroidStack } from "../components/ui/polaroid-stack";
import { FaExternalLinkAlt } from "react-icons/fa";

const SP_IMAGES = [
  { src: asset("images/experience/sp.webp"), alt: "Preview 1" },
  { src: asset("images/experience/sp2.webp"), alt: "Preview 2" },
  { src: asset("images/experience/sp3.webp"), alt: "Preview 3" },
];

const NSC_IMAGES = [
  { src: asset("images/experience/nsc.webp"), alt: "Office entrance" },
  { src: asset("images/experience/nsc1.webp"), alt: "My first day" },
  { src: asset("images/experience/nsc2.webp"), alt: "Selfie photo in office" },
  { src: asset("images/experience/nsc3.webp"), alt: "Women's day" },
  { src: asset("images/experience/nsc4.webp"), alt: "Carnaval" },
  { src: asset("images/experience/nsc5.webp"), alt: "Meeting with interns" },
  { src: asset("images/experience/nsc6.webp"), alt: "Another meeting with interns" },
];

const FLEX_IMAGES: { src: string; alt: string; rotation?: number }[] = [
  { src: asset("images/experience/flex.webp"), alt: "Office entrance" },
  { src: asset("images/experience/flex2.webp"), alt: "Last day of training" },
  { src: asset("images/experience/flex3.webp"), alt: "Christmas in office" },
];

const Experience: React.FC = () => {
  const { t } = useTranslation();

  const data = useMemo(() => {
    const spTasks = t("exp.sp.tasks", { returnObjects: true }) as string[];
    const spCaptions = t("exp.sp.captions", { returnObjects: true }) as string[];
    const nscTasks = t("exp.nsc.tasks", { returnObjects: true }) as string[];
    const nscCaptions = t("exp.nsc.captions", { returnObjects: true }) as string[];
    const flexTasks = t("exp.flex.tasks", { returnObjects: true }) as string[];
    const flexCaptions = t("exp.flex.captions", { returnObjects: true }) as string[];

    const withCaptions = (
      images: { src: string; alt: string; rotation?: number }[],
      captions: string[]
    ) => images.map((img, i) => ({ ...img, caption: Array.isArray(captions) ? captions[i] : "" }));

    return [
      {
        title: "2025",
        content: (
          <div className="mb-20 md:mb-40">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
              Sistema Pet
            </h3>
            <p className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              {t("exp.sp.role")} <span className="text-sm font-normal opacity-70">— {t("exp.sp.period")}</span>
            </p>
            <ul className="space-y-3 ml-5 list-disc" style={{ color: 'var(--text-muted)' }}>
              {Array.isArray(spTasks) && spTasks.map((task, i) => (
                <li key={i} className="leading-relaxed">{task}</li>
              ))}
            </ul>
            <a
              href={t("exp.sp.docUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
              style={{ marginTop: '16px' }}
            >
              {t("exp.sp.doc")} <FaExternalLinkAlt size={12} />
            </a>

            <div className="flex justify-center -ml-20 -mr-4 md:ml-0 md:mr-0" style={{ marginTop: '30px' }}>
              <PolaroidStack images={withCaptions(SP_IMAGES, spCaptions)} />
            </div>
          </div>
        ),
      },
      {
        title: "2024",
        content: (
          <div className="mb-20 md:mb-40">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
              NSC Comunicação
            </h3>
            <p className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              {t("exp.nsc.role")} <span className="text-sm font-normal opacity-70">— {t("exp.nsc.period")}</span>
            </p>
            <ul className="space-y-3 ml-5 list-disc" style={{ color: 'var(--text-muted)' }}>
              {Array.isArray(nscTasks) && nscTasks.map((task, i) => (
                <li key={i} className="leading-relaxed">{task}</li>
              ))}
            </ul>

            <div className="flex justify-center -ml-20 -mr-4 md:ml-0 md:mr-0" style={{ marginTop: '30px' }}>
              <PolaroidStack images={withCaptions(NSC_IMAGES, nscCaptions)} />
            </div>
          </div>
        ),
      },
      {
        title: "2020",
        content: (
          <div className="mb-20 md:mb-40">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
              Flex Contact Center
            </h3>
            <p className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              {t("exp.flex.role")} <span className="text-sm font-normal opacity-70">— {t("exp.flex.period")}</span>
            </p>
            <ul className="space-y-3 ml-5 list-disc" style={{ color: 'var(--text-muted)' }}>
              {Array.isArray(flexTasks) && flexTasks.map((task, i) => (
                <li key={i} className="leading-relaxed">{task}</li>
              ))}
            </ul>

            <div className="flex justify-center -ml-20 -mr-4 md:ml-0 md:mr-0" style={{ marginTop: '30px' }}>
              <PolaroidStack images={withCaptions(FLEX_IMAGES, flexCaptions)} />
            </div>
          </div>
        ),
      },
    ];
  }, [t]);

  return (
    <section
      id="experience"
      className="py-32 flex flex-col items-center transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="w-full max-w-4xl px-4 md:px-0">
        <Timeline data={data} />
      </div>
    </section>
  );
};

export default Experience;
