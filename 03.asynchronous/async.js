import sqlite3 from "sqlite3";
import { dbRunPromise, dbGetPromise, dbClosePromise } from "./dbFunction.js";

let db = new sqlite3.Database(":memory:");

try {
  await dbRunPromise(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  let statementResult = await dbRunPromise(
    db,
    "INSERT INTO books (title) VALUES (?)",
    "Railsの教科書",
  );
  console.log(statementResult.lastID);
  let book = await dbGetPromise(
    db,
    "SELECT * FROM books WHERE title = ?",
    "Railsの教科書",
  );
  console.log(book);
} finally {
  await dbClosePromise(db);
}

db = new sqlite3.Database(":memory:");

try {
  await dbRunPromise(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  try {
    let statementResult = await dbRunPromise(
      db,
      "INSERT INTO books (title) VALUES (?)",
      null,
    );
    console.log(statementResult.lastID);
  } catch (error) {
    if (error?.code === "SQLITE_CONSTRAINT") {
      console.error(error.message);
    } else {
      throw error;
    }
  }
  try {
    let book = await dbGetPromise(
      db,
      "SELECT * FROM book WHERE title = ?",
      "Railsの教科書",
    );
    console.log(book);
  } catch (error) {
    if (error?.code === "SQLITE_ERROR") {
      console.error(error.message);
    } else {
      throw error;
    }
  }
} catch (error) {
  console.error(error.message);
} finally {
  await dbClosePromise(db);
}
