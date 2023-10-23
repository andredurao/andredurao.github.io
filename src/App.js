import React from "react";
import Terminal from "./Terminal";

window.results = [];
window.commandHistory = [];
window.commandHistoryIndex = 0;
window.isTyping = true;

function App() {
  return (
    <div className="App">
      <Terminal />
    </div>
  );
}

export default App;
