import React from 'react'
import { Formation } from "../shop/formation"
import { FORMATIONS } from "../../Formation"
import "./shop.css";
import { motion, AnimatePresence } from 'framer-motion';


import { ImageSlider } from '../../components/ImageSlider';



export const Shop = () => {
  return (
    <div 
    className='ContainerHome'
    >
      <div className='shop'>

        <div className='TextShop'>
          <div className='BoxtextTitleShop1'/>
          <div className='shopTitle'>
              <div>Les Formations</div>
          </div>
          <div className='BoxtextTitleShop2'/>
          <div className='shopSubTitle'>
              <div>Pensé pour vous plaire.</div>
          </div>
          <div className='BoxtextTitleShop3'/>
        </div>

        <div className='ImageIntroductionContainer'>  
          <div className='ImageIntroduction'>
            <ImageSlider />
          </div>
        </div> 
        <div className='formationsContainer'>
          <div className='formations'>
              {FORMATIONS.map((formation) => (
              <Formation data={formation} />
              ))}
          </div>
        </div>
        
      </div>
    </div>  
  )
}
