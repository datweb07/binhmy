import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MapBase from "./pages/MapBase";
import Dashboard from "./pages/Dashboard";
import Planner from "./pages/Planner";
import Heritage from "./pages/Heritage";
import Specialties from "./pages/Specialties";
import CoSign from "./pages/CoSign";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapBase />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/heritage" element={<Heritage />} />
        <Route path="/specialties" element={<Specialties />} />
        <Route path="/nou" element={<CoSign />} />
      </Routes>
    </BrowserRouter>
  );
}
