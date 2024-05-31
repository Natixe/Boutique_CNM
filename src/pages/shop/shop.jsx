import React from 'react'
import { FORMATION } from "../../Formation"
import { Formation } from "./formation"
import "./shop.css";


export const Shop = () => {


  return (
    <div className='ContainerHome'>
      <div className='shop'>
          <div className='shopTitle'>
              <h1>Formation 123</h1>
          </div>
          <div className='formations'>
              {" "}    
              {FORMATION.map((formation) => (
              <Formation data={formation} />
              ))}
          </div>
      </div>
    </div>  
  )
}
