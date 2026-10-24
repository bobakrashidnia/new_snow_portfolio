import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

export interface MosaicPhoto {
  src: string;
  w: number;
  h: number;
}

interface PhotoMosaicProps {
  photos: MosaicPhoto[];
  title: string;
}

const GAP = 12;

interface Row {
  items: { photo: MosaicPhoto; index: number }[];
  height: number;
}

// Linhas justificadas: cada linha preenche a largura exata, com a mesma altura em todas as fotos.
// Programação dinâmica escolhe as quebras para que todas as linhas fiquem perto da altura ideal.
const justify = (photos: MosaicPhoto[], width: number): Row[] => {
  if (!width || photos.length === 0) return [];
  const target = width >= 900 ? 250 : width >= 560 ? 200 : 150;
  const ratios = photos.map((p) => p.w / p.h);
  const n = photos.length;
  const best = new Array(n + 1).fill(Infinity);
  const from = new Array(n + 1).fill(0);
  best[0] = 0;
  for (let end = 1; end <= n; end++) {
    let sum = 0;
    for (let start = end - 1; start >= 0; start--) {
      sum += ratios[start];
      const h = (width - GAP * (end - start - 1)) / sum;
      if (h < target * 0.45) break;
      const cost = best[start] + (h - target) ** 2;
      if (cost < best[end]) {
        best[end] = cost;
        from[end] = start;
      }
    }
  }
  const rows: Row[] = [];
  for (let end = n; end > 0; end = from[end]) {
    const start = from[end];
    const sum = ratios.slice(start, end).reduce((a, b) => a + b, 0);
    rows.unshift({
      items: photos.slice(start, end).map((photo, k) => ({ photo, index: start + k })),
      height: (width - GAP * (end - start - 1)) / sum,
    });
  }
  return rows;
};

// Grade de fotos inteiras, sem corte e sem bordas, com o final alinhado.
// O tamanho de cada foto é conhecido de antemão, então o espaço é reservado antes de carregar.
export const PhotoMosaic: React.FC<PhotoMosaicProps> = ({ photos, title }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    setWidth(root.clientWidth);
    const ro = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  const rows = useMemo(() => justify(photos, width), [photos, width]);

  // Fotos surgem quando entram na tela (sem depender do cálculo de posição do scroll)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    root.querySelectorAll('.mosaic__tile:not(.is-in)').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rows]);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, step]);

  return (
    <>
      <div ref={rootRef} className="mosaic">
        {rows.map((row, r) => (
          <div key={r} className="mosaic__row" style={{ height: row.height }}>
            {row.items.map(({ photo, index }, k) => (
              <button
                key={photo.src}
                className="mosaic__tile"
                style={{ width: row.height * (photo.w / photo.h), transitionDelay: `${(r + k) * 60}ms` }}
                onClick={() => setOpen(index)}
                aria-label={`${title} ${index + 1}`}
              >
                <img
                  src={photo.src}
                  alt={`${title} ${index + 1}`}
                  width={photo.w}
                  height={photo.h}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        ))}
      </div>

      {open !== null && createPortal(
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true" aria-label={title}>
          <img
            key={photos[open].src}
            src={photos[open].src}
            alt={`${title} ${open + 1}`}
            className="lightbox__img"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="lightbox__btn lightbox__close" onClick={close} aria-label="Close"><FiX /></button>
          <button className="lightbox__btn lightbox__prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous"><FiChevronLeft /></button>
          <button className="lightbox__btn lightbox__next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next"><FiChevronRight /></button>
          <span className="lightbox__counter">{open + 1} / {photos.length}</span>
        </div>,
        document.body
      )}
    </>
  );
};
