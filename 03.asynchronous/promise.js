import timers from "timers/promises";
import sqlite3 from "sqlite3";
import { dbRunPromise, dbGetPromise, dbClosePromise } from "./dbFunction.js";

let db = new sqlite3.Database(":memory:");

dbRunPromise(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() =>
    dbRunPromise(db, "INSERT INTO books (title) VALUES (?)", "Railsの教科書"),
  )
  .then((statementResult) => {
    console.log(statementResult.lastID);
  })
  .catch((error) => {
    if (error.code === "SQLITE_CONSTRAINT") {
      console.error(error.message);
    } else {
      throw error;
    }
  })
  .then(() =>
    dbGetPromise(db, "SELECT * FROM books WHERE title = ?", "Railsの教科書"),
  )
  .then((book) => {
    console.log(book);
  })
  .catch((error) => {
    if (error.code === "SQLITE_ERROR") {
      console.error(error.message);
    } else {
      throw error;
    }
  })
  .finally(() =>
    dbClosePromise(db)
      .then(() => {})
      .catch(() => {}),
  );

await timers.setTimeout(100);

db = new sqlite3.Database(":memory:");

dbRunPromise(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => dbRunPromise(db, "INSERT INTO books (title) VALUES (?)", null))
  .then((statementResult) => {
    console.log(statementResult.lastID);
  })
  .catch((error) => {
    if (error.code === "SQLITE_CONSTRAINT") {
      console.error(error.message);
    } else {
      throw error;
    }
  })
  .then(() =>
    dbGetPromise(db, "SELECT * FROM book WHERE title = ?", "Railsの教科書"),
  )
  .then((book) => {
    console.log(book);
  })
  .catch((error) => {
    if (error.code === "SQLITE_ERROR") {
      console.error(error.message);
    } else {
      throw error;
    }
  })
  .finally(() =>
    dbClosePromise(db)
      .then(() => {})
      .catch(() => {}),
  );
