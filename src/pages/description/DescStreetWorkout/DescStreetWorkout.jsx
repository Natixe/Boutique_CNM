import React, { useRef, useEffect, useContext } from 'react';
import "./DescStreetWorkout.css";
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';
import { ShopContext } from "../../../context/shop-contexte";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Street_WorkoutMFG from '../../../assets/StreetWorkoutAssets/Street_WorkoutMFG.webp';

// Calculate X-axis rotation based on mouse position
const calcX = (y, ly) => -(y - ly - window.innerHeight / 40) / 40;
// Calculate Y-axis rotation based on mouse position
const calcY = (x, lx) => (x - lx - window.innerWidth / 40) / 40;




export const DescStreetWorkout = () => {
  const { addToCartPrincipal, cartItemsPrincipal } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent default gesture behavior
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener('gesturestart', preventDefault);
    document.addEventListener('gesturechange', preventDefault);

    return () => {
      document.removeEventListener('gesturestart', preventDefault);
      document.removeEventListener('gesturechange', preventDefault);
    };
  }, []);
  const domTarget = useRef(null);
  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    zoom: 0,
    x: 0,
    y: 0,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const [{ wheelY }, wheelApi] = useSpring(() => ({ wheelY: 0 }));

  useGesture(
    {
      onDrag: ({ active, offset: [x, y] }) =>
        api({ x, y, rotateX: 0, rotateY: 0, scale: active ? 1 : 1.1 }),
      onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        api({
          rotateX: calcX(py, y.get()),
          rotateY: calcY(px, x.get()),
          scale: 1.05,
        }),
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
      onWheel: ({ event, offset: [, y] }) => {
        event.preventDefault();
        wheelApi.set({ wheelY: y });
      },
    },
    { domTarget, eventOptions: { passive: false } }
  );

  return (
    <motion.div 
    className='Description'
    animate={{ backgroundColor: ["#D3D3D3", "#141417"] }}
    transition={{ duration: 1.5, loop: Infinity, ease: "easeInOut" }}
    >
      <div className='ContainerDescription'>
        <div className='ContainerFormationImg'>
          <div className='BOXImgFormation'></div>
          <div className='ImgFormation'>
            <div className="containerCard">
              <animated.div
                ref={domTarget}
                className="card"
                style={{
                  transform: 'perspective(600px)',
                  x,
                  y,
                  scale: to([scale, zoom], (s, z) => s + z),
                  rotateX,
                  rotateY,
                  rotateZ,
                }}
              >
                <img 
                  className="BOX" 
                  src={Street_WorkoutMFG}
                ></img>
              </animated.div>
            </div>
          </div>
        </div>
        <div className='ContainerFormationDesc'>
          <div className='DescUp'>
            <div className='ContainerTitleDesc'>
              <motion.p 
              className='TitleDesc'
              initial={{ color: '#000000' }} 
              animate={{ color: '#FF8C78' }}
              transition={{ duration: 3, loop: Infinity, ease: "linear" }}
              >Street workout</motion.p>
            </div>
            <div className='ContainerPriceDesc'>
              <p className='PriceDesc'>1201.99€</p>
            </div>
          </div>
          <div className='DescDown'>
            <div className='ContainerDesc'>
              <p className='Desc'>Description de la formation...</p>
            </div>
            <div className='ContainerAddToCar'>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.90 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 17 }
                }
                onClick={() => {
                  navigate("/cart");
                  addToCartPrincipal(8);
                }}
                className='ButtonAddToCard'>
                Ajouter au PANIER
              </motion.button>
              <div className='BOXPAY'></div>
              <motion.button 
                
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 17 }
                }
                onClick={() => addToCartPrincipal(8)} 
                className='ButtonAddToPaypal'>
                Payer avec PayPal
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
