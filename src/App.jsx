import { useState } from 'react'
import { motion } from "framer-motion";
import "./styles.css";
import * as React from "react";
import { useLocation, useRoutes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  const location = useLocation();  

  return (
    <>
      <div className='Start'>
              <motion.div 
                className="RectangleStart BoxStartUp"
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: "-100%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.55,
                  delay: 1.4,
                  ease: [1, 0.0, 0.5, 1.0]
                }}
              />
              <motion.div className="RectangleStart BoxStartDown"
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: "100%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 1.4,
                  ease: [1, 0.0, 0.5, 1.0]
                }}
              />
              <div className='Startcenter'>
                <div className="PosLogoStart">  
                  <div className="LogoStartContrainer">
                    <div className="LogoStart">

                    </div>
                  </div>
                </div>  
                <motion.div
                  className="LogoAfterStart"
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 0.8}}
                  transition={{
                    duration:0,
                    delay: 0,
                    /*                  duration: 0.8,
                    delay: 2.65, */
                    ease: [0.6, 0.5, 0.6, 0.9]
                  }}
                />
              </div> 

      </div>
      

    </>
  );
}

export default App
