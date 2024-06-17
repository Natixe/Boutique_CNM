import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import { Checkout } from "./pages/checkout/checkout";
import { ShopContextProvider } from "./context/shop-contexte";
import { DescStreetWorkout } from "./pages/description/DescStreetWorkout/DescStreetWorkout";


function App() {
  return (
    <>  
      <ShopContextProvider>
      <Router>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home />}  />
            <Route path="/shop" element={<Shop />}  />
            <Route path="/cart" element={<Cart />} /> 
            <Route path="/checkout" element={<Checkout />}  />
            <Route path="/descStreetWorkout" element={<DescStreetWorkout />}  />
          </Routes>
      </Router>
      </ShopContextProvider>
    </>
  )  
}

export default App
