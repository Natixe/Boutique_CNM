import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './MenuHamburger.css';
import { useNavigate } from "react-router-dom";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

export const MenuItem = ({ i, isOpen, closeMenu }) => {
  const navigate = useNavigate();

  // Log the value of isOpen
  console.log(`MenuItem ${i} isOpen:`, isOpen);

  const LinkHamburger = {
    pointerEvents: 'fill', // Ajouter pointer-events
  };

  return (
    <div className='Containerli'>
      {isOpen ? (
      <>
        <motion.li
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className='Link'
        style={LinkHamburger}
        onClick={() => {
          navigate("/shop");
          closeMenu();
        }}

        >
          <div className='TextHamburgerLink'>Plus d'offre</div>
        </motion.li>

        <motion.li
          variants={variants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className='Link'
          style={LinkHamburger}
          onClick={() => {
            navigate("/cart");
            closeMenu();
          }}
        >
          <div className='TextHamburgerLink'>Panier</div>
        </motion.li>
      </>
      ) : (
        <>
        <motion.li
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className='Link'
        onClick={() => {
          navigate("/shop");
          closeMenu();
        }}

        >
          <div className='TextHamburgerLink'>Plus d'offre</div>
        </motion.li>

        <motion.li
          variants={variants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className='Link'
          onClick={() => {
            navigate("/cart");
            closeMenu();
          }}
        >
          <div className='TextHamburgerLink'>Panier</div>
        </motion.li>
      </>
      )}
    </div>
  );
};

MenuItem.propTypes = {
  i: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
};
