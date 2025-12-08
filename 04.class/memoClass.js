import pkg from "enquirer";
import fs from "node:fs";

const { Select } = pkg;
const DATA_FILE = "memos.json";

export class Memo {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
  save() {
    let memos = Memo.#loadMemos();

    let newId = 1;
    if (memos.length > 0) {
      const lastMemo = memos[memos.length - 1];
      newId = lastMemo.id + 1;
    }

    const newMemoData = {
      id: newId,
      title: this.title,
      content: this.content,
    };
    memos.push(newMemoData);
    const memo_data = JSON.stringify({ memos: memos }, null, 2);
    try {
      fs.writeFileSync(DATA_FILE, memo_data, "utf-8");
    } catch (error) {
      console.error(error);
    }
  }
  static async loadList() {
    try {
      const allMemos = Memo.#loadMemos();
      if (allMemos.length === 0) {
        throw new Error("表示できるメモがありません。メモを作成してください。");
      }
      allMemos.forEach((memo) => {
        console.log(memo.title);
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  static async loadReference() {
    try {
      const allMemos = Memo.#loadMemos();
      if (allMemos.length === 0) {
        throw new Error("表示できるメモがありません。メモを作成してください。");
      }
      const choicesArray = allMemos.map((memo) => {
        return {
          name: memo.title,
          content: memo.content,
        };
      });
      const prompt = new Select({
        type: "select",
        name: "show",
        message: "Choose a note you want to see:",
        choices: choicesArray,
        footer() {
          const content = this.focused.name + "\n" + this.focused.content;
          return content ? `${content}` : "";
        },
      });
      prompt
        .run()
        .then((answer) => console.log(answer))
        .catch(console.error);
    } catch (error) {
      console.error(error.message);
    }
  }
  static async delete() {
    try {
      const allMemos = Memo.#loadMemos();
      if (allMemos.length === 0) {
        throw new Error("削除できるメモがありません。");
      }
      const choicesArray = allMemos.map((memo) => {
        return {
          name: memo.title,
          content: memo.content,
        };
      });
      const prompt = new Select({
        type: "select",
        name: "delete",
        message: "Choose a note you want to delete:",
        choices: choicesArray,
      });
      const selectTitle = await prompt.run();
      const memoToDelete = allMemos.find((memo) => memo.title === selectTitle);
      let memos = allMemos.filter((memo) => memo.id !== memoToDelete.id);
      const memo_data = JSON.stringify({ memos: memos }, null, 2);
      fs.writeFileSync(DATA_FILE, memo_data, "utf-8");
    } catch (error) {
      console.error(error.message);
    }
  }
  static #loadMemos() {
    let memos = [];
    if (fs.existsSync(DATA_FILE)) {
      try {
        const fileContent = fs.readFileSync(DATA_FILE, "utf8");
        if (fileContent) {
          const data = JSON.parse(fileContent);
          memos = data.memos || [];
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          return [];
        } else {
          throw error;
        }
      }
    }
    return memos;
  }
}
