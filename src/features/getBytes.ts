const fs = require("fs");

type StatProps = {
  size: number;
};

export const getBytes = async (filePath: string) => {
  fs.stat(`./src/${filePath}`, (err: string, stats: StatProps) => {
    let value: number = 0;
    if (err) {
      console.error(err);
      return;
    }

    value = stats.size;
    console.log(stats.size + " " + filePath);
    // console.log("====================================");
    // console.log("value =>>", value);
    // console.log("====================================");
  });

  // return value;
};
