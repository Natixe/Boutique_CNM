import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopContext } from '../../context/shop-contexte';
import { FORMATIONPRINCIPAL } from '../../Formation';
import { useNavigate } from "react-router-dom";

import "./formationPrincipal.css";

import RectangleFormation1 from '../../assets/FormationCarte1.png';
import RectangleFormation2 from '../../assets/FormationCarte2.png';
import RectangleFormation3 from '../../assets/FormationCarte3.png';
import RectangleFormation4 from '../../assets/FormationCarte4.png';
import RectangleFormation5 from '../../assets/FormationCarte5.png';
import RectangleFormation6 from '../../assets/FormationCarte6.png';
import RectangleFormation7 from '../../assets/FormationCarte7.png';

import PDMuscleTitle from '../../assets/PDMuscleAssets/PDMuscleTitle.svg';
import StreetWorkoutTitle from '../../assets/StreetWorkoutAssets/Street_WorkoutTitle.svg';
import PDMusclePersoTitle from '../../assets/PDMusclePersoAssets/PDMusclePersoTitle.svg';
import NutritionTitle from '../../assets/NutritionAssets/NutritionTitle.svg';
import NutritionPersoTitle from '../../assets/NutritionPersoAssets/NutritionPersoTitle.svg';
import LePPersonalisableTitle from '../../assets/LePPersonalisableAssets/LePPersonalisableTitle.svg';

const images = [
  StreetWorkoutTitle,
  PDMuscleTitle,
  PDMusclePersoTitle,
  NutritionTitle,
  NutritionPersoTitle,
  LePPersonalisableTitle,
  RectangleFormation2,
  RectangleFormation1,
];

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 300 : -300,
      opacity: 1,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      x: direction < 0 ? 300 : -300,
      opacity: 1,
    };
  },
};

const rectangles = [
  { id: 1, blur: true },
  { id: 2, blur: true },
  { id: 3, blur: true },
  { id: 4, blur: true },
  { id: 5, blur: true },
  { id: 6, blur: true },
  { id: 7, blur: true },
  { id: 8, blur: false },
];

const positions = [
  { pos: 8, top: '56.38%', left: '32.29%' },
  { pos: 7, top: '38.33%', left: '26.66%' },
  { pos: 6, top: '19.81%', left: '33.02%' },
  { pos: 5, top: '13.89%', left: '44.84%' },
  { pos: 4, top: '19.81%', left: '56.56%' },
  { pos: 3, top: '38.33%', left: '63.02%' },
  { pos: 2, top: '57.59%', left: '56.09%' },
  { pos: 1, top: '62.96%', left: '44.98%' },
];

export const FormationPrincipal = (props) => {
  
  const { id, formationName, price, formationImage } = props.data;
  const { addToCartPrincipal, cartItemsPrincipal } = useContext(ShopContext);
  const cartItemCount = cartItemsPrincipal[id];
  const [items, setItems] = useState(FORMATIONPRINCIPAL);
  const navigate = useNavigate();
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const imageIndex = ((page % images.length) + images.length) % images.length;
  console.log(images[imageIndex])

  const handleRightClick = () => {
    setItems(prev => {
      const newItems = [prev[prev.length - 1], ...prev.slice(0, -1)];
      return newItems.map((item, index) => ({
        ...item,
        blur: index !== 7,
      }));
    });
  };

  const handleLeftClick = () => {
    setItems(prev => {
      const newItems = [...prev.slice(1), prev[0]];
      return newItems.map((item, index) => ({
        ...item,
        blur: index !== 7,
      }));
    });
  };

  return (
    <>
      <button className="arrow arrow-left" onClick={() => { handleLeftClick(); paginate(-1); }}>◀</button>
      <AnimatePresence>
      {items.map((item, index) => (
      <div key={item.id}>
            <motion.img
              src={item.formationImage}
              className="FormationRectangle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, top: positions[index].top, left: positions[index].left }}
              exit={{ opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 18,
              }}
              style={{
                filter: index !== 7 ? 'blur(4px)' : 'none',
                backgroundSize: 'cover',
                cursor: index === 7 ? 'pointer' : 'default',
              }}
                                /*navigate("/cart")
                                addToCartPrincipal(item.id);
                                console.log(item.id)*/
              onClick={() => {
                if (index === 7 && item.id === 1) {
                  console.log(item.id + "LOL1")
                  navigate("/cart")
                }
                if (index === 7 && item.id === 2) {
                  console.log(item.id + "LOL2")

                }
                if (index === 7 && item.id === 3) {
                  console.log(item.id + "LOL3")

                }
                if (index === 7 && item.id === 4) {
                  console.log(item.id + "LOL4")

                }
                if (index === 7 && item.id === 5) {
                  console.log(item.id + "LOL5")

                }
                if (index === 7 && item.id === 6) {
                  console.log(item.id + "LOL6")

                }
                if (index === 7 && item.id === 7) {
                  console.log(item.id + "LOL7")

                }
                if (index === 7 && item.id === 8) {
                  console.log(item.id + "LOL8")
                }
              }}
            />
      </div>
      ))}
      </AnimatePresence>
      <button className="arrow arrow-right" onClick={() => { handleRightClick(); paginate(1); }}>▶</button>

      <div className="containerSliderFormationP">
        <div className="sliderFormationP">
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
                x: { type: 'spring', stiffness: 120, damping: 18 },
              }}
              className="imageFormationP"
            />
          </AnimatePresence>
        </div>
      </div>  
    </>
  );
};
