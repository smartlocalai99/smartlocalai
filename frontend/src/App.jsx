import React from "react";

import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Services from "./components/Services.jsx"
import Contact from "./components/Contact.jsx"
function App() {

  return (

    <div className="bg-white min-h-screen">

      <Navbar />
      <Home />
      <Services />
      <Contact />
    </div>

  );
}

export default App;