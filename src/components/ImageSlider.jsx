import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ImageSlider.css';
import IMG_3885 from '../assets/IMG_3885.jpg';

const images = [
    IMG_3885
];

const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
};


export const ImageSlider = () => {

    const [[page, direction], setPage] = useState([0, 0]);

    const paginate = (newDirection) => {
      setPage([page + newDirection, newDirection]);
    };
  
    const imageIndex = ((page % images.length) + images.length) % images.length;
    console.log(images[imageIndex])
    return (
        <div className="slider">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={page}
              src={images[imageIndex]}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="image"
            />
          </AnimatePresence>
          <div className="buttons">
            <button onClick={() => paginate(-1)}>{'<'}</button>
            <button onClick={() => paginate(1)}>{'>'}</button>
          </div>
        </div>
    );
};

