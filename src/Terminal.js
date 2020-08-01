import React, { useState } from "react";
import "./Terminal.css";
import Content from "./Content";
import terminalParse from "./TerminalFunctions";

function Terminal() {
  const [state, setState] = useState({ command: "", history: [], results: [] });

  const handleChange = (event) => {
    setState({ ...state, command: event.target.value });
  };

  const handleKeyDown = (event) => {
    const command = event.target.value;
    if (event.key === "Enter") {
      const result = terminalParse(state.command);
      setState({
        command: "",
        history: [...state.history, command],
        results: [...state.results, result],
      });
    } else if (event.key === "ArrowUp") {
      // setCommand('');
      // seek history up
    } else if (event.key === "ArrowDown") {
      // seek history down
    } else if (event.key === "Tab") {
      // complete
      event.preventDefault();
    } else {
      // reset historyIndex
    }
  };
  return (
    <div className="Terminal">
      {state.results.map((result, index) => (
        <Content key={index} content={result} />
      ))}
      <div className="input">
        <span>~ $</span>
        <input
          id="prompt"
          type="text"
          autoComplete="off"
          spellCheck="false"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={state.command}
        />
      </div>
      <div id="key" className="hidden">
        ⏎
      </div>
    </div>
  );
}

export default Terminal;
