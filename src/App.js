// App.js

/* eslint-disable no-unused-vars */

import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarPage from "./components/NavbarPage";
import TampilanHome from "./components/tampilanHome";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarPage />
        <Routes>
          <Route path="/" element={<TampilanHome/>} />
          {/* <Route path="/riwayat-pin" element={<RiwayatPin/>} />
          <Route path="/riwayat-status-brankas" element={<DataTabel/>} />
          <Route path="/data-enkripsi" element={<DataEnkripsi/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
