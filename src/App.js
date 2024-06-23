import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Beranda from "./components/BerandaContent";
import DataPengukuran from "./components/DataPengukuran";
import DataThings from "./components/DataThings";
import GrafikPengukuran from "./components/GrafikPengukuran";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./style.css";

function App() {
  const [activeItem, setActiveItem] = useState("Beranda");

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <Router>
      <div>
        <Sidebar activeItem={activeItem} handleItemClick={handleItemClick} />
        <Navbar />
        <Routes>
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/datapengukuran" element={<DataPengukuran />} />
          <Route path="/grafikpengukuran" element={<GrafikPengukuran />} />
          <Route path="/dataThings" element={<DataThings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;