#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const today = new Date();

if (argv.y === undefined) {
  argv.y = today.getFullYear();
}
if (argv.m === undefined) {
  argv.m = today.getMonth() + 1;
}

const firstDate = new Date(argv.y, argv.m - 1, 1);
const lastDate = new Date(argv.y, argv.m, 0);
const year = lastDate.getFullYear();
const month = new Intl.DateTimeFormat("en", { month: "long" }).format(lastDate);

const days = "Su Mo Tu We Th Fr Sa";
const headerText = `${month} ${year}`;
const padding = Math.max(0, days.length - headerText.length);
const leftPadding = " ".repeat(Math.floor(padding / 2));
const centeredHeader = leftPadding + headerText;

console.log(centeredHeader);
console.log(days);

const startPaddingDays = "   ".repeat(firstDate.getDay());
process.stdout.write(startPaddingDays);
for (let date = firstDate; date <= lastDate; date.setDate(date.getDate() + 1)) {
  process.stdout.write(`${(" " + date.getDate()).slice(-2)} `);
  if (date.getDay() === 6) {
    console.log();
  }
}
