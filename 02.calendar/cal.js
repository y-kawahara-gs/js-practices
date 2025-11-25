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
const first_day = firstDate.getDay();
const last_date = lastDate.getDate();

const days = "Su Mo Tu We Th Fr Sa";
const headerText = `${month} ${year}`;
const padding = Math.max(0, days.length - headerText.length);
const leftPadding = " ".repeat(Math.floor(padding / 2));
const centeredHedder = leftPadding + headerText;

console.log(centeredHedder);
console.log(days);

let wday = "   ".repeat(first_day);
process.stdout.write(wday);
for (let i = 1; i <= last_date; i++) {
  process.stdout.write(`${(" " + i).slice(-2)} `);
  const sample = new Date(argv.y, argv.m - 1, i);
  const sample_day = sample.getDay();
  if (sample_day === 6) {
    console.log();
  }
}
