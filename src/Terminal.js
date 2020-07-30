import React from 'react';
import './Terminal.css';
import Content from './Content.js';

function Terminal({ content, onKeyDownTerminal }) {
  return (
    <div className='Terminal'>
      <Content content={content} />
      <div className='input'>
        <span>~ $</span>
        <input id='prompt' type='text' autoComplete='off' spellCheck='false' onKeyDown={onKeyDownTerminal}>
        </input>
      </div>
      <div id='key' className='hidden'>⏎</div>
    </div >
  );
}

export default Terminal;
