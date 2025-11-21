// src/App.jsx
// import { useState } from "react";
import Gameboard from "./components/Gameboard"; // Make sure the path is correct!
import "./App.css";

function App() {
  // Optional: You can add a loading state or menu later
  // For now, we just render the game directly
  return (
    <>
      <Gameboard />
    </>
  );
}

export default App;
