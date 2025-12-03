import minimist from "minimist";

export class OptionParser {
  constructor() {
    this.option = minimist(process.argv.slice(2));
  }
  async decide_process() {
    if (this.option.l) {
      return "list";
    } else if (this.option.r) {
      return "reference";
    } else if (this.option.d) {
      return "delete";
    } else {
      return "non-option";
    }
  }
}
