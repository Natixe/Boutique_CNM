import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import "../index.css";
import { FormationPrincipal } from "./shop/formationPrincipal"
import { FORMATIONPRINCIPAL } from "../Formation"
import { ShopContext } from "../context/shop-contexte"



/*Images Import */
import LogoStartMid from '../assets/LogoStartMid.svg';
import LogoApresL_intro from '../assets/LogoApresL_intro.svg';
import LogoCNM from '../assets/LogoCNM.svg';
import RectangleFormation1 from '../assets/FormationCarte1.png';
import RectangleFormation2 from '../assets/FormationCarte2.png';
import RectangleFormation3 from '../assets/FormationCarte3.png';
import RectangleFormation4 from '../assets/FormationCarte4.png';
import RectangleFormation5 from '../assets/FormationCarte5.png';
import RectangleFormation6 from '../assets/FormationCarte6.png';
import RectangleFormation7 from '../assets/FormationCarte7.png';
import RectangleFormation8 from '../assets/FormationCarte8.png';

const rectangles = [
  { id: 1, blur: true },
  { id: 2, blur: true },
  { id: 3, blur: true },
  { id: 4, blur: true },
  { id: 5, blur: true },
  { id: 6, blur: true },
  { id: 7, blur: true },
  { id: 8, blur: false},
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

export const Home = () => {
  const [count, setCount] = useState(0)
  const [showRectagleStart, setshowRectagleStart] = useState(true);
  const [showLogoStartMid, setshowLogoStartMid] = useState(true);
  const [showLogoApresL_intro, setshowLogoApresL_intro] = useState(false);
  const [showAnimeLogoLeftUpset, setshowAnimeLogoLeftUpset] = useState(false);
  const [showLogoLeftUpset, setshowLogoLeftUpset] = useState(false);
  const [showFormationRectangle, setshowFormationRectangle] = useState(false);
  const [items, setItems] = useState(rectangles);
  const [showAnimationHome, setShowAnimationHome] = useState(false);

  
  useEffect(() => {
    // Vérifie si l'animation a déjà été jouée
    const hasPlayedAnimationHome = localStorage.getItem('hasPlayedAnimationHome');
    if (!hasPlayedAnimationHome) {
      setShowAnimationHome(true);
      localStorage.setItem('hasPlayedAnimationHome', 'true');
    }
    }, []);

  useEffect(() => {
    if (showAnimationHome) {
      const timerRectagle = setTimeout(() => {
        setShowRectagleStart(false);
      }, 0);

      const timerLogoStartMid = setTimeout(() => {
        setShowLogoStartMid(false);
      }, 0);

      const timerLogoApresL_intro = setTimeout(() => {
        setShowLogoApresL_intro(true);
      }, 0);

      return () => {
        clearTimeout(timerRectagle);
        clearTimeout(timerLogoStartMid);
        clearTimeout(timerLogoApresL_intro);
      };
    }
  }, [showAnimationHome]);

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
    
    return () => {
      clearTimeout(timerRectagle);
      clearTimeout(timerLogoStartMid);
      clearTimeout(timerLogoApresL_intro);
      clearTimeout(timerLogoAnimeLeftUp);
      clearTimeout(timerLogoLeftUp);
      clearTimeout(FormationRectangle);
    };
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
    <div className="ContainerSite">
    {showAnimationHome && (
      <div className='Intro'>
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
              animate={{ filter: "blur(.5px)", opacity: 0.9}}
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
              animate={{ opacity: 0.8, scale: 0.9, y: "-2.2%"}}
              transition={{
                duration: 1.2,
                delay: -0.3,
                ease: [0.37, 0, 0.37, 1]
              }}
              />
            </motion.div>
          </div>
        )}
      </div>
    )}

      {!showAnimationHome && (
        <div className="LogoCnmAfterStartContainer">
          <img className="LogoCnmAfterStartpostIntro" src={LogoApresL_intro}/>
        </div>
      )}    
      {/* --------------------------------------- */}
      {/* Rectangle formation mid */} 
      {showAnimationHome && (
      <div>
        {showFormationRectangle && (
          <div className="containerFormationRectangle">    
          {FORMATIONPRINCIPAL.slice(0, 1).map((formation) => (
            <FormationPrincipal data={formation} />
          ))}
          </div>
        )}
      </div>
      )}
      {!showAnimationHome && (
      <div>
          <div className="containerFormationRectangle">    
          {FORMATIONPRINCIPAL.slice(0, 1).map((formation) => (
            <FormationPrincipal data={formation} />
          ))}
          </div>
      </div>
      )}
   </div>
  )
}

