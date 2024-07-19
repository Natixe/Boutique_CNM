import React, {useContext} from 'react'
import { FORMATIONS } from '../../Formation'
import { ShopContext } from "../../context/shop-contexte"
import { CartItem } from "./cart-item"
import "./cart.css";
import { useNavigate } from "react-router-dom";
import { FORMATIONPRINCIPAL } from "../../Formation"
import { motion, AnimatePresence } from "framer-motion";

export const Cart = () => {
  const { cartItems, cartItemsPrincipal, getTotalCartAmount, getTotalCartAmountPrincipal, checkout } = useContext(ShopContext)
  const totalAmount = getTotalCartAmount()
  const totalAmountPrincipal = getTotalCartAmountPrincipal()
  const navigate = useNavigate();

  return (
    <motion.div 
    className='cartContainer'
    animate={{ backgroundColor: ["#141417", "#D3D3D3"] }}
    transition={{ duration: 1.5, loop: Infinity, ease: "easeInOut" }}
    >
      {(totalAmount + totalAmountPrincipal) > 0 ? (
        <div className='containercartItem'>
          <div className='cartItem'>
            <p className="DescriptionCart">
              <div className='ContainerCartPanier'>
                <b className="TextDescriptionCartPanier">VOTRE PANIER</b>
              </div>
              <div className='Box1cart'></div>
              <div className='ContainerCartPrix'>  
                <b className="TextDescriptionCartPrix">Prix</b>
              </div>
              <div className='Box2cart'></div>
              <div className='ContainerCartTotal'>
                <b className="TextDescriptionCartTotal">Quantité</b>
              </div>
              <div className='Box3cart'></div>
              <div className='ContainerViderPanier'>
                <b className="TextDescriptionViderPanier">Vider le panier</b>
              </div>
            </p>
            <div className='cartItem'>
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
            <div className="ContainerCheckout">
              <div div className='checkout'>
                <div className='TotalcheckoutConteiner'>
                  <p className='TotalcheckoutPrix'> Prix : </p>
                  <p className='Totalcheckout'> {totalAmount + totalAmountPrincipal} € </p>
                </div>
                <div className='ContainerButtonCart'>
                  <motion.div 
                    onClick={() => {
                      navigate("/*");
                    }}
                    whileHover={{ scale: 1.05}}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className='ButtonContinuerAchats'

                  > 
                    <p className='ButtonContinuerAchatsText'>Voir d'autres produits</p>
                  </motion.div>
                  <motion.div
                    onClick={() => {
                      navigate("/checkout");
                    }}
                    className='ButtonPayement'
                    whileHover={{ scale: 1.07}}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <p className='ButtonPayementText'>Payement</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
          <div>
            <h1 className='TextCart'> PANIER VIDE</h1>
            <motion.div
              whileHover={{ scale: 1.05}}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
               onClick={() => {navigate("/");}} 
               className='textePetitCart'
            >Cliquez ici pour voir nos produits.
            </motion.div>  
          </div>
      )}
    </motion.div>
  )
}