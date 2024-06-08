import React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/*Importation des images*/

import LogoCNM from '../assets/LogoCNM.svg';


export const Logocnm = () => {
  const [showAnimeLogoLeftUpset, setshowAnimeLogoLeftUpset] = useState(false);
  const [showLogoLeftUpset, setshowLogoLeftUpset] = useState(false);
  const handleClick = () => {
    reloadMainPage(navigate);
  }; 
  const [showAnimationLogoCnm, setShowAnimationLogoCnm] = useState(false);

  useEffect(() => {
    // Vérifie si l'animation a déjà été jouée
    const hasPlayedAnimationLogoCnm = localStorage.getItem('hasPlayedAnimationLogoCnm');
    if (!hasPlayedAnimationLogoCnm) {
      setShowAnimationLogoCnm(true);
      localStorage.setItem('hasPlayedAnimationLogoCnm', 'true');
    }
  }, []);

  useEffect(() => {
    if (showAnimationLogoCnm) {
      const timerLogoAnimeLeftUpLogo = setTimeout(() => {
        showAnimeLogoLeftUpset(false);
        showLogoLeftUpset(false);
      }, 2000);

      return () => {
        clearTimeout(timerLogoAnimeLeftUpLogo ,timerLogoLeftUp);
      };
    }
  }, [showAnimationLogoCnm]);


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
     {showAnimationLogoCnm && (
      <div>
       {/*Intro Nav Bar*/}
       {/*Logo en haut a gauche*/}
       {showAnimeLogoLeftUpset && (      
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
       )}
       {/*Nav Bar Apres intro*/}
       {/*Logo en haut a gauche */}
       {showLogoLeftUpset && (        
         <motion.div className="ButtonLogoCNMLeftUp">
           <motion.img
             onClick={handleClick}
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
       )}
      </div>
    )}
    {!showAnimationLogoCnm && (
      <div>
       <motion.div className="ButtonLogoCNMLeftUp">
         <motion.img
           onClick={handleClick}
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
    )}
     {/* --------------------------------------- */}
   </>
  )     
}

