import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const LINKS = [
  { label: 'GitHub', href: 'https://github.com/ThuanyKamers', Icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thuanypaulakamers/', Icon: FaLinkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/anny.devv/', Icon: FaInstagram },
] as const;

interface SocialLinksProps {
  size?: number;
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ size = 28, className = '' }) => (
  <div className={`flex items-center justify-center gap-8 ${className}`}>
    {LINKS.map(({ label, href, Icon }) => (
      <a
        key={label}
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        className="transition-transform duration-300 hover:scale-110 hover:text-blue-400"
        style={{ color: 'var(--text-muted)' }}
      >
        <Icon size={size} />
      </a>
    ))}
  </div>
);

export default SocialLinks;
