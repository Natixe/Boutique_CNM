import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import { Checkout } from "./pages/checkout/checkout";
import { ShopContextProvider } from "./context/shop-contexte";

import { DescStreetWorkout } from "./pages/description/DescStreetWorkout/DescStreetWorkout";
import { DescPDMuscleSalle } from "./pages/description/DescMuscleSalle/DescPDMuscleSalle";
import { DescPDDébutant } from "./pages/description/DescPDDébutant/DescPDDébutant";
import { DesPDMuscleMaison } from "./pages/description/DesMuscleMaison/DesPDMuscleMaison";
import { DescPertedePoid } from "./pages/description/DescPertedePoid/DescPertedePoid";
import { DescSeche } from "./pages/description/DescSeche/DescSeche";
import { DescPriseMasse } from "./pages/description/DescPriseMasse/DescPriseMasse";


import { DescLePPersonalisable } from "./pages/description/DescLePPersonalisable/DescLePPersonalisable";

import { PayPalError } from "./pages/System/PayPalError"
import { Error404 } from "./pages/System/Error404"


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
            
            <Route path="/descStreetWorkout" element={<DescStreetWorkout />}  />{/*8*/}
            <Route path="/descPDMuscleSalle" element={<DescPDMuscleSalle />}  />{/*7*/}
            <Route path="/descPDDébutant" element={<DescPDDébutant />}  />{/*6*/}
            <Route path="/desPDMuscleMaison" element={<DesPDMuscleMaison />}  />{/*5*/}
            <Route path="/descPertedePoid" element={<DescPertedePoid />}  />{/*4*/}
            <Route path="/descSeche" element={<DescSeche />}  />{/*3*/}
            <Route path="/descPriseMasse" element={<DescPriseMasse />}  />{/*2*/}


            <Route path="/payPalError" element={<PayPalError />}  />{/*System*/}
            <Route path="*" element={<Error404 />}  />{/*System*/}

          </Routes>
      </Router>
      </ShopContextProvider>
    </>
  )  
}

export default App
