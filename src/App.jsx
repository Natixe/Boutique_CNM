import * as React from "react";
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
//@ts-ignore
import Checkout from "./pages/Checkout.jsx";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </>
  )  
}

export default App
