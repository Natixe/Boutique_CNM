import React, { useRef } from 'react';
import { motion, useCycle } from 'framer-motion';
import { useDimensions } from '../../hooks/useDimensions';
import { MenuToggle } from './MenuToggle';
import { Navigation } from './Navigation';

const sidebar = {
  open: (height = 490) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(0.1px at calc(100% - 63.6px) 43.5px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

export const MenuHamburger = () => {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);

  const closeMenu = () => toggleOpen(false);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className='ContainerMenuHamburger'
    >
      <motion.div className='Containerbackground'>
        <div className='BackgroundLink'>
          <motion.div className="background" variants={sidebar} />
        </div>
      </motion.div>
      <Navigation isOpen={isOpen} closeMenu={closeMenu} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
