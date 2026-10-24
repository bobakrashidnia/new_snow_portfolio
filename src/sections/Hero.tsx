import React from 'react';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation(); // Isso "ativa" as traduções neste componente

  return (
    <section 
      id="hero" 
      className="min-h-screen flex flex-col justify-center items-center px-4 pt-16 bg-transparent"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-4xl w-full text-center">
        
        {/* Bloco 1: Saudação */}
        <div style={{ paddingBottom: '20px' }}>
          <p className="font-mono text-sm tracking-widest uppercase text-blue-400">
            {t('hero.greeting')} {/* "Hi, my name is" */}
          </p>
        </div>

        {/* Bloco 2: Nome - Geralmente nome não se traduz */}
        <div style={{ paddingBottom: '20px' }}>
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight wrap-break-word"
            style={{ color: 'var(--foreground)' }}
          >
            Cool Guy
          </h1>
        </div>

        {/* Bloco 3: Cargo */}
        <div style={{ paddingBottom: '30px' }}>
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{ color: 'var(--text-muted)' }}
          >
            {t('hero.role')} {/* "Full Stack Developer" */}
          </h2>
        </div>

        {/* Bloco 4: Descrição */}
        <div>
          <p 
            className="max-w-5xl mx-auto text-lg md:text-xl leading-relaxed text-center"
            style={{ color: 'var(--text-muted)' }}
          >
            {t('hero.description')} {/* "I am a information systems student..." */}
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;