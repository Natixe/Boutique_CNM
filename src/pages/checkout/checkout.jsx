
import React, {useContext} from 'react'
import { PaypalButton } from "../../components/PayPalButtoncheckout/PaypalButton";
import { ShopContext } from "../../context/shop-contexte"


export const Checkout = () => {
  const { cartItems, cartItemsPrincipal, getTotalCartAmount, getTotalCartAmountPrincipal, checkout } = useContext(ShopContext)
  const totalAmount = getTotalCartAmount()
  const totalAmountPrincipal = getTotalCartAmountPrincipal()

  return (
    <>
    <div>
      {(totalAmount + totalAmountPrincipal) > 0 ? (
        <div><PaypalButton/></div>
        
      ) : (      
      <div>j'aiiiiiiiiiiiiiiiiiiiiiiiiiii pas</div>
      )}
    </div>
    </>
  )
}
