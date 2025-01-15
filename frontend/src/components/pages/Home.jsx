import React from "react";
import Navbar from "../Navbar.jsx";
import illustrate from "../../assets/7178891.jpg";

const Home = () => {
  return (
    <div>
      <div className="flex flex-row">
        <Navbar />
      </div>
        <img className="flex flex-col w-96 h-80"
          src={illustrate}
          alt="illustrate"
        />
    </div>
  );
};

export default Home;
