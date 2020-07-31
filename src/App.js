import React, { useState } from 'react';
import Terminal from './Terminal';
import terminalParse from './TerminalFunctions';
import './App.css';

function App() {
  const [terminalContent, setTerminalContent] = useState('');
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      console.log('Enter');
      debugger;
      terminalParse(terminalContent);
      // run();
      setTerminalContent("test");
    } else if (event.key === 'ArrowUp') {
      console.log('ArrowUp');
      // if (hi <= history.length && hi > 0) {
      //   $prompt.value = history[--hi];
      // }
    } else if (event.key === 'ArrowDown') {
      console.log('ArrowDown');
      // if (hi + 1 < history.length && hi >= 0) {
      //   $prompt.value = history[++hi];
      // }
    } else if (event.key === 'Tab') {
      console.log('Tab');
      event.preventDefault();
      // $prompt.value = tabComplete($prompt.value);
    } else {
      // hi = history.length;
    }
  };
  return (
    <div className="App">
      <Terminal content={terminalContent} onKeyDownTerminal={handleKeyDown} />
    </div>
  );
}

export default App;
