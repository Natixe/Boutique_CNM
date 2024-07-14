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




export const DescSeche = () => {
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
              >Sèche®</motion.p>
            </div>
            <div className='ContainerPriceDesc'>
              <p className='PriceDesc'>29.99€</p>
            </div>
          </div>
          <div className='DescDown'>
            <div className='ContainerDesc'>
              <p className='Desc'>
              Notre programme Sèche est conçu pour vous aider à atteindre vos objectifs de perte de poids et de tonification en un temps record. Avec un plan d'entraînement intensif et un guide nutritionnel personnalisé, notre programme vise à transformer votre corps tout en améliorant votre bien-être général. Que vous soyez débutant ou athlète confirmé, nous adaptons nos méthodes pour garantir des résultats optimaux.<br/>
              <br/>
              Ce plan détaillé assure un développement musculaire équilibré, optimisant chaque répétition et période de repos pour des résultats rapides et efficaces. Suivez ce guide, dépassez vos limites pour obtenir des muscles plus forts et mieux définis.</p>
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
                  addToCartPrincipal(3);
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
            Plongez dans notre programme intensif de perte de poids "Sèche", conçu pour métamorphoser votre corps et maximiser la combustion des graisses, séances d'entraînement intensives avec des jours de repos calculés pour optimiser votre récupération et vos résultats.<br/>
              <br/>
              <h1 className='TitleDesc2'>Pourquoi choisir notre programme Sèche ?<br/></h1>
              <br/>
              <div className='texteDesc'>
              Choisir notre programme "Sèche" c'est opter pour une approche scientifiquement validée et adaptée à vos besoins spécifiques. <br/>
              Nous offrons un soutien continu et des conseils d'experts pour vous aider à surmonter tous les obstacles sur votre chemin vers une meilleure forme physique.
              La nutrition est un pilier essentiel de notre programme Sèche. Nos nutritionnistes vous fournissent des plans alimentaires détaillés et équilibrés, adaptés à vos goûts et à votre mode de vie.<br/>
              Nous vous aidons à comprendre l'importance des macronutriments et à faire des choix alimentaires qui soutiennent vos objectifs de perte de poids.
              Notre programme est conçu pour produire des résultats visibles en un temps record. <br/>
              Cependant, nous nous concentrons également sur la durabilité, en vous enseignant des habitudes de vie saines que vous pouvez maintenir longtemps après avoir atteint vos objectifs initiaux.<br/>
              <br/>
              </div>
              <h1 className='TitleDesc2'>Les Avantages de notre Sèche:<br/></h1>
              <br/>
              <div className='texteDesc'>
                Plan d'entraînement personnalisé :&nbsp; Un programme adapté à vos objectifs et à votre niveau de forme physique.<br/>
                Suivi nutritionnel :&nbsp; Des conseils diététiques pour maximiser vos résultats.<br/>
                Résultats visibles :&nbsp; Amélioration de la composition corporelle, augmentation de l'énergie et meilleure condition physique générale.<br/>
                <br/>
              </div>
              <div>
              Rejoignez notre sèche et découvrez comment exploiter pleinement votre potentiel, dépasser vos limites et obtenir des résultats impressionnants. Chaque séance est une étape vers un corps plus fort, plus défini et en meilleure santé. Transformez votre routine d'entraînement et voyez la différence !
              </div>
            </div>

          </div>
        </div>
        
        <div className='MarketingInfoDesc'>
          <div className='MaketingContainer'>

            <div className='AvantageInfoDesc'>
                <div className='AvantageInfoTitle'>Avantages</div>
                <div className='texteDescAvantageBOX'></div>
                <div className='texteDescAvantage'>Flexibilité :&nbsp; Programmes ajustables en fonction de vos contraintes de temps.</div>
                <div className='texteDescAvantage'>Posture et Stabilité :&nbsp; Renforce les muscles posturaux, réduisant les douleurs dorsales.</div>
                <div className='texteDescAvantage'>Résultats Visibles et Durables :&nbsp; Assure un développement durable et visible sur le long terme.</div>
                <div className='texteDescAvantage'>Brûlage de Graisses :&nbsp;Mouvements intenses, facilitant perte de graisse et gain de muscle.</div>
                <div className='texteDescAvantage'>Adaptabilité :&nbsp;Exercices pour ajuster l'intensité, permettant progression individuelle.</div>
                <div className='texteDescAvantage'>Expertise :&nbsp; Encadrement par des professionnels de la santé et de la forme physique.</div>
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