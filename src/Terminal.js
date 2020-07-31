import React, { useState } from 'react';
import './Terminal.css';
import Content from './Content.js';
import terminalParse from './TerminalFunctions';

function Terminal() {
  const [state, setState] = useState({command: '', history: []});

  const handleChange = event => {
    setState({...state, command: event.target.value});
  };

  const handleKeyDown = event => {
    const command = event.target.value;
    if (event.key === 'Enter') {
      setState({...state, history: [...state.history, command]});
      terminalParse(state.command);
    } else if (event.key === 'ArrowUp') {
      // setCommand('');
      // seek history up
    } else if (event.key === 'ArrowDown') {
      // seek history down
    } else if (event.key === 'Tab') {
      // complete
      event.preventDefault();
    } else {
      // reset historyIndex
    }
  };
  return (
    <div className='Terminal'>
      <Content content='' />
      <div className='input'>
        <span>~ $</span>
        <input id='prompt' type='text' autoComplete='off' spellCheck='false' onKeyDown={handleKeyDown} onChange={handleChange} value={state.command}>
        </input>
      </div>
      <div id='key' className='hidden'>⏎</div>
    </div >
  );
}

export default Terminal;
