import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './MenuHamburger.css';

const Path = props => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#6B6B6B"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle }) => (
  <button className='ButtonHamburger' onClick={toggle}>
    <svg width="22" height="18" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 22 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path
        d="M 2 9.423 L 22 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 22 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </button>
);

MenuToggle.propTypes = {
  toggle: PropTypes.func.isRequired,
};
