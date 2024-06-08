import { createContext, useEffect, useState } from "react";
import { FORMATIONS } from "../Formation";
import { FORMATIONPRINCIPAL  } from "../Formation";

export const ShopContext = createContext(null);

const getDefaultCartMoreOffre = () => {
  let cart = {};
  /*9 = le premiere Id de Formation et 14 le dernier */
  for (let i = 9; i < 14 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const getDefaultCartPrincipalFormation = () => {
  let cart = {};
  /*1 = le premiere Id de FormationPrincipal et 8 le dernier */
  for (let i = 1; i < 8 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};


export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCartMoreOffre());
  
  const [cartItemsPrincipal, setCartItemsprincipal] = useState(getDefaultCartPrincipalFormation());

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
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const addToCartPrincipal = (itemId) => {
    setCartItemsprincipal((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  const removeFromCartPrincipal = (itemId) => {
    setCartItemsprincipal((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const updateCartItemCountPrincipal = (newAmount, itemId) => {
    setCartItemsprincipal((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    setCartItems(getDefaultCartMoreOffre());
    setCartItemsprincipal(getDefaultCartPrincipalFormation());
  };


  const contextValue = {
    cartItems,
    cartItemsPrincipal,
    addToCart,
    addToCartPrincipal,
    updateCartItemCount,
    updateCartItemCountPrincipal,
    removeFromCart,
    removeFromCartPrincipal,
    getTotalCartAmount,
    getTotalCartAmountPrincipal,
    checkout,
  };
  console.log(cartItems)
  console.log(cartItemsPrincipal)

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};