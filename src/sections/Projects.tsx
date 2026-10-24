import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShowcaseItem, type ShowcaseLink } from '../components/Showcase';
import { asset } from '../utils/asset';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  // Opcionais: links extras e mais fotos para o slideshow
  links?: ShowcaseLink[];
  images?: string[];
  image?: string;
  cover?: string;
}

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const projects = t('projects.list', { returnObjects: true }) as Project[];

  return (
    <section
      id="projects"
      className="w-full py-20 md:py-32 flex flex-col items-center transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="text-center px-8" style={{ marginBottom: '24px' }} data-reveal>
        <h2 className="text-4xl font-bold tracking-tighter" style={{ color: 'var(--foreground)' }}>
          {t('projects.title')} <span className="text-blue-400 italic">{t('projects.subtitle')}</span>
        </h2>
      </div>

      <div className="showcase-list">
        {Array.isArray(projects) && projects.map((p, i) => {
          const images = (p.images ?? [p.cover || p.image]).filter(Boolean).map((src) => asset(src as string));
          const links = [{ label: t('projects.open'), url: p.link }, ...(p.links ?? [])];
          return (
            <ShowcaseItem
              key={p.title}
              title={p.title}
              description={p.description}
              tags={p.tech}
              images={images}
              links={links}
              reverse={i % 2 === 1}
            />
          );
        })}
      </div>

      {/* Indicador de "carregando" para os próximos projetos */}
      <div className="soon-loader" role="status" data-reveal>
        <span className="soon-loader__spinner" aria-hidden />
        <span>{t('projects.soon')}</span>
      </div>
    </section>
  );
};

export default Projects;
