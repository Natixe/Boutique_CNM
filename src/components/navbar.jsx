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
import {MenuHamburger} from "../components/MenuHamburger/MenuHamburger";

export const Navbar = () => {

  const [showAnimationNavBar, setShowAnimationNavBar] = useState(false);
  const [showNavBar, setshowNavBar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 490);
  const [NavInContainer, setNavInContainer] = useState('BNavInContainer');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 490);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
      // Vérifie si l'animation a déjà été jouée
      const hasPlayedAnimationHome = localStorage.getItem('hasPlayedAnimationHome');
      if (!hasPlayedAnimationHome) {
        setShowAnimationNavBar(true);
      }
      }, []);
  useEffect(() => {
        const timerNavBar = setTimeout(() => {
          setshowNavBar(true);
        }, 100);
  
        return () => {
          clearTimeout(timerNavBar);
        };

    }, []);
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
              <Link to="/">
                  <Logocnm />              
              </Link>
              {isMobile ? (
                <div className='RightNavBarre'>
                  <MenuHamburger />
                </div>
              ) : (
                <div className='RightNavBarre'>
                  <Link to="/shop" className='ButtonShopNav'> 
                      <Moreoffre /> 
                  </Link>
                  <Link to="/cart" className='ButtonShopCart'>
                      <Cart />              
                  </Link>
                </div>
              )}
          </div>
      </div>
    )}
    {!showAnimationNavBar &&(
      <div className='nav'>
        {showNavBar &&(
          <div className="NavInContainer">
              <Link to="/">
                  <Logocnm />              
              </Link>
              {isMobile ? (
                <div className='RightNavBarre'>
                  <MenuHamburger />
                </div>
              ) : (
                <div className='RightNavBarre'>
                  <Link to="/shop" className='ButtonShopNav'> 
                      <Moreoffre /> 
                  </Link>
                  <Link to="/cart" className='ButtonShopCart'>
                      <Cart />              
                  </Link>
                </div>
              )}
          </div>
        )}
      </div>
    )}
    </>

  )
}