import terminalFiles from "./FileSystem";

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

export const tabComplete = (commandLine) => {
  let result = commandLine;
  const tokens = commandLine.split(" ").filter((token) => (token));
  if (tokens.length === 0) return (commandLine);
  const possibleTokens = Object.keys(tokens.length > 1 ? terminalFiles : terminalFunctions);
  possibleTokens.forEach((possibleToken) => {
    if (possibleToken.startsWith(tokens[tokens.length - 1])) {
      result = [...tokens.slice(0, -1), possibleToken].join(" ");
    }
  });
  return result;
};

export const terminalParse = (commandLine, state, setState) => {
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
