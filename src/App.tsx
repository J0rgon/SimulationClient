import MainNavBar from "./components/bars/MainNavBar";
import "./index.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import MenuPage from "./pages/MenuPage";
import NotFoundPage from "./pages/NotFoundPage";
import { BisectionPage } from "./pages/simulations/solves/BisectionPage";
import FixedPointPage from "./pages/simulations/solves/FixedPointPage";
import AitkenPage from "./pages/simulations/solves/AitkenPage";
import TrapezoidPage from "./pages/simulations/integrals/TrapezoidPage";

export function App() {
  return (
    <BrowserRouter>
      <MainNavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/menu" element={<MenuPage/>}/>
        <Route path="/simulations/bisection" element={<BisectionPage/>}/>
        <Route path="/simulations/fixed_point" element={<FixedPointPage/>}/>
        <Route path="/simulations/aitken" element={<AitkenPage/>}/>
        <Route path="/simulations/steffensen" element={<AitkenPage/>}/>
        <Route path="/simulations/trapezoid" element={<TrapezoidPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
