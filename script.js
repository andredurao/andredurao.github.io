let $prompt = document.getElementById('prompt')
let $prev = document.getElementById('prev')
let $key = document.getElementById('key')

const keystrokeDelay = 150
const fastKeystrokeDelay = 50
const startTime = 2000
const keyboardInput = 'whoami\ncat about.md\n';
const finalMessage = 'type help for more     \b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b';
const secondMessageTime = startTime + (keystrokeDelay * (keyboardInput.length + 2));

let $currentText = keyboardInput;
let $textIndex = 0;
let $mainIntervalID = null;
let history = ['ls'];
let hi = 1;

const render = (messages) => {
  messages.forEach((params) => {
    let el = document.createElement('pre');
    el.className += params.className || '';
    el.innerText = params.text;
    $prev.appendChild(el);
  })
  window.scrollTo(0, document.body.scrollHeight);
}

const showLink = (url) => {
  let el = document.createElement('a');
  el.href = url;
  el.target = '_blank';
  el.innerText = url;
  $prev.appendChild(el);
}

const print = (text, className) => render([{ text: text, className: className }]);

let files = {
  'github.link': `https://github.com/andredurao`,
  'about.md': `
    # I'm a software developer from Brazil.

    With 10 years of full-stack web development experience,
    I can offer the technical expertise for web solutions.

    Please review my CV, which provides details and examples of skills in:

    * Backend
      Ruby, Ruby On Rails, Node.js, Java
    * Frontend
      HTML, JS, CSS, Vue.js, React, Bootstrap, JQuery
    * Databases
      PostgreSQL, MySQL / MariaDB, MongoDB 
    * Devops
      AWS, EC2, EB, Docker
    * Methodologies
      Agile, Scrum, TDD, BDD`,
  'cv.md': `
    `
}

let funcs = {
  clear() {
    $prev.innerHTML = '';
  },
  echo(...a) {
    print(a.join(' '));
  },
  help() {
    print(`ls: show files and directories
cat <file>: print a file out
cv: open cv PDF file
github: open github page
linkedin: open linkedin page
...
`);
  },
  ls() {
    Object.keys(files).forEach(print);
  },
  cat(f) {
    f.endsWith('.link') ? showLink(files[f]) : print(files[f]);
  },
  whoami() {
    print('andredurao', 'ok');
  },
  cv() {
    window.open('AndreResume.pdf');
  },
  github() {
    window.open('https://github.com/andredurao');
  },
  linkedin() {
    window.open('https://www.linkedin.com/in/andre-durao');
  },
}

const parse = (line) => {
  const tokens = line.split(' ').filter((token) => (token));
  if (tokens.length === 0) return;
  print('~ $ ' + line);
  const command = tokens[0];
  if (funcs[command]) {
    const params = tokens.slice(1);
    funcs[command].apply(undefined, params);
  } else {
    print(`${command}: command not found`, 'err');
  }
}

const tabComplete = (line) => {
  const tokens = line.split(' ').filter((token) => (token));
  if (tokens.length === 0) return (line);
  for (possibleToken of Object.keys(tokens.length > 1 ? files : funcs)) {
    if (possibleToken.startsWith(tokens[tokens.length - 1]))
      return [...tokens.slice(0, -1), possibleToken].join(' ');
  }
  return line;
}

const showKey = (key = '') => {
  $key.classList.toggle('hidden', false);
  $key.classList.toggle('fade-out', false);
  window.setTimeout(() => {
    $key.classList.toggle('fade-out', true);
  }, keystrokeDelay);
}

const run = () => {
  parse($prompt.value);
  history.push($prompt.value);
  $prompt.value = '';
  hi = history.length;
  showKey();
}

const inputText = () => {
  if ($textIndex < $currentText.length) {
    const char = $currentText[$textIndex];
    if (char == '\n') {
      run();
    } else if (char == '\b') {
      lastPos = $prompt.value.length - 1;
      lastPos = lastPos < 0 ? 0 : lastPos;
      $prompt.value = $prompt.value.substr(0, lastPos);
    } else {
      $prompt.value += $currentText[$textIndex];
    }
    $textIndex++;
  }
}

$prompt.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    run();
  } else if (e.key === 'ArrowUp') {
    if (hi <= history.length && hi > 0) {
      $prompt.value = history[--hi];
    }
  } else if (e.key === 'ArrowDown') {
    if (hi + 1 < history.length && hi >= 0) {
      $prompt.value = history[++hi];
    }
  } else if (e.key === 'Tab') {
    e.preventDefault();
    $prompt.value = tabComplete($prompt.value);
  } else {
    hi = history.length;
  }
})

$prompt.focus();
$prompt.select();

window.setTimeout(() => {
  $mainIntervalID = window.setInterval(inputText, keystrokeDelay);
}, startTime);

window.setTimeout(() => {
  window.clearInterval($mainIntervalID);
}, startTime + (keystrokeDelay * (keyboardInput.length + 1)));

window.setTimeout(() => {
  $textIndex = 0;
  $currentText = finalMessage;
  $mainIntervalID = window.setInterval(inputText, fastKeystrokeDelay);
}, secondMessageTime);

window.setTimeout(() => {
  window.clearInterval($mainIntervalID);
}, secondMessageTime + (fastKeystrokeDelay * (finalMessage.length + 1)));