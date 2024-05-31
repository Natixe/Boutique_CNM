import React from 'react'
import { Link } from "react-router-dom";
import { reloadMainPage } from '../utils.jsx';
import { useNavigate } from 'react-router-dom';
import "./navbar.css";

/*import des element de la nav bar*/
//@ts-ignore
import { Logocnm } from "./logocnm";
import { Moreoffre } from "./moreoffre";
import { Cart } from "./logocart";


export const Navbar = () => {
    const navigate = useNavigate();

    const handleClick = () => {
      reloadMainPage(navigate);
    }; 

  return (
    <div className='nav w-clearfix'>
        <div className='hero-link w-inline-block w--current'>
            <Link to="/shop"> 
                <Moreoffre /> 
            </Link>
            <Link to="/cart">
                <Cart />              
            </Link>
            <Link to="/" onClick={handleClick}>
                <Logocnm />              
            </Link>
        </div>
    </div>
  )
}
