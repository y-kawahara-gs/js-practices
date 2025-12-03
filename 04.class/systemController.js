import { OptionParser } from "./optionparser.js";
import readline from "node:readline";
import { Memo } from "./memoClass.js";

export class SystemController {
  constructor() {
    this.option = new OptionParser();
  }
  async run() {
    const action = await this.option.decide_process();
    switch (action) {
      case "list":
        await Memo.loadList();
        break;
      case "reference":
        await Memo.loadReference();
        break;
      case "delete":
        await Memo.delete();
        break;
      case "non-option": {
        process.stdin.resume();
        process.stdin.setEncoding("utf-8");
        var lines = [];

        const reader = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        reader.on("line", (line) => {
          lines.push(line);
        });

        reader.on("close", () => {
          const memo = new Memo(lines[0], lines.slice(1).join("\n"));
          memo.save();
        });
        break;
      }
    }
  }
}
