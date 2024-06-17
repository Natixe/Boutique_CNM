import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import { Checkout } from "./pages/checkout/checkout";
import { ShopContextProvider } from "./context/shop-contexte";

import { DescStreetWorkout } from "./pages/description/DescStreetWorkout/DescStreetWorkout";
import { DescPDMuscle } from "./pages/description/DescPDMuscle/DescPDMuscle";
import { DescPDMusclePerso } from "./pages/description/DescPDMusclePerso/DescPDMusclePerso";
import { DescNutrition } from "./pages/description/DescNutrition/DescNutrition";
import { DescNutritionPers  } from "./pages/description/DescNutritionPers/DescNutritionPers";

import { DescLePPersonalisable } from "./pages/description/DescLePPersonalisable/DescLePPersonalisable";

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
            <Route path="/descPDMuscle" element={<DescPDMuscle />}  />{/*7*/}
            <Route path="/descPDMusclePerso" element={<DescPDMusclePerso />}  />{/*6*/}
            <Route path="/descNutrition" element={<DescNutrition />}  />{/*5*/}
            <Route path="/descNutritionPers" element={<DescNutritionPers />}  />{/*4*/}
            <Route path="/descLePPersonalisable" element={<DescLePPersonalisable />}  />{/*3*/}

          </Routes>
      </Router>
      </ShopContextProvider>
    </>
  )  
}

export default App
