import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SignUp} from "./pages/SignUp";
import {Login} from "./pages/Login";
import {Dashboard} from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                    <Route index element={<SignUp />} />
                    <Route path="login" element={<Login />} />
                    <Route path="dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
