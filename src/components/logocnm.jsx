import React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/*Importation des images*/

import LogoCNM from '../assets/LogoCNM.svg';


export const Logocnm = () => {
    const [showAnimeLogoLeftUpset, setshowAnimeLogoLeftUpset] = useState(false);
    const [showLogoLeftUpset, setshowLogoLeftUpset] = useState(false);

    useEffect(() => {
    
        /*Ajoute le Logo cnm en haut a gauche puis Supprime le logo CNM en haut a gauche*/
        const timerLogoAnimeLeftUp = setTimeout(() => {
          setshowAnimeLogoLeftUpset(true);
        }, 2000);
    
        /*Ajoute le Logo cnm en haut a gauche puis Supprime le logo CNM en haut a gauche*/
        const timerLogoLeftUp = setTimeout(() => {
          setshowAnimeLogoLeftUpset(false);
          setshowLogoLeftUpset(true);
        }, 3300);
        
        return () => clearTimeout(timerLogoAnimeLeftUp,timerLogoLeftUp);
    }, []); 
    
   return ( 
    <>
        {/*Intro Nav Bar*/}
        {/*Logo en haut a gauche*/}
        {showAnimeLogoLeftUpset && (      
          <nav className="nav w-clearfix">
            <div 
              className="hero-link w-inline-block w--current"
              > 
                <motion.div
                className="ButtonLogoCNMLeftUp">
                  <motion.img
                    className="CNM-logo" 
                    initial={{ y: "-250%"}}
                    animate={{ y: "0%"}}
                    transition={{ 
                      duration: 0.6,
                      delay: 0.7,
                      ease: [0, 0, 0.5, 1.0]
                    }}
                    src={LogoCNM} 
                    alt="" 
                  />
                </motion.div>                  
            </div>
          </nav>
        )}
        {/*Nav Bar Apres intro*/}
        {/*Logo en haut a gauche */}
        {showLogoLeftUpset && (        
          <nav className="nav w-clearfix">
            <div 
              className="hero-link w-inline-block w--current"
              > 
                <motion.div className="ButtonLogoCNMLeftUp">
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
                </motion.div>                  
            </div>
          </nav>
        )}
      {/* --------------------------------------- */}

    </>
   )   
   

}

