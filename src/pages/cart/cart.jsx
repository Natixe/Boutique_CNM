import React, {useContext} from 'react'
import { FORMATIONS } from '../../Formation'
import { ShopContext } from "../../context/shop-contexte"
import { CartItem } from "./cart-item"
import "./cart.css";
import { useNavigate } from "react-router-dom";
import { FORMATIONPRINCIPAL } from "../../Formation"

export const Cart = () => {
  const { cartItems, cartItemsPrincipal, getTotalCartAmount, getTotalCartAmountPrincipal, checkout, checkoutPrincipal } = useContext(ShopContext)
  const totalAmount = getTotalCartAmount()
  const totalAmountPrincipal = getTotalCartAmountPrincipal()
  const navigate = useNavigate();

  return (
    <div className='cartContainer'>
      <div className='cart'>
        <div> 
          <h1>Votre panier</h1>
        </div>
        <div className='cartItems'>
        {FORMATIONS.map((formation) => {
        if (cartItems[formation.id] !== 0) {
          return <CartItem key={`formation-${formation.id}`} data={formation} />;
        }
        return null;
         })}
         
        {FORMATIONPRINCIPAL.map((formation) => {
          if (cartItemsPrincipal[formation.id] !== 0) {
            return <CartItem key={`formationprincipal-${formation.id}`} data={formation} />;
          }
          return null;
        })}

        </div>
        {(totalAmount + totalAmountPrincipal) > 0 ? (
          <div className="checkout">
            <p> Total: ${totalAmount + totalAmountPrincipal} </p>
            <button onClick={() => navigate("/shop")}> Continuer vos achats </button>
            <button
              onClick={() => {
                checkout();
                navigate("/checkout");
              }}
            >
              Payement
            </button>
          </div>
        ) : (
          <h1> Votre Panier est vide</h1>
        )}
      </div>
    </div>
  )
}
