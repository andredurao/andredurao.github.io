const terminalFiles = {
  'github.link': `https://github.com/andredurao`,
  'about.md': `
    # I'm a DevOps Engineer from Belo Horizonte / Brazil.

    With 10 years of full-stack web development experience,
    I can offer the technical expertise for web solutions.

    Please review my CV, which provides details and examples of skills in:

    * Backend
      Ruby, Ruby On Rails, Node.js, Java, Go
    * Frontend
      HTML, JS, CSS, Vue.js, React, Bootstrap
    * Databases
      PostgreSQL, MySQL / MariaDB, MongoDB
    * Devops
      AWS, EC2, Docker, Kubernetes
    * Methodologies
      Agile, Scrum, TDD, BDD`,
  'cv.md': ``,
  'ruby-cheat-sheet.md': `
    * One line http static server:
    ruby -rwebrick -e'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
  `,
  'bash-cheat-sheet.md': `
    * Redirect find error messages to null:
      find . -name 'some-name' 2 > /dev/null
  `,
  'docker-cheat-sheet.md': `
    * Prune [DELETE] containers, volumes and images ☠️⚠️:
      docker stop $(docker ps -a -q) && docker system prune -a -f --volumes
    * Search containers by their CPU Usage:
      docker stats --no-stream --format \
 "table {{.Name}}\\t{{.Container}}\\t{{.CPUPerc}}\t{{.MemUsage}}" | \
 sort -k 3 -h -r | head`,
};

const print = (content) => {
  console.log(content);
};

const terminalFunctions = {
  clear() {
    // $prev.innerHTML = '';
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
    // Object.keys(files).forEach(print);
  },
  cat(f) {
    // f.endsWith('.link') ? showLink(files[f]) : print(files[f]);
  },
  whoami() {
    // print('andredurao', 'ok');
    print('andredurao');
  },
  cv() {
    // window.open('AndreResume.pdf');
  },
  github() {
    // window.open('https://github.com/andredurao');
  },
  linkedin() {
    // window.open('https://www.linkedin.com/in/andre-durao');
  },
}

const terminalParse = (line) => {
  const tokens = line.split(' ').filter((token) => (token));
  if (tokens.length === 0) return;
  // print('~ $ ' + line);
  const command = tokens[0];
  if (terminalFunctions[command]) {
    const params = tokens.slice(1);
    console.log(`Running [${command}] : [params]`);
    // funcs[command].apply(undefined, params);
  } else {
    // print(`${command}: command not found`, 'err');
    console.log(`${command}: command not found`);
  }
}
export default terminalParse;
