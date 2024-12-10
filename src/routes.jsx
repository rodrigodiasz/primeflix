import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Filme from "./pages/Movie";
import Error from "./pages/Error";
import Header from "./components/Header";
import Favoritos from "./pages/Favoritos";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Filme/:id" element={<Filme />} />
        <Route path="Favoritos" element={<Favoritos />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
