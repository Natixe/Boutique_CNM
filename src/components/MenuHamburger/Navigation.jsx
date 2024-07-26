import React from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from './MenuItem';
import './MenuHamburger.css';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const Navigation = ({ isOpen, closeMenu }) => (
  <motion.ul variants={variants} className='ContainerLink'>
    <MenuItem isOpen={isOpen} closeMenu={closeMenu} />
    {/* Ajoutez d'autres éléments de menu si nécessaire */}
  </motion.ul>
);
