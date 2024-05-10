import { motion } from "framer-motion";
import "./styles.css";
import * as React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { useState, useEffect } from "react";



function App() {
  const [count, setCount] = useState(0)
  const location = useLocation(); 

  const [showLogoStart, setShowLogoStart] = useState(true);
  const [showLogoAfterStart, setShowLogoAfterStart] = useState(false);
  const [showRectagleStart, setshowRectagleStart] = useState(true);

  useEffect(() => {
    const timerLogo = setTimeout(() => {
      setShowLogoAfterStart(true);
      setshowLogoStart(false);
    }, 1150);

    const timerRectagle = setTimeout(() => {
      setshowRectagleStart(false);
    }, 1955);
    
    return () => clearTimeout(timerLogo,timerRectagle);
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
                animate={{ filter: "blur(3.5px)", opacity: 0.8}}
                transition={{
                  duration: 1.2,
                  delay: 2,
                  ease: [0.66, 0, 0.78, 0.9]
                }}
              >
                  {showLogoAfterStart && (
                    <motion.div
                      className="LogoAfterStart"
                      initial={{ opacity: 0, scale: 1, y: "-2.2%"}}
                      animate={{ opacity: 1, scale: 0.8, y: "-2.2%"}}
                      transition={{
                        duration: 1.3,
                        delay: 0.55,
                        ease: [0, 0, 0.8, 1]
                      }}
                    />
                  )}
              </motion.div>
      </div>
      

    </>
  );
}

export default App
