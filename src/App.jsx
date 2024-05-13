import { motion } from "framer-motion";
import "./styles.css";
import * as React from "react";
import { useLocation, useRoutes, Link  } from "react-router-dom";
import { useState, useEffect } from "react";


function App() {
  const [count, setCount] = useState(0)
  const location = useLocation(); 

  const [showLogoStart, setShowLogoStart] = useState(true);
  const [showLogoAfterStart, setShowLogoAfterStart] = useState(false);
  const [showRectagleStart, setshowRectagleStart] = useState(true);
  const [showLogoLeftUp, setshowLogoLeftUp] = useState(true);
  const [showLogoLeftUpset, setshowLogoLeftUpset] = useState(false);


  useEffect(() => {

    const timerLogo = setTimeout(() => {
      setShowLogoAfterStart(true);
      setshowLogoStart(false);
    }, 1150);

    const timerRectagle = setTimeout(() => {
      setshowRectagleStart(false);
    }, 1955);


    const timerLogoLeftuP = setTimeout(() => {
      setshowLogoLeftUp(false);
      setshowLogoLeftUpset (true)
    }, 3600);


    return () => clearTimeout(timerLogo,timerLogoLeftuP,timerRectagle);
  }, []); 



  return (
    <>
      <div className='Start'>
              {showRectagleStart && (
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
              )}
              {showRectagleStart && (
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
              )}


              {showLogoStart && (
                <div className="PosLogoStart">  
                  <div className="LogoStartContrainer">
                    <div className="LogoStart">
                    </div>
                  </div>
                </div>
              )}

              
              <motion.div
                className="BlurLogoAfterStart"
                initial={{ filter: "blur(0px)"}}
                animate={{ filter: "blur(3.5px)", opacity: 0.4}}
                transition={{
                  duration: 1.5,
                  delay: 1.6,
                  ease: [0.66, 0, 0.78, 0.9]
                }}
              >
                  {showLogoAfterStart && (
                    <motion.div
                      className="LogoAfterStart"
                      initial={{ opacity: 0, scale: 1, y: "-2.2%"}}
                      animate={{ opacity: 1, scale: 0.8, y: "-2.2%", opacity: 0.8 }}
                      transition={{
                        duration: 1.2,
                        delay: 0.50,
                        ease: [0.37, 0, 0.37, 1]
                      }}
                    />
                  )}
                </motion.div>
                


                  {showLogoLeftUp && (
                    <motion.div 
                      className="CnmLogo"
                      initial={{ y: "-150%", x: "-100%"}}
                      animate={{ y: "50%", x: "-100%"}}
                      whileHover={{ scale: 1.8 }}
                      transition={{ 
                        duration: 0.6,
                        delay: 2.8,
                        ease: [0, 0, 0.5, 1.0]
                      }}
                    />
                  )} 
                  {showLogoLeftUpset && (
                    <motion.div 
                      className="CnmLogo"
                      initial={{ y: "50%", x: "-100%"}}
                      animate={{ y: "50%", x: "-100%"}}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 17 }}
                    />
                  )}                               
 
      </div>
      

    </>
  );
}

export default App
