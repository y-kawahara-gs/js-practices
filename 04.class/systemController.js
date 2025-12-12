import readline from "node:readline";
import pkg from "enquirer";
const { Select } = pkg;
import { OptionParser } from "./optionparser.js";
import { Memo } from "./memoClass.js";

export class SystemController {
  constructor() {
    this.option = new OptionParser();
  }
  async run() {
    const action = await this.option.decide_process();
    const DATA_FILE = "memos.json";
    const titleArray = await Memo.getTitleArray(DATA_FILE);
    switch (action) {
      case "list":
        await Memo.loadList(DATA_FILE);
        break;
      case "reference": {
        const footer = function () {
          const content = this.focused.name + "\n" + this.focused.content;
          return content ? `${content}` : "";
        };
        const prompt = SystemController.#makePrompt(
          "show",
          "Choose a note you want to see:",
          titleArray,
          footer,
        );
        await Memo.loadReference(DATA_FILE, prompt);
        break;
      }
      case "delete": {
        const prompt = SystemController.#makePrompt(
          "delete",
          "Choose a note you want to delete:",
          titleArray,
        );
        await Memo.delete(DATA_FILE, prompt);
        break;
      }
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
          memo.save(DATA_FILE);
        });
        break;
      }
    }
  }
  static #makePrompt(name, message, titleArray, footer) {
    return new Select({
      name: name,
      message: message,
      choices: titleArray,
      footer,
    });
  }
}
