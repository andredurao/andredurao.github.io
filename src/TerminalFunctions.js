import terminalFiles from "./FileSystem";

const updateState = (state, setState, commandLine, result) => {
  const commandResult = {
    command: `~ $ ${commandLine}`,
    content: result.content,
    status: result.status,
  };

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
    const result = { content: a.join(" "), status: "" };
    updateState(state, setState, commandLine, result);
    return result;
  },
  help(state, setState, commandLine) {
    const result = {
      content: `ls: show files and directories
                cat <file>: print a file out
                cv: open cv PDF file
                github: open github page
                linkedin: open linkedin page
                ...
                `.replace(/  +/g, ""),
      status: "",
    };
    updateState(state, setState, commandLine, result);
    return result;
  },
  whoami(state, setState, commandLine) {
    const result = {
      content: "andredurao",
      status: "",
    };
    updateState(state, setState, commandLine, result);
    return result;
  },
  ls(state, setState, commandLine) {
    const files = Object.keys(terminalFiles);
    const result = {
      content: files.join("\n"),
      status: "",
    };
    updateState(state, setState, commandLine, result);
    return result;
  },
  cat(state, setState, commandLine, f) {
    let result = {};
    if (terminalFiles[f]) {
      result = {
        content: terminalFiles[f],
        status: "",
      };
    } else {
      result = {
        content: `cat: ${f}: No such file or directory`,
        status: "error",
      };
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
    commandResult = {
      content: `${command}: command not found`,
      status: "err",
    };
    updateState(state, setState, commandLine, commandResult);
  }
  return commandResult;
};
