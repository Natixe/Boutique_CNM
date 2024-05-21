import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';
import image5 from './images/image5.jpg';
import image6 from './images/image6.jpg';
import "./styles.css";


const rectangles = [
  { id: 1, color: 'red', blur: false },
  { id: 2, color: 'blue', blur: true },
  { id: 3, color: 'magenta', blur: true },
  { id: 4, color: 'cyan', blur: true },
  { id: 5, color: 'yellow', blur: true },
  { id: 6, color: 'green', blur: true },
  { id: 7, color: 'orange', blur: true },
  { id: 8, color: 'purple', blur: true },
];

const positions = [
  { top: '56.38%', left: '32.29%' }, /*jaune */
  { top: '38.33%', left: '26.66%' }, /*vert */
  { top: '19.81%', left: '33.02%' },/*vomi */
  { top: '13.89%', left: '44.84%' },/*violet foncée */
  { top: '19.81%', left: '56.56%' },/*rouge */
  { top: '38.33%', left: '63.02%' },
  { top: '57.59%', left: '56.09%' },
  { top: '62.96%', left: '44.98%' },
];

function App() {
  const [items, setItems] = useState(rectangles);

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
      <div className="container">
        <button className="arrow arrow-left" onClick={handleLeftClick}>◀</button>

        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, top: positions[index].top, left: positions[index].left }}
              exit={{ opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 10 }}
              className="rectangle"
              style={{
                backgroundColor: item.color,
                filter: item.blur ? 'blur(5px)' : 'none',
              }}
            >
              {item.id}
            </motion.div>
          ))}
        </AnimatePresence>

        <button className="arrow arrow-right" onClick={handleRightClick}>▶</button>
      </div>
    </>
  );
}

export default App
