import terminalFiles from "./FileSystem";

const updateState = (state, setState, commandLine, result) => {
  const commandResult = {
    ...result,
    command: `~ $ ${commandLine}`,
    content: result.content,
    status: result.status,
  };

  window.results.push(commandResult)

  const updatedState = {
    ...state,
    keyClassName: "fade-out",
    command: "",
  };
  window.commandHistory.push(commandLine);
  window.commandHistoryIndex++;
  setState(updatedState);
  setTimeout(() => { setState({ ...updatedState, keyClassName: "hidden" }); }, 200);
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
      status: "ok",
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
  github(state, setState, commandLine) {
    const result = { content: "", status: "" };
    updateState(state, setState, commandLine, result);
    window.open("https://github.com/andredurao");
  },
  linkedin(state, setState, commandLine) {
    const result = { content: "", status: "" };
    updateState(state, setState, commandLine, result);
    window.open("https://www.linkedin.com/in/andre-durao");
  },
  cat(state, setState, commandLine, f) {
    let result = {};
    const filename = f[0];
    const contentKind = filename.endsWith(".link") ? "link" : "text";
    if (terminalFiles[filename]) {
      result = {
        content: terminalFiles[filename],
        status: "",
        contentKind,
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
    const updatedState = {
      ...state,
      keyClassName: "fade-out",
      command: "",
    };
    window.commandHistory.push(commandLine);
    window.commandHistoryHistoryIndex++;
    window.results = [];
    setState(updatedState);
    setTimeout(() => { setState({ ...updatedState, keyClassName: "hidden" }); }, 200);
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
  setTimeout(() => { scrollToBottom(); }, 50);
  return commandResult;
};

const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: 'smooth'
  });
};
