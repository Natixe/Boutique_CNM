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
import RectangleFormation8 from '../../assets/FormationCarte8.png';

const rectangles = [
  { id: 1, image: RectangleFormation1, blur: true },
  { id: 2, image: RectangleFormation2, blur: true },
  { id: 3, image: RectangleFormation3, blur: true },
  { id: 4, image: RectangleFormation4, blur: true },
  { id: 5, image: RectangleFormation5, blur: true },
  { id: 6, image: RectangleFormation6, blur: true },
  { id: 7, image: RectangleFormation7, blur: true },
  { id: 8, image: RectangleFormation8, blur: false },
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
      <button className="arrow arrow-left" onClick={handleLeftClick}>◀</button>
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
              onClick={() => {
                if (index === 7) {
                  navigate("/cart")
                  addToCartPrincipal(item.id);
                }
              }}
            />
      </div>
      ))}
      </AnimatePresence>
      <button className="arrow arrow-right" onClick={handleRightClick}>▶</button>
    </>
  );
};
