import React, { useState, useEffect, useRef } from "react";
import "./Terminal.css";
import Content from "./Content";
import { terminalParse, tabComplete } from "./TerminalFunctions";

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
      event.preventDefault();
      const completedCommandLine = tabComplete(commandLine);
      setState({ ...state, command: completedCommandLine });
    }
  };

  const resultsEndRef = useRef(null)

  const scrollToBottom = () => {
    resultsEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [state.results]);

  return (
    <div className="Terminal">
      {
        state.results.map((result, index) => <Content key={index} content={result} />)
      }
      <div ref={resultsEndRef} />
      <div className="input">
        <span>~ $</span>
        <input
          id="prompt"
          type="text"
          autoFocus
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
