import React from "react";
import "./App.css";
import Card from "./Components/Card";
import CardNavigate from "./Components/CardNavigate";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/pokemon/:id" element={<CardNavigate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
