import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface PolaroidStackProps {
  images: { src: string; alt: string; caption?: string; rotation?: number }[];
  autoRotate?: boolean;
  autoRotateInterval?: number;
}

export const PolaroidStack: React.FC<PolaroidStackProps> = ({ images, autoRotate = true, autoRotateInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);

  // Pausa rotação e animações quando o stack está fora da tela
  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '200px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoRotate || isHovered || !inView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [autoRotate, autoRotateInterval, images.length, isHovered, inView]);

  const handleClick = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <StyledWrapper>
      <div
        ref={stackRef}
        className={`polaroid-stack ${inView ? 'in-view' : ''}`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {images.map((img, i) => {
          const offset = (i - currentIndex + images.length) % images.length;
          return (
            <div
              key={i}
              className={`polaroid ${offset === 0 ? 'active' : ''}`}
              style={{
                zIndex: images.length - offset,
                transform: offset === 0
                  ? 'rotate(-2deg) scale(1)'
                  : offset === 1
                    ? 'rotate(3deg) translate(8px, 4px) scale(0.97)'
                    : offset === 2
                      ? 'rotate(-5deg) translate(-6px, 8px) scale(0.94)'
                      : `rotate(${offset * 2}deg) translate(${offset * 3}px, ${offset * 4}px) scale(${1 - offset * 0.03})`,
                opacity: offset > 2 ? 0 : 1,
                visibility: offset > 2 ? 'hidden' : 'visible',
              }}
            >
              <div className="photo">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ transform: img.rotation ? `rotate(${img.rotation}deg) scale(1.8)` : 'none' }}
                />
                {offset === 0 && <div className="dust" />}
                {offset === 0 && <div className="scratches" />}
              </div>
              {img.caption && <div className="caption">{img.caption}</div>}
            </div>
          );
        })}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .polaroid-stack {
    position: relative;
    width: 200px;
    height: 250px;
    cursor: pointer;
    user-select: none;
  }

  @media (min-width: 640px) {
    .polaroid-stack {
      width: 240px;
      height: 290px;
    }
  }

  .polaroid {
    position: absolute;
    top: 0;
    left: 0;
    width: 180px;
    padding: 10px 10px 20px 10px;
    background: #fff;
    box-shadow:
      0 1px 1px rgba(0, 0, 0, 0.12),
      0 2px 2px rgba(0, 0, 0, 0.12),
      0 4px 4px rgba(0, 0, 0, 0.12),
      0 8px 8px rgba(0, 0, 0, 0.12);
    transition: transform 0.4s ease, opacity 0.4s ease, visibility 0.4s, box-shadow 0.4s ease;
    border-radius: 2px;
  }

  .polaroid.active:hover {
    transform: rotate(0deg) scale(1.02) !important;
    box-shadow:
      0 2px 2px rgba(0, 0, 0, 0.15),
      0 4px 4px rgba(0, 0, 0, 0.15),
      0 8px 8px rgba(0, 0, 0, 0.15),
      0 16px 16px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 640px) {
    .polaroid {
      width: 220px;
    }
  }

  .photo {
    width: 100%;
    height: 160px;
    background: #87ceeb;
    position: relative;
    overflow: hidden;
  }

  @media (min-width: 640px) {
    .photo {
      height: 200px;
    }
  }

  .photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .in-view .polaroid.active .photo::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.4) 32%,
      rgba(255, 255, 255, 0) 35%
    );
    animation: shine 3s infinite;
    z-index: 2;
  }

  .dust {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(#000 1px, transparent 1px),
      radial-gradient(#000 1px, transparent 1px);
    background-size: 50px 50px;
    background-position: 0 0, 25px 25px;
    opacity: 0.03;
    pointer-events: none;
    z-index: 3;
  }

  .scratches {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      linear-gradient(45deg, transparent 45%, rgba(0, 0, 0, 0.05) 46%, transparent 47%) 0 0,
      linear-gradient(-45deg, transparent 45%, rgba(0, 0, 0, 0.05) 46%, transparent 47%) 0 0;
    background-size: 200px 200px;
    opacity: 0.5;
    pointer-events: none;
    z-index: 3;
  }

  .caption {
    font-family: "Courier New", monospace;
    text-align: center;
    margin-top: 12px;
    color: #333;
    font-size: 13px;
    opacity: 0.8;
  }

  @keyframes shine {
    0% {
      transform: translateX(-100%) rotate(120deg);
    }
    20%, 100% {
      transform: translateX(100%) rotate(120deg);
    }
  }
`;
