import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Administration from "./pages/Administration";
import Entrance from "./pages/Entrance";
import Checkpoint from "./pages/Checkpoint";
import Header from "./components/Essentials/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/administration" element={<Administration />} />
        <Route path="/entrance" element={<Entrance />} />
        <Route path="/checkpoint" element={<Checkpoint />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
