import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-contexte"

export const CartItem = (props) => {
    const { id, formationName, price, formationImage } = props.data
    const { cartItems, cartItemsPrincipal, addToCart, addToCartPrincipal, removeFromCart, removeFromCartPrincipal, updateCartItemCount, updateCartItemCountPrincipal } = useContext(ShopContext)
    
  return (
    <div className='cartItem'>
        <img src={formationImage}/>
        <div className='description'>
            <p>
                <b> {formationName} </b>
            </p>
            <p>{price}€</p>
            <div className="contHandler">
              <button onClick={() => {
                  addToCart(id);
                  addToCartPrincipal(id);
                  (id);
              }}>+</button>
              <input 
                value={cartItems[id] || cartItemsPrincipal[id] || ''} 
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  updateCartItemCount(newValue, id);
                  updateCartItemCountPrincipal(newValue, id);
                }}
              />
              
              <button onClick={() => {
                  removeFromCart(id);
                  removeFromCartPrincipal(id);
              }}>-</button>
            </div>
        </div>
    </div>
  )
}
