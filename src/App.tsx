import React, {Fragment} from "react";
//
import {BrowserRouter, Routes, Route} from "react-router-dom";
//
import {Navbar} from "./components/Navbar";
import {HomePage} from "./pages/HomePage";
import {Clients} from "./pages/Clients";
import {Vehicules} from "./pages/Vehicules";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/vehicules"
            element={<Vehicules />}
          />
          <Route
            path="/clients"
            element={<Clients />}
          />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
