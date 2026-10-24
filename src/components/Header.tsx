import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBriefcase, FaCode, FaEnvelope, FaGlobeAmericas, FaRocket, FaTrophy } from 'react-icons/fa';
import { LanguageSwitcher } from './ui/LanguageSwitcher';
import DockNav from './DockNav';
import { LINKS } from './SocialLinks';

const NAV_IDS = ['experience', 'international', 'tech-stack', 'projects', 'achievements', 'contact'] as const;
const NAV_KEYS: Record<typeof NAV_IDS[number], string> = {
  'experience': 'nav.experience',
  'international': 'nav.international',
  'tech-stack': 'nav.techStack',
  'projects': 'nav.projects',
  'achievements': 'nav.achievements',
  'contact': 'nav.contact',
};

// Ícone de cada seção no Dock; todos em vidro escuro com leve tom índigo
const DOCK_GRADIENT = 'linear-gradient(160deg, rgba(129, 140, 248, 0.28) 0%, rgba(79, 70, 229, 0.12) 55%, rgba(15, 23, 42, 0.45) 100%)';
const NAV_ICONS = {
  'experience': FaBriefcase,
  'international': FaGlobeAmericas,
  'tech-stack': FaCode,
  'projects': FaRocket,
  'achievements': FaTrophy,
  'contact': FaEnvelope,
} as const;

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = useMemo(
    () => NAV_IDS.map((id) => ({ id, label: t(NAV_KEYS[id]), icon: NAV_ICONS[id], gradient: DOCK_GRADIENT })),
    [t]
  );

  // Redes sociais do rodapé, também no Dock
  const dockLinks = useMemo(
    () => LINKS.map(({ label, href, Icon }) => ({ id: label, label, icon: Icon, gradient: DOCK_GRADIENT, href })),
    []
  );

  const scrollToSection = useCallback((sectionId: string) => {
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = window.innerWidth < 768 ? 64 : 80;
      const top = element.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <header
      className="site-header fixed top-0 left-0 w-full z-50 transition-colors duration-300"
    >
      <div className="site-header__inner w-full">

        {/* Desktop layout (original grid) */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            height: '80px',
            gap: '2rem',
          }}
        >
          <div />

          <div />

          {/* <div className="site-header__hit" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: '60px' }}>
            <LanguageSwitcher />
          </div> */}
        </div>

        {/* Mobile layout */}
        <div className="flex md:hidden items-center justify-end h-16">

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              className="flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span
                className="block w-5 h-0.5 transition-all duration-300 origin-center"
                style={{
                  backgroundColor: 'var(--foreground)',
                  transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block w-5 h-0.5 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--foreground)',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-0.5 transition-all duration-300 origin-center"
                style={{
                  backgroundColor: 'var(--foreground)',
                  transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>

      </div>

      {/* Dock vertical à esquerda (desktop) */}
      <div className="site-header__hit hidden md:block" style={{ position: 'absolute', top: '20px', left: '20px' }}>
        <DockNav items={navItems} links={dockLinks} onSelect={scrollToSection} />
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? '400px' : '0',
          backgroundColor: 'var(--background)',
        }}
      >
        <nav className="flex flex-col" style={{ padding: '4px 20px 20px', gap: '4px' }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left text-sm font-bold uppercase tracking-widest transition-colors duration-200"
              style={{ color: 'var(--text-muted)', padding: '10px 0' }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
