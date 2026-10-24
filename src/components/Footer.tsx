import React from 'react';
import SocialLinks from './SocialLinks';

const Footer: React.FC = () => {
  return (
    <footer 
      className="text-center"
      style={{
        backgroundColor: 'var(--background)',
        // Respiro extra embaixo para a barra do Safari e a área segura do iPhone
        padding: '40px 20px calc(40px + env(safe-area-inset-bottom))',
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <SocialLinks size={36} />
      </div>
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>© 2026 Thuany Paula Kamers. All rights reserved.</p>
    </footer>
  );
};

export default Footer;