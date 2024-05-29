import * as React from "react";
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import { Home } from "./pages/home";
import { Checkout } from "./pages/checkout";
import { Navbar } from "./components/navbar";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </>
  )  
}

export default App
