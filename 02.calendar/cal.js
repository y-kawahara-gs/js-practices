#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const today = new Date();
const year = argv.y === undefined ? today.getFullYear() : argv.y;
const month = argv.m === undefined ? today.getMonth() + 1 : argv.m;

const firstDate = new Date(year, month - 1, 1);
const lastDate = new Date(year, month, 0);

const dayOfWeek = "Su Mo Tu We Th Fr Sa";

const englishFormat = new Intl.DateTimeFormat("en", { month: "long" });
const headerText = `${englishFormat.format(lastDate)} ${lastDate.getFullYear()}`;
const lengthDifference = Math.max(0, dayOfWeek.length - headerText.length);
const leftPadding = " ".repeat(Math.floor(lengthDifference / 2));
const centeredHeader = leftPadding + headerText;

console.log(centeredHeader);
console.log(dayOfWeek);

const startPadding = "   ".repeat(firstDate.getDay());
process.stdout.write(startPadding);
for (
  let date = new Date(year, month - 1, 1);
  date <= lastDate;
  date.setDate(date.getDate() + 1)
) {
  if (date.getDay() === 6) {
    console.log(`${(" " + date.getDate()).slice(-2)}`);
  } else if (date === lastDate.getDate()) {
    process.stdout.write(`${(" " + date.getDate()).slice(-2)}`);
  } else {
    process.stdout.write(`${(" " + date.getDate()).slice(-2)} `);
  }
}
