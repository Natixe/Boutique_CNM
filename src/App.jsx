import * as React from "react";
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";



/*Images Import */
import LogoStartMid from './assets/LogoStartMid.svg';
import LogoApresL_intro from './assets/LogoApresL_intro.svg';
import LogoCNM from './assets/LogoCNM.svg';
import RectangleFormation1 from './assets/FormationCarte1.png';


const rectangles = [
  { id: 1, image: RectangleFormation1, blur: true },
  { id: 2, image: RectangleFormation1, blur: true },
  { id: 3, image: RectangleFormation1, blur: true },
  { id: 4, image: RectangleFormation1, blur: true },
  { id: 5, image: RectangleFormation1, blur: true },
  { id: 6, image: RectangleFormation1, blur: true },
  { id: 7, image: RectangleFormation1, blur: true },
  { id: 8, image: RectangleFormation1, blur: false },
];

const positions = [
  { top: '56.38%', left: '32.29%' },
  { top: '38.33%', left: '26.66%' },
  { top: '19.81%', left: '33.02%' },
  { top: '13.89%', left: '44.84%' },
  { top: '19.81%', left: '56.56%' },
  { top: '38.33%', left: '63.02%' },
  { top: '57.59%', left: '56.09%' },
  { top: '62.96%', left: '44.98%' },
];


function App() {
  const [count, setCount] = useState(0)
  const [showRectagleStart, setshowRectagleStart] = useState(true);
  const [showLogoStartMid, setshowLogoStartMid] = useState(true);
  const [showLogoApresL_intro, setshowLogoApresL_intro] = useState(false);
  const [showAnimeLogoLeftUpset, setshowAnimeLogoLeftUpset] = useState(false);
  const [showLogoLeftUpset, setshowLogoLeftUpset] = useState(false);
  const [showFormationRectangle, setshowFormationRectangle] = useState(false);
  const [items, setItems] = useState(rectangles);

  
  useEffect(() => {
    
    /*Supprime les rectangle de l'intro*/
    const timerRectagle = setTimeout(() => {
      setshowRectagleStart(false);
    }, 1955);

    /*Supprime le logo au tout debut au centre*/
    const timerLogoStartMid = setTimeout(() => {
      setshowLogoStartMid(false);
    }, 1400);

    /*Ajoute le gros logo au centre*/
    const timerLogoApresL_intro = setTimeout(() => {
      setshowLogoApresL_intro(true);
    }, 1900);

    /*Ajoute le Logo cnm en haut a gauche puis Supprime le logo CNM en haut a gauche*/
    const timerLogoAnimeLeftUp = setTimeout(() => {
      setshowAnimeLogoLeftUpset(true);
    }, 2000);

    /*Ajoute le Logo cnm en haut a gauche puis Supprime le logo CNM en haut a gauche*/
    const timerLogoLeftUp = setTimeout(() => {
      setshowAnimeLogoLeftUpset(false);
      setshowLogoLeftUpset(true);
    }, 3300);

    const FormationRectangle = setTimeout(() => {
      setshowFormationRectangle(true);
    }, 3300);
    
    return () => clearTimeout(timerRectagle,timerLogoStartMid,timerLogoApresL_intro,timerLogoAnimeLeftUp,timerLogoLeftUp,FormationRectangle);
  }, []); 

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
    
      {/*Logo au centre au tout debut qui va vers le bas*/}
      {showLogoStartMid && (
        <div className="LogoCnmStartContainer">
          <motion.img
          initial={{ translateY: '0%' }}
          animate={{ translateY: '140%' }}
          transition={{ 
            duration: 0.6,
            delay: 0.7,
            ease: [0.62, 0, 0.36, 1]
          }}
          className="LogoCnmStart"
          src={LogoStartMid}>
          </motion.img>
        </div>  
      )}
      {/*----------------------------------------------*/}        
      {/*Animation des rectangle au debut*/}
        {showRectagleStart && (
          <div>
            {/*Animation du rectangle qui va vers le haut*/}
            <motion.div 
              className="RectangleStart BoxStartUp"
              initial={{ y: "0%", opacity: 1 }}
              animate={{ y: "-100%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.6,
                delay: 1.4,
                ease: [1, 0.0, 0.5, 1.0]
              }}
            />          
            {/*Animation du rectangle qui va vers le bas*/}
            <motion.div className="RectangleStart BoxStartDown"
              initial={{ y: "0%", opacity: 1 }}
              animate={{ y: "100%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: 1.4,
                ease: [1, 0.0, 0.5, 1.0]
              }}
            />
          </div>
        )}
      {/*----------------------------------------------*/}

      {/*Logo Centré apres l'intro du site*/}
      {showLogoApresL_intro && (
        <div className="LogoCnmAfterStartContainer">
          <motion.div
              className="BlurLogoAfterStart"
              initial={{ filter: "blur(0px)"}}
              animate={{ filter: "blur(3.5px)", opacity: 0.4}}
              transition={{
                duration: 1.7,
                delay: -0.5,
                ease: [0.66, 0, 0.78, 0.9]
              }}
            >
              <motion.img 
              className="LogoCnmAfterStart"
              src={LogoApresL_intro}
              initial={{ opacity: 0, scale: 1, y: "-2.2%"}}
              animate={{ opacity: 0.8, scale: 0.8, y: "-2.2%"}}
              transition={{
                duration: 1.2,
                delay: -0.3,
                ease: [0.37, 0, 0.37, 1]
              }}
              />
            </motion.div>
          </div>
        )}
        {/*----------------------------------------------*/}

        {/*Intro Nav Bar*/}
        {showAnimeLogoLeftUpset && (        
          <nav className="nav w-clearfix">
            <div 
              className="hero-link w-inline-block w--current"
              >
                <motion.img 
                  className="CNM-logo"
                  initial={{ y: "-250%"}}
                  animate={{ y: "0%"}}
                  src={LogoCNM} 
                  alt="" 
                  transition={{ 
                    duration: 0.6,
                    delay: 0.7,
                    ease: [0, 0, 0.5, 1.0]
                  }}
                />
            </div>
          </nav>
        )}
        {/*Nav Bar Apres intro*/}
        {showLogoLeftUpset && (        
          <nav className="nav w-clearfix">
            <div 
              className="hero-link w-inline-block w--current"
              > 
                <motion.a
                href="#"
                className="ButtonLogoCNMLeftUp"
                >
                  <motion.img 
                    className="CNM-logo" 
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 17 }}
                    src={LogoCNM} 
                    alt="" 
                  />
                </motion.a>                  
            </div>
          </nav>
        )}
      {/* --------------------------------------- */}

      {/* Rectangle formation mid */}
      {showFormationRectangle && (
        <div className="containerFormationRectangle">
          <button className="arrow arrow-left" onClick={handleLeftClick}>◀</button>
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                className="FormationRectangle"
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, top: positions[index].top, left: positions[index].left }}
                exit={{ opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 120, 
                  damping: 18, 

                }}
                style={{
                  backgroundImage: `url(${item.image})`,
                  filter: item.blur ? 'blur(4px)' : 'none',
                  backgroundSize: 'cover',
                }}
              >
                {item.id}
              </motion.div>
            ))}
          </AnimatePresence>
          <button className="arrow arrow-right" onClick={handleRightClick}>▶</button>
        </div>
      )}
    </>
  )
}

export default App
