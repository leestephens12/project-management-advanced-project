import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SignUp} from "./pages/SignUp";
import {Login} from "./pages/Login";
import {TeamPage} from "./components/TeamPage";
import {ProjectsPage} from "./components/ProjectsPage";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route index element={<SignUp />} />
                <Route path="login" element={<Login />} />
                <Route path="tasks" element={<ProjectsPage />} />
                <Route path="teams" element={<TeamPage />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
