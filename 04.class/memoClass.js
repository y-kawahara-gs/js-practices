import fs from "node:fs";

export class Memo {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
  save(DATA_FILE) {
    let memos = Memo.#loadMemos(DATA_FILE);

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
  static loadList(DATA_FILE) {
    try {
      const allMemos = Memo.#loadMemos(DATA_FILE);
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
  static async loadReference(DATA_FILE, printTitle) {
    try {
      const allMemos = Memo.#loadMemos(DATA_FILE);
      if (allMemos.length === 0) {
        throw new Error("表示できるメモがありません。メモを作成してください。");
      }
      const titleArray = await Memo.#getTitleArray(DATA_FILE)
      await printTitle(titleArray);
    } catch (error) {
      console.error(error.message);
    }
  }
  static async delete(DATA_FILE, printTitle) {
    try {
      const allMemos = Memo.#loadMemos(DATA_FILE);
      if (allMemos.length === 0) {
        throw new Error("削除できるメモがありません。");
      }
      const titleArray = await Memo.#getTitleArray(DATA_FILE)
      const title = await printTitle(titleArray);
      const memoToDelete = allMemos.find((memo) => memo.title === title);
      let memos = allMemos.filter((memo) => memo.id !== memoToDelete.id);
      const memo_data = JSON.stringify({ memos: memos }, null, 2);
      fs.writeFileSync(DATA_FILE, memo_data, "utf-8");
    } catch (error) {
      console.error(error.message);
    }
  }
  static #getTitleArray(DATA_FILE) {
    try {
      const allMemos = Memo.#loadMemos(DATA_FILE);
      const choicesArray = allMemos.map((memo) => {
        return {
          title: memo.title,
          content: memo.content,
        };
      });
      return choicesArray;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error("構文エラーです");
      } else {
        throw error;
      }
    }
  }
  static #loadMemos(DATA_FILE) {
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
