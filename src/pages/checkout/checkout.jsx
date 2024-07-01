
import React, {useContext} from 'react'
import { PaypalButton } from "../../components/PayPalButtoncheckout/PaypalButton";
import { ShopContext } from "../../context/shop-contexte"
import "./checkout.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CartItemInfoCheckout } from "./cart-itemInfoCheckout"
import { FORMATIONPRINCIPAL } from "../../Formation"
import { FORMATIONS } from '../../Formation'

export const Checkout = () => {
  const { cartItems, cartItemsPrincipal, getTotalCartAmount, getTotalCartAmountPrincipal, checkout } = useContext(ShopContext)
  const totalAmount = getTotalCartAmount()
  const totalAmountPrincipal = getTotalCartAmountPrincipal()
  const navigate = useNavigate();
  const GToTale = getTotalCartAmount() + getTotalCartAmountPrincipal();

  return (
    <>
      <motion.div>
        {(totalAmount + totalAmountPrincipal + 1) > 0 ? (
        <motion.div 
          className='CheckoutContainer'
        >
          <div className='BOXLEFTContainer'></div>
          <div className='ContainerMethodInfo'>
            

            <div className='ContainerPayment'>
              <div className='BOXLEFTMethodPayment'></div>
              
              <div className='MethodPayment'>
                <div className='PayPalButton'>
                  <PaypalButton/>
                </div>
              </div>
              <div className='BOXRIGHTMethodPayment'></div>
            </div>


            <div className='InformationCardContainer'>
              <div className='cartInformation'>
                {FORMATIONS.map((formation) => {
                if (cartItems[formation.id] !== 0) {
                  return <CartItemInfoCheckout key={`formation-${formation.id}`} data={formation} />;
                }
                return null;
                })}

                {FORMATIONPRINCIPAL.map((formation) => {
                  if (cartItemsPrincipal[formation.id] !== 0) {
                    return <CartItemInfoCheckout key={`formationprincipal-${formation.id}`} data={formation} />;
                  }
                  return null;
                })}
                <div className='ContainerTotalInfo'>
                  <div className='TotalInfotext'>Total : </div>
                  <div className='EuroInfotext'>{GToTale} €</div>
                </div>
              </div>
            </div>
          </div>
          <div className='BOXRIGHTContainer'></div>

        </motion.div>
        ) : (      
        <div>j'aiiiiiiiiiiiiiiiiiiiiiiiiiii pas</div>
        )}
      </motion.div>
    </>
  )
}
