import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { asset } from "../utils/asset";
import { ShowcaseItem, type ShowcaseItemProps } from "../components/Showcase";
import type { MosaicPhoto } from "../components/PhotoMosaic";
import { FaLinkedin } from "react-icons/fa";

// Tamanho real de cada foto: o mosaico reserva o espaço antes de carregar
const SW_PHOTOS: MosaicPhoto[] = [
  { src: asset("images/achievements/swfoto1.webp"), w: 1086, h: 1057 },
  { src: asset("images/achievements/sw.webp"), w: 900, h: 1200 },
  { src: asset("images/achievements/sw2.webp"), w: 1200, h: 800 },
  { src: asset("images/achievements/sw3.webp"), w: 900, h: 1200 },
  { src: asset("images/achievements/sw4.webp"), w: 1200, h: 675 },
  { src: asset("images/achievements/sw5.webp"), w: 900, h: 1200 },
  { src: asset("images/achievements/sw6.webp"), w: 800, h: 1200 },
  { src: asset("images/achievements/sw7.webp"), w: 1200, h: 800 },
  { src: asset("images/achievements/swfoto2.webp"), w: 900, h: 1200 },
  { src: asset("images/achievements/swfoto3.webp"), w: 1200, h: 675 },
  { src: asset("images/achievements/swfoto7.webp"), w: 900, h: 1200 },
  { src: asset("images/achievements/swfoto8.webp"), w: 900, h: 1200 },
];

const CERTIFICATES: Certificate[] = [
  { name: "Recognizing Hallucinations, Inaccuracies, and Bias in AI", issuer: "Codecademy", date: "09/2026", image: asset("images/certs/codecademy-ai.webp"), url: "https://www.codecademy.com/profiles/thuanypk/certificates/1749aeec9b174fabab933fc63449bc34" },
  { name: "Cybersecurity Job Simulation", issuer: "Mastercard · Forage", date: "10/2026", image: asset("images/certs/mastercard.webp") },
  { name: "Introduction to AWS Management Console", issuer: "AWS", date: "11/2025", image: asset("images/certs/aws-console.webp") },
  { name: "PHP: Criando sua Aplicação", issuer: "Alura", date: "07/2025", image: asset("images/certs/alura-php.webp") },
  { name: "Startup Weekend Cyber Security", issuer: "Techstars", date: "05/2025", image: asset("images/certs/startup-weekend.webp") },
  { name: "Modelagem de Dados", issuer: "Fundação Bradesco", date: "03/2025", image: asset("images/certs/bradesco-modelagem.webp") },
  { name: "Design Thinking - Process", issuer: "FIAP", date: "03/2025", image: asset("images/certs/fiap-design-thinking.webp") },
  { name: "Desenvolvimento Orientado a Objetos com Python", issuer: "Fundação Bradesco", date: "03/2025", image: asset("images/certs/bradesco-poo-python.webp") },
  { name: "Introdução à Programação Orientada a Objetos (POO)", issuer: "Fundação Bradesco", date: "02/2025", image: asset("images/certs/bradesco-poo-intro.webp") },
  { name: "AI-900 - Fundamentos de IA no Azure", issuer: "Fundação Bradesco · Microsoft", date: "02/2025", image: asset("images/certs/bradesco-ai900.webp") },
  { name: "Segurança da Informação", issuer: "Uniglobo", date: "01/2025", image: asset("images/certs/uniglobo.webp") },
  { name: "Administrando Banco de Dados", issuer: "Fundação Bradesco", date: "01/2025", image: asset("images/certs/bradesco-db-admin.webp") },
  { name: "Implementando Banco de Dados", issuer: "Fundação Bradesco", date: "12/2024", image: asset("images/certs/bradesco-db-impl.webp") },
  { name: "Dominando Python e Suas Estruturas de Dados", issuer: "DIO", date: "06/2024", image: asset("images/certs/dio-python.webp") },
  { name: "Python Essencial e Desenvolvimento Colaborativo com Git", issuer: "DIO", date: "06/2024", image: asset("images/certs/dio-git.webp") },
  { name: "Jornada Python", issuer: "Hashtag Treinamentos", date: "05/2024", image: asset("images/certs/hashtag-python.webp") },
  { name: "NLW Unite - Fullstack", issuer: "Rocketseat", date: "04/2024", image: asset("images/certs/rocketseat-nlw.webp") },
  { name: "Salesforce", issuer: "Inter Flex", date: "10/2020", image: asset("images/certs/inter-salesforce.webp") },
];

const LINKEDIN_CERTS_URL = "https://www.linkedin.com/in/thuanypaulakamers/details/certifications/";

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  url?: string;
  image?: string;
}

// Duas faixas em sentidos opostos; passar o mouse pausa a faixa e mostra os detalhes
const CertRow: React.FC<{ items: Certificate[]; reverse?: boolean }> = ({ items, reverse }) => {
  const half = [...items, ...items];
  return (
    <div className="marquee-row w-full overflow-hidden">
      <div className={`marquee-track${reverse ? " reverse" : ""}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-4" style={{ paddingRight: "16px" }} aria-hidden={copy === 1}>
            {half.map((c, i) => (
              <CertCard key={`${copy}-${i}`} cert={c} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const CertCard: React.FC<{ cert: Certificate }> = ({ cert }) => {
  const Tag = cert.url ? "a" : "div";
  const linkProps = cert.url ? { href: cert.url, target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Tag
      {...linkProps}
      className="group relative shrink-0 w-72 h-44 rounded-xl overflow-hidden select-none"
      style={{ border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "#0d1117" }}
    >
      <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:blur-sm group-hover:brightness-50 group-hover:scale-105">
        {cert.image ? (
          <img src={cert.image} alt={cert.name} loading="lazy" draggable={false} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(139,92,246,0.18))" }}
          >
            <span className="text-3xl font-bold tracking-tight text-white/70">{cert.issuer}</span>
          </div>
        )}
      </div>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ padding: "16px" }}
      >
        <p className="text-white font-bold text-sm leading-snug">{cert.name}</p>
        <p className="text-xs" style={{ color: "#a5b4fc" }}>{cert.issuer}</p>
        <p className="text-xs text-white/50">{cert.date}</p>
      </div>
    </Tag>
  );
};

const Achievements: React.FC = () => {
  const { t } = useTranslation();

  // Para adicionar uma conquista: copie o objeto e preencha as traduções no i18n.ts
  const achievements: ShowcaseItemProps[] = useMemo(() => [
    {
      title: "Startup Weekend SJ",
      subtitle: t("achievements.sw.theme"),
      images: SW_PHOTOS.map((p) => p.src),
      mosaic: SW_PHOTOS,
      details: [
        { label: t("achievements.sw.placement"), value: t("achievements.sw.badge") },
        { label: "MVP", value: "VerifiCAR" },
        { label: t("achievements.sw.dateLabel"), value: t("achievements.sw.date") },
        { label: t("achievements.sw.locationLabel"), value: t("achievements.sw.location") },
      ],
      description: t("achievements.sw.description"),
    },
  ], [t]);

  return (
    <section
      id="achievements"
      className="w-full py-32 flex flex-col items-center"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="w-full">
        <div className="text-center px-8" style={{ marginBottom: '24px' }} data-reveal>
          <h2 className="text-4xl font-bold tracking-tighter" style={{ color: "var(--foreground)" }}>
            {t("achievements.title")} <span className="text-blue-400 italic">{t("achievements.subtitle")}</span>
          </h2>
        </div>

        <div className="showcase-list">
          {achievements.map((a, i) => (
            <ShowcaseItem key={a.title} {...a} reverse={i % 2 === 1} />
          ))}
        </div>

        <div style={{ marginTop: '60px' }} data-reveal>
          <h3 className="text-2xl font-bold tracking-tighter text-center" style={{ color: "var(--foreground)", marginBottom: '32px' }}>
            {t("achievements.certs.title")}
          </h3>
          <div className="flex flex-col gap-4 overflow-hidden">
            <CertRow items={CERTIFICATES} />
            <CertRow items={[...CERTIFICATES].reverse()} reverse />
          </div>
          <div className="flex justify-center" style={{ marginTop: '32px' }}>
            <a
              href={LINKEDIN_CERTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full text-sm font-semibold transition-colors hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "var(--foreground)", padding: "12px 24px" }}
            >
              <FaLinkedin /> {t("achievements.certs.linkedin")} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
