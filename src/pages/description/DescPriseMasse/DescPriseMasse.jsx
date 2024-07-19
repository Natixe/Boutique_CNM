import React, { useRef, useEffect, useContext } from 'react';
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';
import { ShopContext } from "../../../context/shop-contexte";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PriseMasse from '../../../assets/PriseDeMasseAssets/PriseDeMasseMFG.webp';
import "../Desc.css";

// Calculate X-axis rotation based on mouse position
const calcX = (y, ly) => -(y - ly - window.innerHeight / 40) / 40;
// Calculate Y-axis rotation based on mouse position
const calcY = (x, lx) => (x - lx - window.innerWidth / 40) / 40;




export const DescPriseMasse = () => {
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
    <>
    <motion.div 
    className='Description'
    animate={{ backgroundColor: ["#D3D3D3", "#141417"] }}
    transition={{ duration: 1.5, loop: Infinity, ease: "easeInOut" }}
    >
      <div className='BOXUP'></div>
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
                  src={PriseMasse}
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
              >Prise de Masse®</motion.p>
            </div>
            <div className='ContainerPriceDesc'>
              <p className='PriceDesc'>29.99€</p>
            </div>
          </div>
          <div className='DescDown'>
            <div className='ContainerDesc'>
              <p className='Desc'>
              Le programme de prise de masse est spécialement conçu pour favoriser une augmentation significative de la masse musculaire et de la force. Grâce à une combinaison de conseils nutritionnels détaillés et d'un plan d'entraînement intensif, ce programme garantit des résultats optimaux.<br/>
              <br/>
              Rejoignez notre programme dès maintenant et accédez à nos formations personnalisables pour une prise de masse propre et efficace. Ensemble, atteignons vos objectifs de force et de performance.</p>
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
                    addToCartPrincipal(2);
                  }}
                  className='ButtonAddToCard'>
                  Ajouter au PANIER
                </motion.button>
              </div>            
            </div>
          </div>
        </div>
        
      </div>
      <div className='ContainerInfoDesc'>
        <div className='InfoDesc'>
          <div className='TitleInfoDesc'>
            <div className='BOXDescTitleBack'></div>
            <div className='DescTitleBack' >Description</div>
          </div>
          <div className='textInfoDesc'>
            <div className='texteDesc'>
            Découvrez notre programme Prise de Masse, spécialement conçu pour augmenter votre masse musculaire, votre force et améliorer vos performances globales. Avec 40 conseils essentiels, ce programme vous guide à travers une prise de masse propre et efficace.<br/>
              <br/>
              <h1 className='TitleDesc2'>Pourquoi choisir notre programme Prise de Masse ?<br/></h1>
              <br/>
              <div className='texteDesc'>
              Vous apprendrez à gérer un surplus calorique modéré, à augmenter votre apport en protéines, et à équilibrer vos macronutriments pour des résultats optimaux. <br/>
              Profitez d’un plan nutritionnel détaillé incluant des sources variées de protéines, de glucides complexes, et de lipides sains pour nourrir vos muscles et maximiser votre récupération. <br/>
              En complément, des exercices de musculation ciblés et un suivi rigoureux vous aideront à atteindre vos objectifs.<br/>
              Des exercices composés et des techniques de surcharge progressive sont utilisés pour garantir un développement musculaire équilibré et une puissance accrue des membres inférieurs.<br/>
              <br/>
              </div>
              <h1 className='TitleDesc2'>Les Avantages de Norte Prise de Masse :<br/></h1>
              <br/>
              <div className='texteDesc'>
                Augmentation de la Masse Musculaire :&nbsp; Notre programme est conçu pour maximiser l'hypertrophie musculaire en utilisant des techniques d'entraînement avancées et une alimentation adaptée. Vous verrez une croissance significative de vos muscles en peu de temps.<br/>
                Amélioration de la Force Fonctionnelle :&nbsp; En plus d'augmenter la masse musculaire, notre programme se concentre sur l'amélioration de la force fonctionnelle, ce qui vous permet d'effectuer vos activités quotidiennes avec plus d'efficacité et de puissance.<br/>
                <br/>
              </div>
              <div>
              Rejoignez notre formation Prise de Masse et découvrez comment exploiter pleinement votre potentiel, dépasser vos limites et obtenir des résultats impressionnants. Chaque séance est une étape vers un corps plus fort,et en meilleure santé. Transformez votre routine d'entraînement et voyez la différence !
              </div>
            </div>

          </div>
        </div>
        
        <div className='MarketingInfoDesc'>
          <div className='MaketingContainer'>

            <div className='AvantageInfoDesc'>
                <div className='AvantageInfoTitle'>Avantages</div>
                <div className='texteDescAvantageBOX'></div>
                <div className='texteDescAvantage'>Hypertrophie Musculaire Maximale :&nbsp; Favorise une croissance rapide des muscles.</div>
                <div className='texteDescAvantage'>Posture et Stabilité :&nbsp; Renforce les muscles posturaux, réduisant les douleurs dorsales.</div>
                <div className='texteDescAvantage'>Développement :&nbsp; Assure un développement harmonieux de tous les groupes musculaires.</div>
                <div className='texteDescAvantage'>Adaptabilité :&nbsp;Exercices pour ajuster l'intensité, permettant progression individuelle.</div>
                <div className='texteDescAvantage'>Le Plaisir de le Variété :&nbsp;Diversité des exercices et routines maintient l'intérêt et l'excitation.</div>
            </div>
            <div className='leplusInfoDesc'>

            </div>  
          </div>   
        </div>

      </div>

    </motion.div>
    </>
  );
};