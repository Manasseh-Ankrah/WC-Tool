import readline from "readline";
import { getBytes } from "./features/getBytes";
import { getCharacters } from "./features/getCharacters";
import { getLines } from "./features/getLines";
import { getWords } from "./features/getWords";
import { showHelp } from "./Intro";

// let cmd = process.argv[2];
// let filePath = process.argv[3];

const executeCommands = (
  preset: string,
  cmd: string,
  line: string,
  filePath: string
) => {
  const cmdLength: number = line.split(" ").length;
  const getValue: string[] = line.split(" ");

  if (preset !== "ccwc" && cmdLength && cmd && filePath) {
    console.log("*** Unknown Command ***");
    process.exit(0);
  }

  if (preset === "ccwc" && cmdLength === 2) {
    // console.log("*** RUNNING GET ALL Command ***");
    console.log("====================================");
    console.log("** line", line);
    console.log("====================================");
    console.log(getBytes(getValue[1]));
    // console.log("newNumber from import", exe());
  }

  if (cmdLength === 3 && cmd == "-c") {
    getBytes(filePath);
  } else if (cmd == "-l") {
    getLines(filePath);
  } else if (cmd == "-w") {
    getWords(filePath);
  } else if (cmd == "-m") {
    getCharacters(filePath);
  } else {
    return;
    // console.log("====================================");
    // console.log("Specify the correct command");
    // console.log("====================================");
  }

  // function
  // const commandList = ["-c", "-w", "-l", "-m"];
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "mandev.io> ",
});

rl.prompt();

showHelp();
rl.on("line", (line: string) => {
  let preset: string = line?.split(" ")[0];
  let cmd: string = line?.split(" ")[1];
  let filePath: string = line?.split(" ")[2];

  if (line.trim() === "exit") {
    rl.close();
  } else {
    executeCommands(preset, cmd, line, filePath);
    if (process.argv.includes("-h") || process.argv.includes("--help")) {
      showHelp();
    }
    rl.prompt();
  }
}).on("close", () => {
  console.log("Goodbye!");
  process.exit(0);
});
