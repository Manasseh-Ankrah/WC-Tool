const fs = require("fs");

export const getWords = (filePath: string) => {
  fs.readFile(`./src/${filePath}`, "utf8", (err: string, data: string) => {
    if (err) throw err;
    const words = data.split(/\s+/).filter(Boolean).length;
    console.log("====================================");
    console.log(words + " " + filePath);
    console.log("====================================");
  });
};
