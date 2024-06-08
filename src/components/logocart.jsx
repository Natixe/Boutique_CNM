import React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";

/*Importation des images*/
import CartLogo from '../assets/Cart.svg';

export const Cart = () => {
  const [showAnimeLogoLeftUpsetCart, setshowAnimeLogoLeftUpset] = useState(false);
  const [showLogoLeftUpsetCart, setshowLogoLeftUpset] = useState(false);
  
  const [showAnimationCart, setShowAnimationCart] = useState(false);
  useEffect(() => {
    // Vérifie si l'animation a déjà été jouée
    const hasPlayedAnimationCart = localStorage.getItem('hasPlayedAnimationCart');
    if (!hasPlayedAnimationCart) {
      setShowAnimationCart(true);
      localStorage.setItem('hasPlayedAnimationCart', 'true');
    }
  }, []);

  useEffect(() => {
    if (showAnimationCart) {
      const timerLogoAnimeLeftUpCart = setTimeout(() => {
        showAnimeLogoLeftUpsetCart(false);
        showLogoLeftUpsetCart(false);
      }, 2000);

      return () => {
        clearTimeout(timerLogoAnimeLeftUpCart);
      };
    }
  }, [showAnimationCart]);


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
     {showAnimationCart && (
      <div>
        {/*Intro Nav Bar*/}
        {/*Cart en haut a droite*/}
        {showAnimeLogoLeftUpsetCart && (    
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
        {showLogoLeftUpsetCart && (   
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
      </div> 
    )}
    {!showAnimationCart && (
      <div>
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
      </div>
    )}       
    </>
  )
}
