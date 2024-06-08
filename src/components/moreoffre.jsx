import React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";



/*Importation des images*/


export const Moreoffre = () => {
    const [showAnimeLogoLeftUpsetMoreOffre, setshowAnimeLogoLeftUpset] = useState(false);
    const [showLogoLeftUpsetMoreOffre, setshowLogoLeftUpset] = useState(false);

    const [showAnimationMoreOffre, setShowAnimationMoreOffre] = useState(false);

    useEffect(() => {
      // Vérifie si l'animation a déjà été jouée
      const hasPlayedAnimationMoreOffre = localStorage.getItem('hasPlayedAnimationMoreOffre');
      if (!hasPlayedAnimationMoreOffre) {
        setShowAnimationMoreOffre(true);
        localStorage.setItem('hasPlayedAnimationMoreOffre', 'true');
      }
    }, []);
  
    useEffect(() => {
      if (showAnimationMoreOffre) {
        const timerLogoAnimeLeftUpMoreOffre = setTimeout(() => {
          showAnimeLogoLeftUpsetMoreOffre(false);
          showLogoLeftUpsetMoreOffre(false);
        }, 2000);
  
        return () => {
          clearTimeout(timerLogoAnimeLeftUpMoreOffre,timerLogoLeftUp);
        };
      }
    }, [showAnimationMoreOffre]);


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
      {showAnimationMoreOffre && (
      <div>
        {/*Intro Nav Bar*/}
        {/*Logo en haut a gauche*/}
        {showAnimeLogoLeftUpsetMoreOffre && (      
          <motion.div
            className="MoreProducts"
            initial={{ y: "-250%"}}
            animate={{ y: "0%"}}
            transition={{ 
              duration: 0.6,
              delay: 0.8,
              ease: [0, 0, 0.5, 1.0]
            }}
          >
            <div className="MoreProductsText">
            Plus d'offre
            </div>
          </motion.div>       
        )}
        {/*Nav Bar Apres intro*/}
        {/*Logo en haut a gauche */}
        {showLogoLeftUpsetMoreOffre && (        
          <div
            className="MoreProductsContainer"
          >
              <motion.div
                className="MoreProducts"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 17 }
                }
              >
                <h1 className="MoreProductsText">
                Plus d'offre
                </h1>
              </motion.div>
          </div>
        )}  
      </div>
      )}   
      {!showAnimationMoreOffre && (
        <div
          className="MoreProductsContainer"
        >
          <motion.div
            className="MoreProducts"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 17 }
            }
          >
            <h1 className="MoreProductsText">
            Plus d'offre
            </h1>
          </motion.div>
        </div>
      )}  
    </>
   )   
   

}

