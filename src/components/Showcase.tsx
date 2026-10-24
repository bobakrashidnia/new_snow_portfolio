import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { PhotoMosaic, type MosaicPhoto } from './PhotoMosaic';

gsap.registerPlugin(ScrollTrigger);

export interface ShowcaseLink {
  label: string;
  url: string;
}

export interface ShowcaseItemProps {
  title: string;
  subtitle?: string;
  description: string;
  images: string[];
  tags?: string[];
  details?: { label: string; value: string }[];
  links?: ShowcaseLink[];
  // cover: preenche o quadro (capas); contain: mostra a foto inteira (fotos e certificados)
  fit?: 'cover' | 'contain';
  reverse?: boolean;
  autoPlay?: boolean;
  // mosaic: texto em cima e todas as fotos inteiras numa grade embaixo (em vez do slideshow)
  mosaic?: MosaicPhoto[];
}

const isRealLink = (url?: string) => !!url && url !== '#';

// Item em duas colunas (foto + texto) que aparece acompanhando o scroll
export const ShowcaseItem: React.FC<ShowcaseItemProps> = ({
  title, subtitle, description, images, tags, details, links = [], fit = 'cover', reverse, autoPlay = true, mosaic,
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  // Capas (fit cover): o quadro assume a proporção da própria imagem, que aparece inteira sem corte
  const [ratio, setRatio] = useState<number | null>(null);
  const validLinks = links.filter((l) => isRealLink(l.url));
  const primary = validLinks[0];
  const multi = !mosaic && images.length > 1;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = root.querySelector('.showcase__media');
    const texts = root.querySelectorAll('.showcase__reveal');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 88%', end: 'top 45%', scrub: 1 },
      });
      if (media) {
        tl.fromTo(media,
          { clipPath: 'inset(12% 12% 12% 12% round 20px)', scale: 0.92, opacity: 0.2 },
          { clipPath: 'inset(0% 0% 0% 0% round 20px)', scale: 1, opacity: 1, ease: 'power2.out' });
      }
      tl.fromTo(texts,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, ease: 'power2.out' }, 0.1);
    }, root);

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(root);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  // Altura do item muda quando a capa carrega: recalcula as posições do scroll
  useEffect(() => {
    if (ratio) ScrollTrigger.refresh();
  }, [ratio]);

  // Slideshow só roda com o item visível e sem o mouse em cima
  useEffect(() => {
    if (!multi || !autoPlay || !inView || hovered) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 3500);
    return () => clearInterval(id);
  }, [multi, autoPlay, inView, hovered, images.length]);

  const go = (delta: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIndex((i) => (i + delta + images.length) % images.length);
  };

  // Clicar na foto abre o link principal; sem link, avança as fotos
  const onMediaClick = () => {
    if (primary) window.open(primary.url, '_blank', 'noopener,noreferrer');
    else if (multi) setIndex((i) => (i + 1) % images.length);
  };

  // Inclinação 3D seguindo o mouse (via variáveis CSS, sem re-render)
  const onVisualMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
    el.style.setProperty('--rx', `${(0.5 - (e.clientY - r.top) / r.height) * 8}deg`);
  };
  const onVisualLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--ry', '0deg');
    e.currentTarget.style.setProperty('--rx', '0deg');
  };

  // Monta apenas a foto atual, a anterior (para o fade) e a próxima (pré-carregada)
  const near = (i: number) => {
    const d = (i - index + images.length) % images.length;
    return d === 0 || d === 1 || d === images.length - 1;
  };

  return (
    <article ref={rootRef} className={`showcase${reverse ? ' showcase--reverse' : ''}${mosaic ? ' showcase--stacked' : ''}`}>
      {!mosaic && (
        <div className="showcase__visual" onMouseMove={onVisualMove} onMouseLeave={onVisualLeave}>

          <div
            className={`showcase__media${primary || multi ? ' cursor-pointer' : ''}`}
            onClick={onMediaClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            role={primary ? 'link' : undefined}
            aria-label={primary ? `${title} — ${primary.label}` : undefined}
            style={fit === 'cover' && ratio ? { aspectRatio: String(ratio) } : undefined}
          >
            {images.map((src, i) => near(i) && (
              <img
                key={src}
                src={src}
                alt={`${title} ${i + 1}`}
                loading="lazy"
                decoding="async"
                draggable={false}
                onLoad={fit === 'cover' && i === 0 ? (e) => {
                  const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
                  if (w && h) setRatio(Math.min(2.2, Math.max(0.8, w / h)));
                } : undefined}
                className={`showcase__img showcase__img--${fit}${i === index ? ' is-active' : ''}`}
              />
            ))}

            {primary && (
              <span className="showcase__open">
                {primary.label} <FiArrowUpRight />
              </span>
            )}

            {multi && (
              <>
                <button className="showcase__nav showcase__nav--prev" onClick={go(-1)} aria-label="Previous">
                  <FiChevronLeft />
                </button>
                <button className="showcase__nav showcase__nav--next" onClick={go(1)} aria-label="Next">
                  <FiChevronRight />
                </button>
                <span className="showcase__counter">{index + 1} / {images.length}</span>
              </>
            )}
          </div>
        </div>
      )}

      <div className="showcase__body">
        {subtitle && <p className="showcase__reveal showcase__subtitle">{subtitle}</p>}
        <h3 className="showcase__reveal showcase__title">{title}</h3>

        {details && details.length > 0 && (
          <dl className="showcase__reveal showcase__details">
            {details.map((d) => (
              <div key={d.label}>
                <dt>{d.label}</dt>
                <dd>{d.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <p className="showcase__reveal showcase__desc">{description}</p>

        {tags && tags.length > 0 && (
          <div className="showcase__reveal showcase__tags">
            {tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        )}

        {/* O link principal fica na imagem; aqui só os links extras */}
        {validLinks.length > 1 && (
          <div className="showcase__reveal showcase__links">
            {validLinks.slice(1).map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="showcase__link"
              >
                {l.label} <FiArrowUpRight />
              </a>
            ))}
          </div>
        )}
      </div>

      {mosaic && <PhotoMosaic photos={mosaic} title={title} />}
    </article>
  );
};
