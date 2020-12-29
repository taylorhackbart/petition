import React from "react";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Cabo from "./pages/Rentals/Cabo";
import Bend from "./pages/Rentals/Bend";
import Camping from "./pages/Rentals/Camping";
import Cerritos from "./pages/Rentals/Cerritos";
import IndianPalms from "./pages/Rentals/IndianPalms";
import Indio from "./pages/Rentals/Indio";
import Lapine from "./pages/Rentals/Lapine";
import MtHood from "./pages/Rentals/MtHood";
import Portland from "./pages/Rentals/Portland";
import About from "./pages/About"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { BrowserRouter, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/Cabo" component={Cabo} />
        <Route exact path="/Bend" component={Bend} />
        <Route exact path="/Camping" component={Camping} />
        <Route exact path="/Cerritos" component={Cerritos} />
        <Route exact path="/IndianPalms" component={IndianPalms} />
        <Route exact path="/Indio" component={Indio} />
        <Route exact path="/Lapine" component={Lapine} />
        {/* <Route exact path="/Rentals" component={Rentals} /> */}
        <Route exact path="/MtHood" component={MtHood} />
        <Route exact path="/Portland" component={Portland} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </div>
    </BrowserRouter>
  );
}

export default App;
