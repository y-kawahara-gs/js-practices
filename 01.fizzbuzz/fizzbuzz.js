#!/usr/bin/env node
for (let number = 1; number < 21; number++) {
  if (number % 15 == 0) {
    console.log("FizzBuzz");
  } else if (number % 5 == 0) {
    console.log("Buzz");
  } else if (number % 3 == 0) {
    console.log("Fizz");
  } else {
    console.log(number);
  }
}
