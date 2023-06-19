import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Oddpair from "./Pages/Oddpair";
import Burn from "./Pages/Burn";
import Footer from "./components/Footer";
import Model3d from "./Pages/3DModel";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={<Oddpair />}
        />
        <Route
          path="/odpair"
          element={<Oddpair />}
        />
        <Route
          path="/burn"
          element={<Burn />}
        />

        <Route
          path="/3dmodel"
          element={<Model3d />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
