import timers from "timers/promises";
import sqlite3 from "sqlite3";

let db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run(
      "INSERT INTO books (title) VALUES (?)",
      "Railsの教科書",
      function () {
        console.log(this.lastID);
        db.get(
          "SELECT * FROM books WHERE title = ?",
          "Railsの教科書",
          (_error, book) => {
            console.log(book);
          },
        );
        db.close();
      },
    );
  },
);

await timers.setTimeout(100);

db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  function () {
    db.run("INSERT INTO books (title) VALUES (?)", null, (error) => {
      if (error.code === "SQLITE_CONSTRAINT") {
        console.error(error.message);
      }
      db.run("INSERT INTO books (title) VALUES (?)", "Railsの教科書", () => {
        db.get(
          "SELECT * FROM book WHERE title = ?",
          "Railsの教科書",
          (error, book) => {
            if (error.code === "SQLITE_ERROR") {
              console.error(error.message);
            } else {
              console.log(book.message);
            }
          },
        );
        db.close();
      });
    });
  },
);
