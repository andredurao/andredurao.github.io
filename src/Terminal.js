import React from 'react';
import './Terminal.css';
import Content from './Content.js';

function Terminal() {
  return (
    <div className="Terminal">
      <Content />
      <div className='input'>
        <span>~ $</span>
        <input id='prompt' type='text' autocomplete="off" spellcheck="false"></input>
      </div>
      <div id="key" class="hidden">⏎</div>
    </div >
  );
}

export default Terminal;
