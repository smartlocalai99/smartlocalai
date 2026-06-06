import React from "react";

import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Services from "./components/Services.jsx"
import Contact from "./components/Contact.jsx"
import Team from "./components/Team.jsx"
import Footer from "./components/Footer.jsx";

function App() {

  return (

    <div className="bg-white min-h-screen">

      <Navbar />
      <Home />
      <Services />
      <Team />
      <Contact />
      <Footer />
    </div>

  );
}

export default App;