import React, { useState } from "react";
import "./Terminal.css";
import Content from "./Content";
import terminalParse from "./TerminalFunctions";

function Terminal() {
  const [state, setState] = useState(
    {
      command: "",
      history: [],
      historyIndex: 0,
      results: [],
    },
  );

  const handleChange = (event) => {
    setState({ ...state, command: event.target.value });
  };

  const handleKeyDown = (event) => {
    const commandLine = event.target.value;
    if (event.key === "Enter") {
      terminalParse(commandLine, state, setState);
    } else if (event.key === "ArrowUp") {
      if (state.historyIndex <= state.history.length && state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        setState(
          {
            ...state,
            command: state.history[newIndex],
            historyIndex: newIndex,
          },
        );
      }
    } else if (event.key === "ArrowDown") {
      if (state.historyIndex < state.history.length - 1 && state.historyIndex >= 0) {
        const newIndex = state.historyIndex + 1;
        setState(
          {
            ...state,
            command: state.history[newIndex],
            historyIndex: newIndex,
          },
        );
      }
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
