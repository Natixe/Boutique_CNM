import React, {useContext} from 'react'
import { FORMATION } from '../../Formation'
import { ShopContext } from "../../context/shop-contexte"
import {CartItem} from "./cart-item"

export const Cart = () => {
  const { cartItems } = useContext(ShopContext)

  return (
    <div className='cart'>
      <div> 
        <h1>Votre panier</h1>
      </div>
      <div className='cartItems'>
        {FORMATION.map((formation) => {
          if (cartItems[formation.id] !== 0){
            return <CartItem data={formation} />
          }
        })}
      </div>
    </div>
  )
}
