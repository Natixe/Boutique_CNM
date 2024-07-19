import React, { useRef, useEffect, useContext } from 'react';
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';
import { ShopContext } from "../../../context/shop-contexte";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PDDébutantMFG from '../../../assets/PDDébutantAssets/PDDébutantMFG.webp';
import "../Desc.css";

// Calculate X-axis rotation based on mouse position
const calcX = (y, ly) => -(y - ly - window.innerHeight / 40) / 40;
// Calculate Y-axis rotation based on mouse position
const calcY = (x, lx) => (x - lx - window.innerWidth / 40) / 40;




export const DescPDDébutant = () => {
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
                  src={PDDébutantMFG}
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
              >Le Débutant ®</motion.p>
            </div>
            <div className='ContainerPriceDesc'>
              <p className='PriceDesc'>39.99€</p>
            </div>
          </div>
          <div className='DescDown'>
            <div className='ContainerDesc'>
              <p className='Desc'>
              Cette formation de musculation est conçue par des professionnels pour maximiser la prise de muscle grâce à un programme structuré. Chaque jour cible des groupes musculaires spécifiques avec des exercices variés et des séries dégressives pour pousser vos muscles à leur limite.<br/>
              <br/>
              Ce programme détaillé, adapté aux débutants, assure un développement musculaire équilibré, optimisant chaque répétition et repos pour des résultats rapides et efficaces. Suivez ce guide, dépassez vos limites pour des muscles plus forts et mieux définis.</p>
              <br/>
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
                    addToCartPrincipal(6);
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
            Découvrez notre programme pour débutants conçu pour ceux qui ont peu ou pas d'expérience sportive. En 8 semaines, gagnez en force, musclez-vous et perdez du gras pour obtenir un corps qui vous plaît. Écrit par des professionnels, ce programme peut se combiner avec nos autres offres de sèche ou prise de masse, disponibles sur notre site. Profitez de séances intenses et rapides, adaptées à votre niveau, pour des résultats efficaces et durables.<br/>
              <br/>
              <h1 className='TitleDesc2'>Pourquoi choisir notre programme pour les débutants ?<br/></h1>
              <br/>
              <div className='texteDesc'>
              Ce programme, spécialement conçu pour les débutants, s'adresse à ceux qui n'ont jamais pratiqué ou peu pratiqué d'activité sportive.<br/>  
              À travers des gains musculaires et une perte de gras, vous pourrez vous forger un corps qui vous plaît.<br/> 
              <br/> 
              Écrit par des professionnels spécialisés, ce programme a été réfléchi pour vous offrir une expérience agréable et efficace. 
              Les séances sont courtes mais intenses, avec un accent particulier sur l'hypertrophie musculaire et la force fonctionnelle.<br/>  
              Chaque session est structurée pour inclure des exercices variés et progressifs, tels que des séries dégressives pour maximiser les résultats. 
              En plus des exercices pour les pectoraux, épaules et biceps, le programme intègre des journées dédiées au dos, triceps et trapèzes, ainsi qu'aux quadriceps, ischio-jambiers et mollets. 
              Vous bénéficierez d'une approche équilibrée et progressive, visant à améliorer votre posture, votre force et la définition musculaire.<br/>  
              Le programme peut également être combiné avec notre offre de sèche ou prise de masse, disponible sur notre site.
              </div>
              <h1 className='TitleDesc2'>Les Avantages du Programme débutants :<br/></h1>
              <br/>
              <div className='texteDesc'>
                Le Programme Débutants est conçu spécialement pour ceux qui n'ont jamais ou peu pratiqué d'activité sportive.<br/>
                Il offre une approche complète pour obtenir des gains musculaires et perdre du gras, vous aidant à sculpter un corps qui vous plaît.<br/>
                <br/>
              </div>
              <div>
              Rejoignez notre formation et profitez d'un accompagnement personnalisé et atteignez vos objectifs de manière efficace et sécurisée. Transformez votre physique et boostez votre confiance grâce à un parcours sportif adapté à votre niveau et à vos ambitions.
              </div>
            </div>

          </div>
        </div>
        
        <div className='MarketingInfoDesc'>
          <div className='MaketingContainer'>

            <div className='AvantageInfoDesc'>
                <div className='AvantageInfoTitle'>Avantages</div>
                <div className='texteDescAvantageBOX'></div>
                <div className='texteDescAvantage'>Musculation Progressive :&nbsp; Idéal pour les novice, favorisant une croissance musculaire équilibrée.</div>
                <div className='texteDescAvantage'>Perte de Graisse :&nbsp; Des exercices qui aident à brûler les graisses tout en gagnant en muscle.</div>
                <div className='texteDescAvantage'>Développement :&nbsp; Assure un développement harmonieux de tous les groupes musculaires.</div>
                <div className='texteDescAvantage'>Flexibilité :&nbsp;Peut être combiné avec nos programmes de sèche ou de prise de masse.</div>
                <div className='texteDescAvantage'>Adaptabilité :&nbsp;Exercices pour ajuster l'intensité, permettant progression individuelle.</div>
                <div className='texteDescAvantage'>Encadrement Professionnel :&nbsp;Conçu par des experts en fitness, garantissant sécurité et efficacité.</div>
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