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
    switch (action) {
      case "list":
        await Memo.loadList(DATA_FILE);
        break;
      case "reference": {
        const fullText = function () {
          const content = this.focused.name + "\n" + this.focused.value.content;
          return content ? `${content}` : "";
        };

        const printMemo = async (memoArray) => {
          const prompt = await SystemController.makePrompt(
            "show",
            "Choose a note you want to see:",
            memoArray,
            fullText,
          );
          await prompt
            .run()
            .then((selectMemo) => {
              console.log(selectMemo);
            })
            .catch(console.error);
        };

        await Memo.loadReference(DATA_FILE, printMemo);
        break;
      }
      case "delete": {
        const selectId = async (memoArray) => {
          const prompt = await SystemController.makePrompt(
            "delete",
            "Choose a note you want to delete:",
            memoArray,
          );
          return await prompt
            .run()
            .then(() => {
              return prompt.focused.value.id;
            })
            .catch(console.error);
        };
        await Memo.delete(DATA_FILE, selectId);
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
  static makePrompt(name, message, memoArray, footer) {
    return new Select({
      name: name,
      message: message,
      choices: memoArray,
      footer,
    });
  }
}
