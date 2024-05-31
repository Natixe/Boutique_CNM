import React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";

/*Importation des images*/
import CartLogo from '../assets/Cart.svg';

export const Cart = () => {
    const [showAnimeLogoLeftUpset, setshowAnimeLogoLeftUpset] = useState(false);
    const [showLogoLeftUpset, setshowLogoLeftUpset] = useState(false);

    useEffect(() => {

    /*Ajoute le Logo cnm en haut a gauche puis Supprime le logo CNM en haut a gauche*/
    const timerLogoAnimeLeftUp = setTimeout(() => {
        setshowAnimeLogoLeftUpset(true);
      }, 2000);

    const timerLogoLeftUp = setTimeout(() => {
        setshowAnimeLogoLeftUpset(false);
        setshowLogoLeftUpset(true);
      }, 3300);

    return () => clearTimeout(timerLogoAnimeLeftUp,timerLogoLeftUp);
    }, []); 
  return (
    <>
        {/*Intro Nav Bar*/}
        {/*Cart en haut a droite*/}
        {showAnimeLogoLeftUpset && (    
          <motion.div className="CartContainer">
            <motion.img
              className="Cart"
              initial={{ y: "-250%"}}
              animate={{ y: "0%"}}
              transition={{ 
                duration: 0.6,
                delay: 0.75,
                ease: [0, 0, 0.5, 1.0]
              }}
              src={CartLogo} 
              alt=""                 
            />
          </motion.div>
        )}
        {/*Nav Bar Apres intro*/}
        {/*Cart en haut a droite */}
        {showLogoLeftUpset && (   
        <motion.div className="CartContainer">     
          <motion.img
            className="Cart"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, filter: "blur(0.6px)"}}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 17 }
            }
            src={CartLogo} 
            alt=""             
          />
        </motion.div>       
        )}        
    </>
  )
}
