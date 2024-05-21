import { motion } from "framer-motion";
import "./styles.css";
import * as React from "react";
import { useLocation, useRoutes, Link  } from "react-router-dom";
import { useState, useEffect } from "react";
import LogoCNM from '../public/CnmLogo.svg'; // with import
import LogoStart from '../public/LogoStart.svg';
import LogoPastStart from '../public/LogoPastStart.svg';



function App() {
  const [count, setCount] = useState(0)
  const location = useLocation(); 

  const [showLogoStart, setShowLogoStart] = useState(true);
  const [showLogoAfterStart, setShowLogoAfterStart] = useState(false);
  const [showRectagleStart, setshowRectagleStart] = useState(true);
  const [showLogoLeftUp, setshowLogoLeftUp] = useState(true);
  const [showLogoLeftUpset, setshowLogoLeftUpset] = useState(false);

  useEffect(() => {

    /*Sup le logo de Befors l'intro et fais apparaître l'element de fond poste intro*/
    const timerLogo = setTimeout(() => {
      setShowLogoAfterStart(true); /* element de poste de l'intro*/
      setshowLogoStart(false); /* element de Befors l'intro*/
    }, 1150);

    /*Sup les rectangle de l'intro*/
    const timerRectagle = setTimeout(() => {
      setshowRectagleStart(false);
    }, 1955);


    /*Sup les rectangle de l'intro*/
    const timerLogoLeftuP = setTimeout(() => {
      setshowLogoLeftUp(false);
      setshowLogoLeftUpset (true)
    }, 3600);

    /*SET les commande presedente*/
    return () => clearTimeout(timerLogo,timerLogoLeftuP,timerRectagle);
  }, []); 



  return (
    <>

      <div className='Start'>
        {/* ELEMENT Befors INTRO AU DESSU  */}
        {/*Animation logo qui va vers bas*/}
        {showRectagleStart && (
          <div className="LogoCnmStartContainer">
            <img 
            className="LogoCnmStart"
            src={LogoStart}>
            </img>
          </div>
        )}  
        {showRectagleStart && (
          <div>
            {/*Animation du rectangle qui va vers le haut*/}
            <motion.div 
              className="RectangleStart BoxStartUp"
              initial={{ y: "0%", opacity: 1 }}
              animate={{ y: "-100%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.55,
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
                duration: 0.55,
                delay: 1.4,
                ease: [1, 0.0, 0.5, 1.0]
              }}
            />
          </div>
          )}

        {/* ELEMENT Before INTRO AU DESSU  */}

        {/* ELEMENT POSTE INTRO EN DESSOUS  */}
        {/*Logo Mid Pop  */}
        {showLogoAfterStart && (
        <div className="LogoCnmAfterStartContainer">
          <motion.div
              className="BlurLogoAfterStart"
              initial={{ filter: "blur(0px)"}}
              animate={{ filter: "blur(3.5px)", opacity: 0.4}}
              transition={{
                duration: 1.7,
                delay: 0.8,
                ease: [0.66, 0, 0.78, 0.9]
              }}
            >

              <motion.img 
              className="LogoCnmAfterStart"
              src={LogoPastStart}
              initial={{ opacity: 0, scale: 1, y: "-2.2%"}}
              animate={{ opacity: 0.8, scale: 0.8, y: "-2.2%"}}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.37, 0, 0.37, 1]
              }}
              />
            </motion.div>
          </div>
        )}

        {/* --------------------------------------- */}
        {/*Intro Nav Bar*/}
        {showLogoLeftUp && (        
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
                    delay: 2.7,
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
                <motion.img 
                  className="CNM-logo" 
                  src={LogoCNM} 
                  alt="" 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17 }}
                />
            </div>
          </nav>
        )}
      </div>
      {/* --------------------------------------- */}
    </>
  );
}

export default App
