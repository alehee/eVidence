import React from "react";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Administration from "./pages/Administration";
import Entrance from "./pages/Entrance";
import Checkpoint from "./pages/Checkpoint";
import Header from "./components/Essentials/Header";
import Admins from "./pages/administration/Admins";
import TemporaryCards from "./pages/administration/TemporaryCards";
import Users from "./pages/administration/Users";
import Processes from "./pages/administration/Processes";
import Structure from "./pages/administration/Structure";
import Reports from "./pages/administration/Reports";

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
        <Route
          path="/administration/temporarycards"
          element={<TemporaryCards />}
        />
        <Route path="/administration/users" element={<Users />} />
        <Route path="/administration/processes" element={<Processes />} />
        <Route path="/administration/structure" element={<Structure />} />
        <Route path="/administration/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
