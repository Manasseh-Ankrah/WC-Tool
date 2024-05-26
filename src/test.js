#!/usr/bin/env node

const fs = require("fs");
const readline = require("readline");

function showHelp() {
  console.log(`
WC(1)                     BSD General Commands Manual                    WC(1)

NAME
     wc -- word, line, character, and byte count

SYNOPSIS
     wc [-clmw] [file ...]

DESCRIPTION
     The wc utility displays the number of lines, words, and bytes contained in each input file, or stan-
     dard input (if no file is specified) to the standard output.  A line is defined as a string of charac-
     ters delimited by a <newline> character.  Characters beyond the final <newline> character will not be
     included in the line count.

     A word is defined as a string of characters delimited by white space characters.  White space charac-
     ters are the set of characters for which the iswspace(3) function returns true.  If more than one
     input file is specified, a line of cumulative counts for all the files is displayed on a separate line
     after the output for the last file.

     The following options are available:

     -c      The number of bytes in each input file is written to the standard output.  This will cancel
             out any prior usage of the -m option.

     -l      The number of lines in each input file is written to the standard output.

     -m      The number of characters in each input file is written to the standard output.  If the current
             locale does not support multibyte characters, this is equivalent to the -c option.  This will
             cancel out any prior usage of the -c option.

     -w      The number of words in each input file is written to the standard output.

     When an option is specified, wc only reports the information requested by that option.  The order of
     output always takes the form of line, word, byte, and file name.  The default action is equivalent to
     specifying the -c, -l and -w options.

     If no files are specified, the standard input is used and no file name is displayed.  The prompt will
     accept input until receiving EOF, or [^D] in most environments.

ENVIRONMENT
     The LANG, LC_ALL and LC_CTYPE environment variables affect the execution of wc as described in
     environ(7).

EXIT STATUS
     The wc utility exits 0 on success, and >0 if an error occurs.
     `);
}

function readFile(filePath, option, callback) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
      return;
    }
    processInput(data.toString(), option, filePath);
  });
}

function readStdin(callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  let data = "";

  rl.on("line", (line) => {
    data += line + "\n";
  });

  rl.on("close", () => {
    callback(data);
  });
}

function processInput(data, option, filePath) {
  const counts = countLinesWordsChars(data);
  if (option === "-c") {
    console.log(`${Buffer.byteLength(data, "utf8")} ${filePath || ""}`);
  } else if (option === "-m") {
    console.log(`${data.length} ${filePath || ""}`);
  } else if (option === "-l") {
    console.log(`${counts.lines} ${filePath || ""}`);
  } else if (option === "-w") {
    console.log(`${counts.words} ${filePath || ""}`);
  } else {
    console.log(
      `${counts.lines} ${counts.words} ${Buffer.byteLength(data, "utf8")} ${
        filePath || ""
      }`
    );
  }
}

function countLinesWordsChars(text) {
  const lines = text.split("\n").length - 1;
  const words = text.split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  return { lines, words, chars };
}

function processCommand(args) {
  const option = args[0]; // -c, -m, -l, -w or file name
  const filePath = args[1]; // filename

  if (args.includes("-h") || args.includes("--help")) {
    showHelp();
  } else if (filePath) {
    readFile(filePath, option, processInput);
  } else {
    readStdin((data) => {
      processInput(data, option);
    });
  }
}

const args = process.argv.slice(2);
if (args.length === 0) {
  showHelp();
} else {
  processCommand(args);
}
