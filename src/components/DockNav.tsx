import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, type MotionValue } from 'framer-motion';
import type { IconType } from 'react-icons';

export interface DockItem {
  id: string;
  label: string;
  icon: IconType;
  gradient: string;
  href?: string;
}

interface DockNavProps {
  items: DockItem[];
  links?: DockItem[];
  onSelect: (id: string) => void;
}

// Tamanhos do Dock: ícone em repouso, ícone sob o mouse e alcance do efeito
const BASE = 42;
const MAX = 68;
const RANGE = 150;

const DockIcon: React.FC<{ item: DockItem; mouse: MotionValue<number>; onSelect: (id: string) => void }> = ({ item, mouse, onSelect }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  // Dock vertical: distância medida no eixo Y
  const distance = useTransform(mouse, (y) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || y === Infinity) return RANGE;
    return y - (rect.top + rect.height / 2);
  });
  const target = useTransform(distance, [-RANGE, 0, RANGE], [BASE, MAX, BASE]);
  const size = useSpring(target, { mass: 0.1, stiffness: 170, damping: 14 });
  const glyph = useTransform(size, (s) => s * 0.46);
  const Icon = item.icon;

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={item.label}
      onClick={() => (item.href ? window.open(item.href, '_blank', 'noopener,noreferrer') : onSelect(item.id))}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="dock__icon"
      style={{ width: size, height: size, background: item.gradient }}
    >
      <motion.span className="dock__glyph" style={{ fontSize: glyph }}>
        <Icon />
      </motion.span>
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="dock__tooltip"
            initial={{ opacity: 0, x: -4, y: '-50%' }}
            animate={{ opacity: 1, x: 0, y: '-50%' }}
            exit={{ opacity: 0, x: -4, y: '-50%' }}
            transition={{ duration: 0.15 }}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const DockNav: React.FC<DockNavProps> = ({ items, links = [], onSelect }) => {
  const mouseY = useMotionValue(Infinity);

  return (
    <nav
      className="dock"
      onMouseMove={(e) => mouseY.set(e.clientY)}
      onMouseLeave={() => mouseY.set(Infinity)}
    >
      {items.map((item) => (
        <DockIcon key={item.id} item={item} mouse={mouseY} onSelect={onSelect} />
      ))}
      {links.length > 0 && <span className="dock__divider" aria-hidden="true" />}
      {links.map((item) => (
        <DockIcon key={item.id} item={item} mouse={mouseY} onSelect={onSelect} />
      ))}
    </nav>
  );
};

export default DockNav;
