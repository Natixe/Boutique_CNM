import React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/*Importation des images*/


export const Moreoffre = () => {
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
        {/*Logo en haut a gauche*/}
        {showAnimeLogoLeftUpset && (      
          <nav className="nav w-clearfix">
            <div>
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
            </div>
          </nav>
        )}
        {/*Nav Bar Apres intro*/}
        {/*Logo en haut a gauche */}
        {showLogoLeftUpset && (        
          <nav className="nav w-clearfix">

            {/*Plus d'offre en haut a droite*/}
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
          </nav>
          
        )}
    </>
   )   
   

}

