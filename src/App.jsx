import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <header className="header">
        <div>
          <h1>Location</h1>
          <p>Last updated</p>
        </div>
        <nav>
          <div className="country-input">
            <input type="text"></input>
          </div>
          <div className="city-input">
            <input type="text"></input>
          </div>
          <div className="name-suggestions">
            <p>city name</p>
            <p>city name</p>
            <p>city name</p>
            <p>city name</p>
            <p>city name</p>
          </div>
        </nav>
      </header>
      <section className="container">
        <h2>32</h2>
        <p>°C</p>
        <h3>Feels like 27 °C</h3>
        <p>ICON</p>
        <h4>Misty</h4>
      </section>
      <section className="container">
        <div className="details">
          <p>details 1</p>
          <p>details 1</p>
        </div>
        <div className="details">
          <p>details 2</p>
          <p>details 2</p>
        </div>
        <div className="details">
          <p>details 3</p>
          <p>details 3</p>
        </div>
      </section>
    </>
  );
}

export default App;
