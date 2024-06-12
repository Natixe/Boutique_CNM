import React from 'react'
import { Formation } from "../shop/formation"
import { FORMATIONS } from "../../Formation"
import "./shop.css";


import { ImageSlider } from '../../components/ImageSlider';



export const Shop = () => {
  return (
    <div className='ContainerHome'>
      <div className='shop'>
        <div className='TextShop'>
          <div className='shopTitle'>
              <div>Les Formations</div>
          </div>
          <div className='shopSubTitle'>
              <div>Pensé pour vous plaire.</div>
          </div>
        </div> 
        <div className='ImageIntroductionContainer'>  
            <ImageSlider />
        </div> 
        <div className='formations'>
            {FORMATIONS.map((formation) => (
            <Formation data={formation} />
            ))}
        </div>
      </div>
    </div>  
  )
}
