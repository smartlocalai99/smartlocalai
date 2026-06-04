import React from "react";

import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Services from "./components/Services.jsx"
function App() {

  return (

    <div className="bg-white min-h-screen">

      <Navbar />
      <Home />
      <Services/>

    </div>

  );
}

export default App;