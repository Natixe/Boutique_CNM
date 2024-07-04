
import { createContext, useEffect, useState } from "react";
import { FORMATIONS } from "../Formation";
import { FORMATIONPRINCIPAL } from "../Formation";

export const ShopContext = createContext(null);

const getDefaultCartMoreOffre = () => {
  let cart = {};
  for (let i = 9; i <= 14; i++) {
    cart[i] = 0;
  }
  return cart;
};

const getDefaultCartPrincipalFormation = () => {
  let cart = {};
  for (let i = 1; i <= 8; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCartMoreOffre());
  const [cartItemsPrincipal, setCartItemsPrincipal] = useState(getDefaultCartPrincipalFormation());

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = FORMATIONS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const getTotalCartAmountPrincipal = () => {
    let totalAmount = 0;
    for (const item in cartItemsPrincipal) {
      if (cartItemsPrincipal[item] > 0) {
        let itemInfo = FORMATIONPRINCIPAL.find((product) => product.id === Number(item));
        totalAmount += cartItemsPrincipal[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const addToCartPrincipal = (itemId) => {
    setCartItemsPrincipal((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 1) - 1, 0) }));
  };

  const removeFromCartPrincipal = (itemId) => {
    setCartItemsPrincipal((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 1) - 1, 0) }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const updateCartItemCountPrincipal = (newAmount, itemId) => {
    setCartItemsPrincipal((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const contextValue = {
    cartItems,
    cartItemsPrincipal,
    getTotalCartAmount,
    getTotalCartAmountPrincipal,
    addToCart,
    addToCartPrincipal,
    removeFromCart,
    removeFromCartPrincipal,
    updateCartItemCount,
    updateCartItemCountPrincipal,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
