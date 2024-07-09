
import React, { useRef, useEffect, useContext } from 'react';
import "../Desc.css";
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
              >Street workout ®</motion.p>
            </div>
            <div className='ContainerPriceDesc'>
              <p className='PriceDesc'>39.99€</p>
            </div>
          </div>
          <div className='DescDown'>
            <div className='ContainerDesc'>
              <p className='Desc'>
              Découvrez notre programme de musculation Street Workout, conçu pour transformer votre corps en seulement cinq jours par semaine. Chaque séance, ne durant jamais plus de 1h30, est axée sur la prise de muscle avec des exercices efficaces et variés.<br/>
              <br/>
              Rejoignez-nous pour atteindre vos objectifs de musculation avec des séances dynamiques et complètes, adaptées à tous les niveaux. Transformez votre corps et dépassez vos limites avec notre programme Street Workout !</p>
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
              Transformez votre physique avec notre programme de musculation Street Workout, une méthode innovante et complète pour sculpter votre corps en un rien de temps. Conçu pour maximiser la prise de muscle et améliorer la condition physique générale, ce programme s'adapte à tous les niveaux, du débutant à l'athlète confirmé.<br/>
              <br/>
              <h1 className='TitleDesc2'>Pourquoi choisir notre programme Street Workout ?<br/></h1>
              <br/>
              <div className='texteDesc'>
                Polyvalence et Accessibilité :&nbsp;Sans besoin d'équipement sophistiqué, ce programme utilise principalement le poids du corps pour des résultats impressionnants, que vous soyez à la maison, au parc ou en voyage.
                <br/>Gain de Muscles et Force :&nbsp;En mettant l'accent sur des mouvements composés et des exercices de résistance, chaque séance est conçue pour cibler plusieurs groupes musculaires, favorisant une croissance musculaire harmonieuse.<br/>
                Entraînements Structurés :&nbsp;Chaque jour de la semaine est dédié à un focus spécifique, garantissant un équilibre entre les différentes parties du corps et permettant une récupération optimale.
                <br/>Durée Optimisée :&nbsp;Avec des séances de moins de 1h30, ce programme est idéal pour ceux qui ont un emploi du temps chargé mais qui souhaitent tout de même obtenir des résultats significatifs.
                <br/>Évolution Continue :&nbsp;Des exercices progressifs et variés maintiennent votre motivation et votre engagement, tout en évitant les plateaux de performance.<br/>
                <br/>
              </div>
              <h1 className='TitleDesc2'>Les Avantages du Street Workout:<br/></h1>
              <br/>
              <div className='texteDesc'>
                Amélioration de la Condition Physique :&nbsp; En combinant des exercices de force, de flexibilité et de cardio, ce programme booste votre endurance et votre agilité.<br/>
                Brûlage de Graisses :&nbsp; Les mouvements intenses et dynamiques aident à augmenter votre métabolisme, facilitant la perte de graisse tout en construisant du muscle.<br/>
                Renforcement du Cœur et de l’Esprit :&nbsp; En relevant les défis physiques du Street Workout, vous renforcez non seulement votre corps mais aussi votre discipline mentale et votre résilience.<br/>
                <br/>
              </div>
              <div>
                Rejoignez notre programme de musculation Street Workout et découvrez une nouvelle façon de vous entraîner, où que vous soyez. <br/>Avec des résultats visibles et durables, préparez-vous à révéler la meilleure version de vous-même !
              </div>
            </div>

          </div>
        </div>
        
        <div className='MarketingInfoDesc'>
          <div className='MaketingContainer'>

            <div className='AvantageInfoDesc'>
                <div className='AvantageInfoTitle'>Avantages</div>
                <div className='texteDescAvantageBOX'></div>
                <div className='texteDescAvantage'>Efficacité :&nbsp;Des exercices ciblés pour chaque groupe musculaire.</div>
                <div className='texteDescAvantage'>Flexibilité :&nbsp;Séances de moins de 1h30, parfaites pour un emploi du temps chargé.</div>
                <div className='texteDescAvantage'>Progression :&nbsp; Un programme structuré pour des gains de force et de muscle.</div>
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
