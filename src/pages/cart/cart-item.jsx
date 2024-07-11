
import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-contexte"
import { motion, AnimatePresence } from "framer-motion";

export const CartItem = (props) => {
    const { id, formationName, price, formationImage, formationDescription } = props.data
    const { cartItems, cartItemsPrincipal, addToCart, addToCartPrincipal, removeFromCart, removeFromCartPrincipal, updateCartItemCount, updateCartItemCountPrincipal } = useContext(ShopContext)
    
  return (
    <div className='Items'>
        <div className="ContainerformationImage">
          <img className="formationImage" src={formationImage}/>
        </div>
        <div className='description'>
            <p className="DescriptionFormation">
                <b className="TextDescriptionFormation"> {formationName}, {formationDescription}</b>
            </p>
            <p className="price">{price}€</p>
            <div className="contHandler">
              
              <motion.button 
              whileHover={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              whileTap={{ scale: 0.8 }}
              className="CartInputRemove"
              onClick={() => {
                removeFromCart(id);
                removeFromCartPrincipal(id);
              }}>
                <span>-</span>
              </motion.button>
              <input
                type="string"
                min="1" 
                size="2"
                className="CartInput"
                value={cartItems[id] || cartItemsPrincipal[id] || ''} 
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  updateCartItemCount(newValue, id);
                  updateCartItemCountPrincipal(newValue, id);
                }}
              />
              <motion.button
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }} 
              className="CartInputAdd"
              onClick={() => {
                /*addToCart(id);
                addToCartPrincipal(id);*/
              }}>
                <span>+</span>
              </motion.button>

            </div>
        </div>
    </div>
  )
}
