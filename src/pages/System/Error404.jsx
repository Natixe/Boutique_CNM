import React from 'react'
import "./Error404.css";
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from "react-router-dom";

export const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className='ContainerError404'>
      <div className='Error404'>
        <div className='ContainerE404'>
          <div className='E404'>Erreur HTTP 404</div>
        </div>
        <div className='boxE404'></div>
        <div className='TitleError404'>
          Oops! On dirait que cette page s’est échappée pour faire des pompes et des tractions ! 
          <div className='SubTitleError404'>
            Revenez à l’accueil avant que vos muscles ne se transforment en algorithmes.
          </div>
        </div>
        <div className='ContainerButton404'>
          <motion.button 
          className='Button404'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 17 }
          }
          >
            <div 
            onClick={() => {
              navigate("/");
            }}
            className='TextButton404'
            >Cliquez ICI et c'est 3 kg de muscle en + assuré !</div>
          </motion.button>
        </div>

      </div>
    </div>
  )
}
