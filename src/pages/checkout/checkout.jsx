
import React, {useContext} from 'react'
import { PaypalButton } from "../../components/PayPalButtoncheckout/PaypalButton";
import { ShopContext } from "../../context/shop-contexte"
import "./checkout.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";


export const Checkout = () => {
  const { cartItems, cartItemsPrincipal, getTotalCartAmount, getTotalCartAmountPrincipal, checkout } = useContext(ShopContext)
  const totalAmount = getTotalCartAmount()
  const totalAmountPrincipal = getTotalCartAmountPrincipal()
  const navigate = useNavigate();

  return (
    <>
      <motion.div>
        {(totalAmount + 1) > 0 ? (
        <motion.div 
          className='CheckoutContainer'
        >
          <div className='BOXLEFTContainer'></div>
          <div className='ContainerMethodInfo'>
            

            <div className='ContainerPayment'>
              <div className='BOXLEFTMethodPayment'></div>
              
              <div className='MethodPayment'>
                <PaypalButton/>
              </div>
              <div className='BOXRIGHTMethodPayment'></div>
            </div>


            <div className='InformationCard'>
              
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
