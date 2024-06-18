import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { reloadMainPage } from '../utils.jsx';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import "./navbar.css";

/*import des element de la nav bar*/
import { Logocnm } from "./logocnm";
import { Moreoffre } from "./moreoffre";
import { Cart } from "./logocart";


export const Navbar = () => {

    const [showAnimationNavBar, setShowAnimationNavBar] = useState(false);
    const [showNavBar, setshowNavBar] = useState(false);

    useEffect(() => {
        // Vérifie si l'animation a déjà été jouée
        const hasPlayedAnimationHome = localStorage.getItem('hasPlayedAnimationHome');
        if (!hasPlayedAnimationHome) {
          setShowAnimationNavBar(true);
        }
        }, []);


    console.log(showAnimationNavBar +  " navbar3")

    useEffect(() => {
          const timerNavBar = setTimeout(() => {
            setshowNavBar(true);
          }, 100);
    
          return () => {
            clearTimeout(timerNavBar);
          };

      }, []);



  const [NavInContainer, setNavInContainer] = useState('BNavInContainer');

  useEffect(() => {
      const timer = setTimeout(() => {
          setNavInContainer('NavInContainer');
      }, 2000);

      // Nettoyage du timer pour éviter les fuites de mémoire
      return () => clearTimeout(timer);
  }, []);
  return (
    <> 
    {showAnimationNavBar &&(
      <div className='nav'>
          <div className={NavInContainer}>
              <div className='BOXNAVBARRE1'/>
              <Link to="/">
                  <Logocnm />              
              </Link>
              <div className='BOXNAVBARRE2'/>
              <Link to="/shop"> 
                  <Moreoffre /> 
              </Link>
              <div className='BOXNAVBARRE3'/>
              <Link to="/cart">
                  <Cart />              
              </Link>
              <div className='BOXNAVBARRE4'/>
          </div>

      </div>
    )}
    {!showAnimationNavBar &&(
      <div className='nav'>
        {showNavBar &&(
          <div className="NavInContainer">
              <div className='BOXNAVBARRE1'/>
              <Link to="/">
                  <Logocnm />              
              </Link>
              <div className='BOXNAVBARRE2'/>
              <Link to="/shop"> 
                  <Moreoffre /> 
              </Link>
              <div className='BOXNAVBARRE3'/>
              <Link to="/cart">
                  <Cart />              
              </Link>
              <div className='BOXNAVBARRE4'/>
          </div>
        )}
      </div>
    )}
    </>

  )
}
