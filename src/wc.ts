const fs = require("fs");
const readline = require("readline");
import { getBytes } from "./features/getBytes";
import { getCharacters } from "./features/getCharacters";
import { getLines } from "./features/getLines";
import { getWords } from "./features/getWords";
import { showHelp } from "./Intro";

// let cmd = process.argv[2];
// let filePath = process.argv[3];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "mandev.io> ",
});

rl.prompt();

showHelp();
rl.on("line", (line: string) => {
  const LENGTH = line.split(" ").length;
  let preset: string = LENGTH === 2 ? line?.split(" ")[0] : "ccwc";
  let cmd: string = LENGTH === 2 ? "" : line?.split(" ")[1];
  let filePath: string =
    LENGTH === 2 ? line?.split(" ")[1] : line?.split(" ")[2];

  if (line.trim() === "exit") {
    rl.close();
  } else {
    if (preset !== "ccwc") {
      console.log("ccwc should be at the start of the command");
    }

    const commandList = ["-c", "-w", "-l", "-m"];

    if (cmd == "-c") {
      getBytes(filePath);
    } else if (cmd == "-l") {
      getLines(filePath);
    } else if (cmd == "-w") {
      getWords(filePath);
    } else if (cmd == "-m") {
      getCharacters(filePath);
    } else {
      if (filePath && commandList.includes(cmd) == false) {
        // const bytes = getBytes(filePath);
        // console.log("bytes =>>", bytes);
        // getAllvalues(bytes, filePath);
      } else {
        console.log("filePath =>", filePath);
        console.log("CMD =>", cmd);
        console.log("CMD =>", commandList.includes(cmd) == false);
        console.log("====================================");
        console.log("Specify the correct command");
        console.log("====================================");
      }
    }
    if (process.argv.includes("-h") || process.argv.includes("--help")) {
      showHelp();
    }
    rl.prompt();
  }
}).on("close", () => {
  console.log("Goodbye!");
  process.exit(0);
});
