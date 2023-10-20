import React, { useState, useEffect } from "react";
import "./Terminal.css";
import Content from "./Content";
import { terminalParse, tabComplete } from "./TerminalFunctions";

function Terminal() {
  const [state, setState] = useState(
    {
      command: "",
      history: [],
      historyIndex: 0,
      keyClassName: "hidden",
    },
  );

  const handleChange = (event) => {
    setState({ ...state, command: event.target.value });
  };

  const handleKeyDown = (event) => {
    const commandLine = event.target.value;
    if (event.key === "Enter") {
      terminalParse(commandLine, state, setState);
      setTimeout(() => { scrollToBottom(); }, 25);
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

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  };

  const keystrokeDelay = 200
  const startTime = 2000
  const keyboardInput = 'whoami\ncat about.md\n';
  let currentText = keyboardInput;
  let textIndex = 0;
  let mainIntervalID = null;

  const inputText = () => {
    if (textIndex < currentText.length) {
      const char = currentText[textIndex];
      if (char === '\n') {
        terminalParse(state.command, state, setState);
        state.command = '';
      } else {
        state.command += char;
      }
      setState({ ...state, command: state.command });
      textIndex++;
    } else {
      clearInterval(mainIntervalID);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      mainIntervalID = !!!mainIntervalID && setInterval(inputText, keystrokeDelay);
    }, startTime);
    return () => clearInterval(mainIntervalID);
  }, []);

  return (
    <div className="Terminal">
      {
        window.results.map((result, index) => (
          <Content
            key={index}
            command={result.command}
            content={result.content}
            status={result.status}
            contentKind={result.contentKind}
          />
        ))
      }
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
      <div id="key" className={state.keyClassName}>
        ⏎
      </div>
    </div>
  );
}

export default Terminal;
