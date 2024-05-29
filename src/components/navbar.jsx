import React from 'react'
import { Link } from "react-router-dom";
import { reloadMainPage } from '../utils.jsx';
import { useNavigate } from 'react-router-dom';

/*import des element de la nav bar*/
//@ts-ignore
import { Logocnm } from "./logocnm";
import { Moreoffre } from "./moreoffre";


export const Navbar = () => {
    const navigate = useNavigate();

    const handleClick = () => {
      reloadMainPage(navigate);
    };  
    
  return (
    <div className='navbar'>
        <div className='links'>
            <Link 
            to="/"
            onClick={handleClick}
            > 
                <Logocnm />
            </Link>

            <Link to="/checkout"> 
                <Moreoffre /> 
            </Link>

        </div>
    </div>
  )
}
