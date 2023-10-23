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
    console.log(window.isTyping)
    if (window.isTyping) {
      return
    }
    const commandLine = event.target.value;
    if (event.key === "Enter") {
      terminalParse(commandLine, state, setState);
    } else if (event.key === "ArrowUp") {
      console.log(event.key)
      if (window.commandHistoryIndex <= window.commandHistory.length && window.commandHistoryIndex > 0) {
        window.commandHistoryIndex--;
        setState(
          {
            ...state,
            command: window.commandHistory[window.commandHistoryIndex],
          },
        );
      }
    } else if (event.key === "ArrowDown") {
      console.log(event.key)
      if (window.commandHistoryIndex < window.commandHistory.length - 1 && window.commandHistoryIndex >= 0) {
        window.commandHistoryIndex++;
        setState(
          {
            ...state,
            command: window.commandHistory[window.commandHistoryIndex],
          },
        );
      }
    } else if (event.key === "Tab") {
      event.preventDefault();
      const completedCommandLine = tabComplete(commandLine);
      setState({ ...state, command: completedCommandLine });
    }
  };

  const keystrokeDelay = 100
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
      window.isTyping = false
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
          disabled={window.isTyping}
        />
      </div>
      <div id="key" className={state.keyClassName}>
        ⏎
      </div>
    </div>
  );
}

export default Terminal;
