import React, { useState, useEffect, useContext } from 'react';

import { CartItemPc } from "./cart-item-pc"
import { CartItemMobile } from "./cart-item-mobile"
import { ShopContext } from "../../context/shop-contexte"
import { FORMATIONS } from '../../Formation'
import { FORMATIONPRINCIPAL } from "../../Formation"

export const ReponsiveItem = () => {
  const { cartItems, cartItemsPrincipal, getTotalCartAmount, getTotalCartAmountPrincipal, checkout } = useContext(ShopContext)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 490);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 490);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (            
    <>
      {isMobile ? (
        <div>
          {FORMATIONS.map((formation) => {
            if (cartItems[formation.id] !== 0) {
              return <CartItemMobile key={`formation-${formation.id}`} data={formation} />;
            }
            return null;
          })}
          {FORMATIONPRINCIPAL.map((formation) => {
            if (cartItemsPrincipal[formation.id] !== 0) {
              return <CartItemMobile key={`formationprincipal-${formation.id}`} data={formation} />;
            }
            return null;
          })}
        </div>
      ) : (
        <div>
          {FORMATIONS.map((formation) => {
            if (cartItems[formation.id] !== 0) {
              return <CartItemPc key={`formation-${formation.id}`} data={formation} />;
            }
            return null;
          })}
          {FORMATIONPRINCIPAL.map((formation) => {
            if (cartItemsPrincipal[formation.id] !== 0) {
              return <CartItemPc key={`formationprincipal-${formation.id}`} data={formation} />;
            }
            return null;
          })}
        </div>
      )}
    </>
  )
}