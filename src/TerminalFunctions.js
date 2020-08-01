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

const terminalFunctions = {
  echo(...a) {
    return a.join(" ");
  },
  help() {
    return `ls: show files and directories
cat <file>: print a file out
cv: open cv PDF file
github: open github page
linkedin: open linkedin page
...
`;
  },
  whoami() {
    return "andredurao";
  },
  ls() {
    const files = Object.keys(terminalFiles);
    return files.join("\n");
  },
  cat(f) {
    if (terminalFiles[f]) {
      return terminalFiles[f];
    }
    return `cat: ${f}: No such file or directory`;
  },
};

const terminalParse = (line) => {
  const result = `~ $ ${line}`;
  const tokens = line.split(" ").filter((token) => token);
  // Empty line
  if (tokens.length === 0) return result;
  const command = tokens[0];
  if (terminalFunctions[command]) {
    const params = tokens.slice(1);
    const functionResult = terminalFunctions[command].apply(undefined, params);
    return `${result}\n${functionResult}`;
  }
  return `${result}\n${command}: command not found`;
};
export default terminalParse;
