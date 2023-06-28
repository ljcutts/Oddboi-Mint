import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Oddpair from "./Pages/Oddpair";
import Burn from "./Pages/Burn";
import Footer from "./components/Footer";
import Model3d from "./Pages/3DModel";
import FreeBoog from "./Pages/Freeboog";
import Snooze from "./Pages/Snooze";

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
          path="/freeboog"
          element={<FreeBoog />}
        />

        <Route
          path="/3dmodel"
          element={<Model3d />}
        />

        <Route
          path="/snooze"
          element={<Snooze />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
