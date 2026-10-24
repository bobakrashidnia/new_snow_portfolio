import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { asset } from '../utils/asset';
import { useIsMobile } from '../hooks/useIsMobile';

const TECHS = [
  { name: "HTML", color: "#A855F7", iconUrl: "images/tech/html.svg" },
  { name: "CSS", color: "#A855F7", iconUrl: "images/tech/css.svg" },
  { name: "JavaScript", color: "#A855F7", iconUrl: "images/tech/javascript.svg" },
  { name: "TypeScript", color: "#3178C6", iconUrl: "images/tech/typescript.svg" },
  { name: "Python", color: "#3776AB", iconUrl: "images/tech/python.svg" },
  { name: "PHP", color: "#777BB4", iconUrl: "images/tech/php.svg" },
  { name: "Lua", color: "#646CFF", iconUrl: "images/tech/lua.svg" },
  { name: "React", color: "#61DAFB", iconUrl: "images/tech/react.svg" },
  { name: "Tailwind CSS", color: "#38BDF8", iconUrl: "images/tech/tailwind.svg" },
  { name: "Node.js", color: "#339933", iconUrl: "images/tech/node.svg" },
  { name: "Vite", color: "#646CFF", iconUrl: "images/tech/vite.svg" },
  { name: "MySQL", color: "#A855F7", iconUrl: "images/tech/mysql.svg" },
  { name: "Git & GitHub", color: "#F05032", iconUrl: "images/tech/git.svg" },
  { name: "Docker", color: "#2496ED", iconUrl: "images/tech/docker.svg" },
  { name: "XAMPP", color: "#FB7A24", iconUrl: "images/tech/xampp.svg" },
  { name: "GSAP", color: "#88CE02", iconUrl: "images/tech/gsap.svg" },
  { name: "Windows", color: "#0078D6", iconUrl: "images/tech/windows.svg" },
  { name: "Linux", color: "#FCC624", iconUrl: "images/tech/linux.svg" },
] as const;

const STACK_LAYERS = [0, 1, 2, 3];

interface SkillStackProps {
  name: string;
  color: string;
  iconUrl: string;
  isMobile: boolean;
}

const SkillStack = React.memo(({ name, color, iconUrl, isMobile }: SkillStackProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center py-4" data-reveal>
        <div className="w-12 h-12 rounded-lg bg-black/40 border flex items-center justify-center" style={{ borderColor: color }}>
          <img src={iconUrl} alt={name} className="w-7 h-7 object-contain" />
        </div>
        <div className="mt-2 font-mono text-xs opacity-80" style={{ color: 'var(--foreground)' }}>
          {name}
        </div>
      </div>
    );
  }

  return (
    <div
      data-reveal
      className="relative flex flex-col items-center justify-center h-40 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative w-15 h-15 transition-all duration-500 ${isHovered ? 'rotate-[-35deg] skew-y-20 -translate-y-4' : ''}`}>
        {STACK_LAYERS.map((i) => (
          <span
            key={i}
            className="absolute inset-0 rounded-lg border transition-all duration-500"
            style={{
              borderColor: color,
              opacity: isHovered ? (i + 1) * 0.2 : i === 0 ? 1 : 0,
              transform: isHovered ? `translate(${i * 5}px, -${i * 5}px)` : 'none',
              boxShadow: isHovered ? `0 0 15px ${color}44` : 'none'
            }}
          />
        ))}

        <span
          className={`absolute inset-0 rounded-lg bg-black/40 backdrop-blur-sm border flex items-center justify-center transition-all duration-500 ${isHovered ? 'translate-x-5 -translate-y-5' : ''}`}
          style={{ borderColor: color }}
        >
          <img
            src={iconUrl}
            alt={name}
            className="w-8 h-8 object-contain"
            style={{
              filter: isHovered ? `drop-shadow(0 0 5px ${color})` : 'none'
            }}
          />
        </span>
      </div>

      <div
        className={`mt-4 font-mono text-sm transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-2' : 'opacity-60'}`}
        style={{ color: isHovered ? color : 'var(--foreground)' }}
      >
        {name}
      </div>
    </div>
  );
});

const TechStack: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <section id="tech-stack" className="w-full py-32 flex flex-col items-center bg-transparent relative overflow-hidden">
      <div className="w-full max-w-5xl px-4 sm:px-8 relative z-10">
        <div className="text-center" data-reveal>
          <h2 className="text-4xl font-bold tracking-tighter" style={{ color: 'var(--foreground)' }}>
            {t('tech.title')} <span className="text-blue-400 italic">{t('tech.subtitle')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-x-4 sm:gap-x-8 gap-y-3">
          {TECHS.map((tech) => (
            <SkillStack
              key={tech.name}
              name={tech.name}
              color={tech.color}
              iconUrl={asset(tech.iconUrl)}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
