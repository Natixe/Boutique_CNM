import React, { useRef, useEffect, useContext } from 'react';
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';
import { ShopContext } from "../../../context/shop-contexte";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PDMuscleMFG from '../../../assets/PDMuscleAssets/PDMuscleMFG.webp';
import "../Desc.css";

// Calculate X-axis rotation based on mouse position
const calcX = (y, ly) => -(y - ly - window.innerHeight / 40) / 40;
// Calculate Y-axis rotation based on mouse position
const calcY = (x, lx) => (x - lx - window.innerWidth / 40) / 40;




export const DescPDMuscle = () => {
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
                  src={PDMuscleMFG}
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
              >Prise de Muscle ®</motion.p>
            </div>
            <div className='ContainerPriceDesc'>
              <p className='PriceDesc'>39.99€</p>
            </div>
          </div>
          <div className='DescDown'>
            <div className='ContainerDesc'>
              <p className='Desc'>
              Cette formation de musculation est conçue pour maximiser la prise de muscle grâce à un programme structuré. Chaque jour cible des groupes musculaires spécifiques avec des exercices variés et des séries dégressives pour pousser vos muscles à leur limite<br/>
              <br/>
              Ce programme détaillé assure un développement musculaire équilibré, optimisant chaque répétition et repos pour des résultats rapides et efficaces. Suivez ce guide, dépassez vos limites pour des muscles plus forts et mieux définis.</p>
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
                  addToCartPrincipal(7);
                }}
                className='ButtonAddToCard'>
                Ajouter au PANIER
              </motion.button>
              <div className='BOXPAY'></div>
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
            Découvrez notre formation de musculation Prise de Muscle, conçue pour transformer votre physique et optimiser votre croissance musculaire. Ce programme intensif de sept jours est structuré pour cibler efficacement tous les principaux groupes musculaires, en alternant entre jours d'entraînement intensif et jours de repos stratégiques.<br/>
              <br/>
              <h1 className='TitleDesc2'>Pourquoi choisir notre programme  Prise de Muscle ?<br/></h1>
              <br/>
              <div className='texteDesc'>
                Vous commencerez par des sessions axées sur le renforcement du haut du corps, notamment les pectoraux, épaules et biceps, avec une variété d'exercices stimulants et progressifs. <br/>Ces sessions sont conçues pour maximiser l'hypertrophie musculaire et améliorer votre force fonctionnelle. Les techniques de séries dégressives sont intégrées pour pousser vos muscles à leur maximum et favoriser une croissance rapide et efficace.             
                <br/>Le programme inclut également des journées dédiées à l'entraînement du dos, des triceps et des trapèzes, mettant l'accent sur des mouvements de tirage et de poussée pour sculpter et définir ces muscles clés. &nbsp;<br/>Ces séances visent à améliorer la posture, la force et la définition musculaire.
                <br/>Les jambes ne sont pas en reste, avec des jours spécifiques pour travailler intensément les quadriceps, ischio-jambiers et mollets. &nbsp;<br/>Des exercices composés et des techniques de surcharge progressive sont utilisés pour garantir un développement musculaire équilibré et une puissance accrue des membres inférieurs.
              </div>
              <h1 className='TitleDesc2'>Les Avantages de Prise de Muscle:<br/></h1>
              <br/>
              <div className='texteDesc'>
                Amélioration de la Condition Physique :&nbsp; En combinant des exercices de force, de flexibilité et de cardio, ce programme booste votre endurance et votre agilité.<br/>
                Brûlage de Graisses :&nbsp; Les mouvements intenses et dynamiques aident à augmenter votre métabolisme, facilitant la perte de graisse tout en construisant du muscle.<br/>
                <br/>
              </div>
              <div>
              Rejoignez notre formation Prise de Muscle et découvrez comment exploiter pleinement votre potentiel, dépasser vos limites et obtenir des résultats impressionnants. Chaque séance est une étape vers un corps plus fort, plus défini et en meilleure santé. Transformez votre routine d'entraînement et voyez la différence !
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
                <div className='texteDescAvantage'>Brûlage de Graisses :&nbsp;Mouvements intenses, facilitant perte de graisse et gain de muscle.</div>
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