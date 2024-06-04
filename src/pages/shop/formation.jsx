import React, { useContext } from 'react'
import { ShopContext } from "../../context/shop-contexte"

export const Formation = (props) => {
    const { id, formationName, price, formationImage } = props.data
    const { addToCart, cartItems } = useContext(ShopContext)

    const cartItemCount = cartItems[id]
    
  return (
    <div className='formation'>
      <img src={formationImage}/>
      <div className='description'>
        <p>
          <b>{formationName}</b>
        </p>
        <p> {price}€</p>
      </div>
      <button className='addToCartBttn' onClick={()=> addToCart(id)}>
        Ajouter au panier {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  )
}
