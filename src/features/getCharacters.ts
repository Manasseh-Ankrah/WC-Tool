const fs = require("fs");
const { StringDecoder } = require("string_decoder");

export const getCharacters = (filePath: string) => {
  fs.readFile(`./src/${filePath}`, "utf8", (err: string, data: string) => {
    if (err) throw err;
    const decoder = new StringDecoder("utf8");
    const charCount = decoder.write(data).length;
    console.log("====================================");
    console.log(charCount + " " + filePath);
    console.log("====================================");
  });
};
