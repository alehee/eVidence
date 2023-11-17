import React from "react";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Administration from "./pages/Administration";
import Entrance from "./pages/Entrance";
import Checkpoint from "./pages/Checkpoint";
import Header from "./components/Essentials/Header";
import Admins from "./pages/administration/Admins";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entrance" element={<Entrance />} />
        <Route path="/checkpoint" element={<Checkpoint />} />
        <Route path="/administration" element={<Administration />} />
        <Route path="/administration/admins" element={<Admins />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
