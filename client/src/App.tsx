import React from "react";

import "./App.css";
import Header from "./components/Header/Header";
import GamesToPlay from "./components/Game/GamesToPlay";

function App() {
  return (
    <div className="App">
      <Header />
      <GamesToPlay />
    </div>
  );
}

export default App;
