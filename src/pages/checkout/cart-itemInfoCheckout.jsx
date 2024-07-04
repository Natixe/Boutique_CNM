import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-contexte"
import { motion, AnimatePresence } from "framer-motion";

export const CartItemInfoCheckout = (props) => {
    const { id, formationName, price, formationImage, formationDescription } = props.data
    const { cartItems, cartItemsPrincipal, addToCart, addToCartPrincipal, removeFromCart, removeFromCartPrincipal, updateCartItemCount, updateCartItemCountPrincipal } = useContext(ShopContext)
    
  return (
    <div className='Items'>
        <div className="ContainerformationImageinfo">
          <img className="formationImageinfo" src={formationImage}/>
        </div>
        <div className='descriptionInfo'>
            <p className="DescriptionFormationInfo">
                <b className="TextDescriptionFormationInfo"> {formationName}</b>
            </p>
            <p className="price">{price}€</p>
            <div className="contHandler">
              <input
                type="string"
                min="1" 
                size="2"
                className="CartInput"
                value={cartItems[id] || cartItemsPrincipal[id] || ''} 
              />

            </div>
        </div>
    </div>
  )
}