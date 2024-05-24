const fs = require("fs");
const readline = require("readline");
const { StringDecoder } = require("string_decoder");
import { showHelp } from "./Intro";

type StatProps = {
  size: number;
};
const getBytes = (filePath: string) => {
  fs.stat(`./src/${filePath}`, (err: string, stats: StatProps) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(stats.size + " " + filePath);
  });
};

const getCharacters = (filePath: string) => {
  fs.readFile(`./src/${filePath}`, "utf8", (err: string, data: string) => {
    if (err) throw err;
    const decoder = new StringDecoder("utf8");
    const charCount = decoder.write(data).length;
    // const lines = data.split("\n").length;
    console.log("====================================");
    console.log(charCount + " " + filePath);
    console.log("====================================");
  });
};

const getLines = (filePath: string) => {
  fs.readFile(`./src/${filePath}`, "utf8", (err: string, data: string) => {
    if (err) throw err;
    const lines = data.split("\n").length;
    console.log("====================================");
    console.log(lines + " " + filePath);
    console.log("====================================");
  });
};

const getWords = (filePath: string) => {
  fs.readFile(`./src/${filePath}`, "utf8", (err: string, data: string) => {
    if (err) throw err;
    const words = data.split(/\s+/).filter(Boolean).length;
    console.log("====================================");
    console.log(words + " " + filePath);
    console.log("====================================");
  });
};

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
  let preset: string = line?.split(" ")[0];
  let cmd: string = line?.split(" ")[1];
  let filePath: string = line?.split(" ")[2];

  if (line.trim() === "exit") {
    rl.close();
  } else {
    if (preset !== "ccwc") {
      console.log("ccwc should be at the start of the command");
    }

    if (cmd == "-c") {
      getBytes(filePath);
    } else if (cmd == "-l") {
      getLines(filePath);
    } else if (cmd == "-w") {
      getWords(filePath);
    } else if (cmd == "-m") {
      getCharacters(filePath);
    } else {
      console.log("====================================");
      console.log("Specify the correct command");
      console.log("====================================");
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
