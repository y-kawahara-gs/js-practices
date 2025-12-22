#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const today = new Date();
const year = argv.y ?? today.getFullYear();
const month = argv.m ?? today.getMonth() + 1;

const firstDate = new Date(year, month - 1, 1);
const lastDate = new Date(year, month, 0);

const dayOfWeek = "Su Mo Tu We Th Fr Sa";

const englishFormatter = new Intl.DateTimeFormat("en", { month: "long" });
const headerText = `${englishFormatter.format(lastDate)} ${lastDate.getFullYear()}`;
const lengthDifference = Math.max(0, dayOfWeek.length - headerText.length);
const leftPadding = " ".repeat(Math.floor(lengthDifference / 2));
const centeredHeader = leftPadding + headerText;

console.log(centeredHeader);
console.log(dayOfWeek);

const startPadding = "   ".repeat(firstDate.getDay());
process.stdout.write(startPadding);
for (
  let date = new Date(firstDate);
  date <= lastDate;
  date.setDate(date.getDate() + 1)
) {
  process.stdout.write(` ${date.getDate()}`.slice(-2));

  if (date.getDay() === 6 || date.getDate() === lastDate.getDate()) {
    console.log();
  } else {
    process.stdout.write(" ");
  }
}
