const terminalFiles = {
  "github.link": "https://github.com/andredurao",
  "about.md": `
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
  "cv.md": "",
  "ruby-cheat-sheet.md": `
    * One line http static server:
    ruby -rwebrick -e'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
  `,
  "bash-cheat-sheet.md": `
    * Redirect find error messages to null:
      find . -name 'some-name' 2 > /dev/null
  `,
  "docker-cheat-sheet.md": `
    * Prune [DELETE] containers, volumes and images ☠️⚠️:
      docker stop $(docker ps -a -q) && docker system prune -a -f --volumes
    * Search containers by their CPU Usage:
      docker stats --no-stream --format \
 "table {{.Name}}\\t{{.Container}}\\t{{.CPUPerc}}\t{{.MemUsage}}" | \
 sort -k 3 -h -r | head`,
};

const updateState = (state, setState, commandLine, result) => {
  const commandResult = `~ $ ${commandLine}\n${result}`;
  setState(
    {
      command: "",
      history: [...state.history, commandLine],
      historyIndex: state.historyIndex + 1,
      results: [...state.results, commandResult],
    },
  );
};

const terminalFunctions = {
  echo(state, setState, commandLine, ...a) {
    const result = a.join(" ");
    updateState(state, setState, commandLine, result);
    return result;
  },
  help(state, setState, commandLine) {
    const result = `ls: show files and directories
cat <file>: print a file out
cv: open cv PDF file
github: open github page
linkedin: open linkedin page
...
`;
    updateState(state, setState, commandLine, result);
    return result;
  },
  whoami(state, setState, commandLine) {
    const result = "andredurao";
    updateState(state, setState, commandLine, result);
    return result;
  },
  ls(state, setState, commandLine) {
    const files = Object.keys(terminalFiles);
    const result = files.join("\n");
    updateState(state, setState, commandLine, result);
    return result;
  },
  cat(state, setState, commandLine, f) {
    let result = "";
    if (terminalFiles[f]) {
      result = terminalFiles[f];
    } else {
      result = `cat: ${f}: No such file or directory`;
    }
    updateState(state, setState, commandLine, result);
    return result;
  },
  clear(state, setState, commandLine) {
    setState(
      {
        command: "",
        history: [...state.history, commandLine],
        historyIndex: state.historyIndex + 1,
        results: [],
      },
    );
    return "";
  },
};

const terminalParse = (commandLine, state, setState) => {
  const result = `~ $ ${commandLine}`;
  const tokens = commandLine.split(" ").filter((token) => token);
  let commandResult = "";
  // Empty line
  if (tokens.length === 0) return result;

  const command = tokens[0];
  if (terminalFunctions[command]) {
    const params = tokens.slice(1);
    terminalFunctions[command].apply(
      undefined,
      [state, setState, commandLine, params],
    );
  } else {
    commandResult = `${command}: command not found`;
    updateState(state, setState, commandLine, commandResult);
  }
  return commandResult;
};
export default terminalParse;
