const fs = require("fs");

type StatProps = {
  size: number;
};

export const getBytes = async (filePath: string): Promise<number> => {
  let value: number = 0;
  fs.stat(`./src/${filePath}`, (err: string, stats: StatProps) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(stats.size + " " + filePath);
    value = stats.size;
  });

  console.log("====================================");
  console.log("value =>>", value);
  console.log("====================================");

  return value;
};
