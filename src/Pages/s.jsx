import { motion } from "framer-motion";
import "./styles.css";
import * as React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



function App() {
  const [count, setCount] = useState(0)
  const location = useLocation(); 


  return (
    <>
      <div>
        <h1>
          Test
        </h1>
      </div>
    </>
  );
}

export default App
