const fs = require("fs");

export const getLines = (filePath: string) => {
  fs.readFile(`./src/${filePath}`, "utf8", (err: string, data: string) => {
    if (err) throw err;
    const lines = data.split("\n").length;
    console.log("====================================");
    console.log(lines + " " + filePath);
    console.log("====================================");
  });
};
