import React, { useContext } from "react";

export const CartItem = (props) => {
    const { id, formationName, price, formationImage } = props.data
  return (
    <div className='cartItem'>
        <img src={formationImage}/>
        <div className='description'>
            <p>
                <b> {formationName} </b>
            </p>
            <p>{price}€</p>
        </div>
    </div>
  )
}
